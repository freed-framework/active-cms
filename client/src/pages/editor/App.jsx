/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { fromJS, is } from 'immutable';
import PropTypes from 'prop-types';
import { message, Modal, Input } from 'antd';
import mitt from 'mitt';
import { getRect, createChildren } from '../util/util';
import module from '../../../common/module';
import { addPage, editPage } from '../../services';
import { Editor, Panel, TopMenu, Control, LayerCake, Follow, PubComps } from '../../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { user } from '../../actions/user';
import { userReducer } from '../../reducers';

import './app.scss';

const confirm = Modal.confirm;

const emitter = mitt();

@connect(
    () => ({
        userReducer
    }),
    dispatch => bindActionCreators({
        user
    }, dispatch)
)
class App extends Component {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
    }

    static defaultProps = {
        data: [],
    }

    constructor(props) {
        super(props);

        this.state = {
            rect: null,
            hoverId: null,

            activeId: null,
            panelVisible: false,

            /**
             * 后端返回的原始数据
             * 该数据包含层级关系，components.App module config 等数据 不包含在此
             */
            data: props.data,

            /**
             * 复制数据
             */
            copyData: null
        };

        emitter.on('delete', this.mittDelete);
        emitter.on('copy', this.mittCopy);
        emitter.on('paste', this.mittPaste);
        emitter.on('move', this.mittMove);
        emitter.on('add', this.mittAdd);
        emitter.on('save', this.mittSave);
        emitter.on('edit', this.mittEdit);
        emitter.on('modify', this.mittModify);
        emitter.on('active', this.mittActive);
        emitter.on('viewer', this.mittViewer);
    }

    componentDidMount() {
        let $oldData = fromJS(this.state.data);
        this.props.user(12312312).then(data => {
            console.log(data)
        })
        // 定时保存每分钟保存一次
        // this.timer = Observable.interval(60000).subscribe(() => {
        //     const $newData = fromJS(this.state.data);
        //
        //     // 数据修改了才保存
        //     if (!is($oldData, $newData)) {
        //         this.mittSave('定时保存成功！');
        //         $oldData = $newData;
        //     }
        // })

        this.canvas.addEventListener('click', this.handleActive);
        this.canvas.addEventListener('mouseover', this.handleHover);
        this.canvas.addEventListener('mouseout', this.handleOut);
    }

    componentWillUnmount() {
        emitter.off('delete', this.mittDelete);
        emitter.off('add', this.mittAdd);
        emitter.off('save', this.mittSave);
        emitter.off('edit', this.mittEdit);
        emitter.off('active', this.mittActive);
        emitter.off('viewer', this.mittViewer);

        // this.timer.unsubscribe();

        this.canvas.removeEventListener('click', this.handleActive);
        this.canvas.removeEventListener('mouseover', this.handleHover);
        this.canvas.removeEventListener('mouseout', this.handleOut);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (!is(nextProps.data, this.props.data)) {
            this.setState({
                data: nextProps.data,
            })
        }
    }

    /**
     * 激活事件
     * @param event
     */
    handleActive = (event) => {
        // guid 作为 id 被添加到组件上
        const guid = event.target.getAttribute('id');

        this.mittActive({
            guid,
            target: event.target,
        });
    }

    /**
     * 用于提示可编辑的事件
     * @param event
     */
    handleHover = (event) => {
        const target = event.target;
        const module = target.getAttribute('data-module');

        if (module) {
            this.setState({
                rect: getRect(target),
            });
        } else {
            // 保持激活状态
            this.setState({
                rect: this.state.activeRect,
            });
        }
    }

    /**
     * 恢复到激活的编辑位置 or null
     */
    handleOut = () => {
        this.setState({
            rect: this.state.activeRect,
        })
    }

    /**
     * 删除模块
     * @param guid
     */
    mittDelete = (guid) => {
        const data = module.remove(guid, this.state.data);

        message.error('删除成功');

        this.setState({
            data,
            activeId: null,
            rect: null,
            activeRect: null,
        })
    }

    /**
     * 复制组件
     * @param guid
     */
    mittCopy = (guid) => {
        const data = module.copy(guid, this.state.data);

        message.success('复制成功');

        this.setState({
            copyData: data
        })
    }

    /**
     * 粘贴组件
     * @param guid
     */
    mittPaste = (guid) => {
        const { data, copyData } = this.state;

        if (!copyData) {
            message.error('并无数据被复制');
            return;
        }

        const result = module.paste(guid, data, copyData);

        message.success('粘贴成功');

        this.setState({
            data: result,
        })
    }

    /**
     * 移动组件
     * @param startId
     * @param endId
     */
    mittMove = ({startId, endId}) => {
        const { data } = this.state;
        const result = module.move(data, startId, endId);

        if (!result) {
            message.success('暂时只支持同级元素拖动');
            return;
        }

        this.setState({
            data: result,
        })
    }

    /**
     * 添加模块
     * @param cname
     * @param guid
     */
    mittAdd = ({ cname, guid }) => {
        const mod = module.create(cname);
        const arr = this.state.data;

        const data = guid ?
            createChildren(this.state.data, guid, mod) :
            arr.concat(mod);

        this.setState({
            data,
        });
    }

    /**
     * 编辑组件属性
     * @param guid 组件id
     * @param attr 修改属性
     * @param target 目标元素
     * @param value 修改后值
     * @param type 修改后值
     */
    mittEdit = ({ guid, attr, target, value, type }) => {
        // console.log(module.modify(guid, this.state.data, ['attrs', 'style', target, attr], value ));
        const data = module.edit(guid, this.state.data, target, attr, value, type);

        this.setState({
            data,
        }, () => {
            // 通知 Control 组件修改自身的宽度
            // const expr = /width|height|margin/.exec(attr);
            // if (expr) {
            //     const controlAttr = expr[0];
            //     const controlRect = {
            //         ...(this.state.activeRect)
            //     };
            //
            //     controlRect[controlAttr] = parseFloat(value);
            //
            //     this.setState({
            //         rect: controlRect,
            //         activeRect: controlRect,
            //     });
            // }
        });
    }

    /**
     *
     * @param guid
     * @param key
     * @param value
     */
    mittModify = ({ guid, key, value }) => {
        this.setState({
            data: module.modify(guid, this.state.data, key, value),
        });
    }

    /**
     * 激活组件
     * @param guid
     * @param target
     */
    mittActive = ({ guid, target }) => {
        const rect = guid && target ? getRect(target) : null;

        this.setState({
            activeId: guid,
            activeRect: rect,
            rect,

            // 设置panel 编辑面板的显示状态
            panelVisible: !!guid,
        });
    }

    /**
     * 弹出确定提交浮层
     * @param callback
     */
    showConfirm = (callback) => {
        confirm({
            title: '请输入页面标题?',
            content: <Input onChange={this.handleChange} />,
            onOk: callback,
            onCancel() { },
        });
    }

    /**
     * 在弹框中设置页面标题
     * @param e
     */
    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    /**
     * 保存数据
     */
    mittSave = (text) => {
        const { location = '', match = {} } = this.props;
        const { params = {} } = match;
        const { id } = params;

        if (!this.state.data.length) {
            message.error('页面不能为空');
            return;
        }

        // 新增
        if (!id) {
            this.showConfirm(() => {
                const { title } = this.state;

                if (!title) {
                    message.error('请输入标题');
                    return;
                }

                addPage({
                    title,
                    content: this.state.data
                }).then((res) => {
                    message.success(text || '保存成功')
                    this.props.history.replace(`/edit/${res.data.id}${location.hash}`)
                })
            })
        }
        // 编辑
        else {
            editPage({
                id,
                page: {
                    content: this.state.data
                }
            }).then(() => {
                message.success(text || '保存成功')
            })
        }

        console.log(JSON.stringify(this.state.data))
    }

    mittViewer = () => {
        this.props.history.push(`/view/${this.props.match.params.id}`)
    }

    /**
     * 关闭 panel
     */
    handleClosePanel = () => {
        this.setState({
            panelVisible: false,
        });
    }

    render() {
        const { rect, data } = this.state;
        const { history } = this.props;

        return (
            <div>
                <Control
                    rect={rect}
                />

                {/* Top Menu */}
                <TopMenu
                    history={history}
                />

                {/* 左侧工具面板 */}
                <Follow
                    className="ec-editor-left-panel ec-editor-layout-fixed"
                    offsetTop={50}
                >
                    <PubComps />

                    <LayerCake
                        activeId={this.state.activeId}
                        active={this.state.panelVisible}
                        data={data}
                    />
                </Follow>

                {/* 右侧的控制面板 */}
                <Panel
                    activeId={this.state.activeId}
                    data={data}
                    offsetTop={50}
                    onClose={this.handleClosePanel}
                    visible={this.state.panelVisible}
                />

                {/* 模块 */}
                <div
                    ref={ref => { this.canvas = ref }}
                    className="ec-editor-canvas"
                >
                    <div
                        className="ec-editor-canvas-inner"
                    >
                        <Editor
                            activeId={this.state.activeId}
                            data={data}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 移除组件
 * @param event
 */
export const deleteComponent = (guid) => {
    emitter.emit('delete', guid);
}

/**
 * 复制组件
 * @param event
 */
export const copyComponent = (guid) => {
    emitter.emit('copy', guid);
}

/**
 * 粘贴数据
 */
export const pasteComponent = (guid) => {
    emitter.emit('paste', guid);
}

/**
 * 添加组件
 * @param event
 */
export const addComponent = (event) => {
    const guid = event.currentTarget.getAttribute('data-guid');
    const cname = event.currentTarget.getAttribute('data-name');

    emitter.emit('add', {
        cname,
        guid,
    });
}

export const moveComponent = (startId, endId) => {
    emitter.emit('move', {
        startId,
        endId
    })
}

/**
 *
 * @param {Object} event 事件对象
 * @param {string|undefined} type 编辑的属性
 */
export const editComponent = (event, type) => {
    const guid = event.currentTarget.getAttribute('data-guid');
    const attr = event.currentTarget.getAttribute('data-attr');
    const target = event.currentTarget.getAttribute('data-target');
    const value = event.currentTarget.value;

    emitter.emit('edit', {
        guid,
        attr,
        target,
        value,
        type,
    })
}

export const editComponentByGuid = (guid, key, value) => {
    emitter.emit('modify', {
        guid,
        key,
        value,
    })
}

/**
 * 编辑的属性
 * @param option 传递
 * @param type 编辑的属性
 */
export const editComponentByType = (option, type) => {
    const { guid, attr, target, value } = option;

    emitter.emit('edit', {
        guid,
        attr,
        target,
        value,
        type,
    })
}

export const activeComponent = (guid, target) => {
    emitter.emit('active', {
        guid,
        target,
    });
}

/**
 * 储存数据
 */
export const saveData = () => {
    emitter.emit('save');
}

/**
 * 预览页面
 */
export const viewer = () => {
    emitter.emit('viewer')
}

export default withRouter(App);
