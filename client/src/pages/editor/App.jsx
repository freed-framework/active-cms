/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { fromJS, is } from 'immutable';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { message, Modal, Input, Icon } from 'antd';
import mitt from 'mitt';
import { getRect, createChildren } from '../../common/util/util';
import module from '../../common/module';
import { addPage, editPage, push } from '../../services';
import { Editor, Panel, TopMenu, Control, LayerCake, Follow, PubComps } from '../../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { user } from '../../actions/user';
import { userReducer } from '../../reducers';
import './app.scss';
import icon from '../../images/icon-svg/icon.svg';
import loader from '../../common/loader/loader';

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
class App extends PureComponent {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
        pageData: PropTypes.objectOf(PropTypes.any)
    }

    static defaultProps = {
        data: [],
    }

    constructor(props) {
        super(props);

        this.state = {
            /**
             * 组件的所在区域
             */
            rect: null,

            /**
             * 激活的 组件 id
             */
            activeId: null,

            /**
             * 编辑面板 展示状态
             */
            panelVisible: false,

            /**
             * 已添加组件 展示状态
             */
            layerCakeVisible: false,

            /**
             * 左下角菜单 展示状态
             */
            menuVisible: false,

            /**
             * 后端返回的原始数据
             * 该数据包含层级关系，components.App module config 等数据 不包含在此
             */
            data: props.data,

            /**
             * 复制数据
             */
            copyData: null,
        };

        this.$oldData = fromJS(props.data);
        this.clearTimer = null;

        emitter.on('delete', this.mittDelete);
        emitter.on('copy', this.mittCopy);
        emitter.on('paste', this.mittPaste);
        emitter.on('move', this.mittMove);
        emitter.on('add', this.mittAdd);
        emitter.on('save', this.mittSave);
        emitter.on('edit', this.mittEdit);
        emitter.on('modify', this.mittModify);
        emitter.on('sort', this.mittSort);
        emitter.on('active', this.mittActive);
        emitter.on('viewer', this.mittViewer);
        emitter.on('push', this.mittPush);
        emitter.on('clearActive', this.mittClearActive)
    }

    componentDidMount() {
        const { pageData = {} } = this.props;
        // let $oldData = fromJS(this.state.data);
        // this.props.user(12312312).then(data => {

        // })
        // // 定时保存每分钟保存一次
        // // this.timer = Observable.interval(60000).subscribe(() => {
        // //     const $newData = fromJS(this.state.data);
        // //
        // //     // 数据修改了才保存
        // //     if (!is($oldData, $newData)) {
        // //         this.mittSave('定时保存成功！');
        // //         $oldData = $newData;
        // //     }
        // // })

        this.canvas.addEventListener('click', this.handleActive);
        // this.canvas.addEventListener('mouseover', this.handleHover);
        // this.canvas.addEventListener('mouseout', this.handleOut);
    }

    componentWillUnmount() {
        emitter.off('delete', this.mittDelete);
        emitter.off('add', this.mittAdd);
        emitter.off('save', this.mittSave);
        emitter.off('edit', this.mittEdit);
        emitter.off('active', this.mittActive);
        emitter.off('viewer', this.mittViewer);
        emitter.off('push', this.mittPush);
        emitter.off('clearActive', this.mittClearActive)

        clearTimeout(this.clearTimer)

        // this.timer.unsubscribe();

        this.canvas.removeEventListener('click', this.handleActive);
        // this.canvas.removeEventListener('mouseover', this.handleHover);
        // this.canvas.removeEventListener('mouseout', this.handleOut);
    }

    componentWillReceiveProps(nextProps) {
        if (!is(nextProps.data, this.props.data)) {
            this.setState({
                data: nextProps.data,
            }, () => {
                this.$oldData = fromJS(nextProps.data);
            })
        }
    }

    /**
     * 激活事件
     * @param event
     */
    handleActive = (event) => {
        // guid 作为 id 被添加到组件上
        const target = event.target;
        const guid = target.getAttribute('id');
        const module = target.getAttribute('data-module');

        this.mittActive({
            guid,
            target,
            // rect: getRect(target),
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
            // this.setState({
            //     rect: this.state.activeRect,
            // });
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

        message.success('删除成功');

        this.setState({
            data,
            activeId: null,
            rect: null,
            activeRect: null,
            panelVisible: false,
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
            // 当添加一个组件的时候，自动激活编辑面板
            autoActiveId: guid || mod.guid,
        }, () => {
            /**
             * TODO:
             * 问题描述： 新加组件，组件进入视图，
             *           当前组件为激活组建，后面修改其他，也会选中这个组件
             * 暂时解决方法：1秒钟后将activeid置空
             */

            this.clearTimer = setTimeout(() => {
                this.setState({
                    autoActiveId: null
                })
            }, 1000)
        });
    }

    /**
     * 清除active
     */
    mittClearActive = () => {
        this.setState({
            autoActiveId: null
        })
    }

    /**
     * TODO 将弃用
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
            const expr = /width|height|margin/.exec(attr);
            if (expr) {
                const controlAttr = expr[0];
                const controlRect = {
                    ...(this.state.activeRect)
                };

                controlRect[controlAttr] = parseFloat(value);

                this.setState({
                    rect: controlRect,
                    activeRect: controlRect,
                });
            }
        });
    }

    /**
     * 通过 guid 进行数据修改
     * @param guid
     * @param key
     * @param value
     */
    mittModify = ({ guid, key, value }) => {
        const data = module.modify(guid, this.state.data, key, value);

        this.setState({
            data,
        });
    }

    mittSort = (data) => {
        this.setState({
            data,
        });
    }

    /**
     * 激活组件
     * @param guid
     * @param target
     */
    mittActive = ({ guid, target }) => {
        const { location = '', match = {} } = this.props;
        const { params = {} } = match;

        // 移动端的画布有特殊设置
        const parent = params.type === 'mobile' ? this.canvasInner : null;
        const rect = guid && target ? getRect(target, parent) : null;

        this.setState({
            activeId: guid,
            activeRect: rect,
            rect,
            // autoActiveId: null,
            // 设置panel 编辑面板的显示状态
            panelVisible: !!guid,
            menuVisible: false,
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
            onCancel() {},
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
                    pageType: params.type,
                    content: this.state.data
                }).then((res) => {
                    this.$oldData = fromJS(this.state.data);
                    message.success(text || '保存成功')
                    this.props.history.replace(`/mobile/edit/${res.data.id}${location.hash}`)
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
                this.$oldData = fromJS(this.state.data);
                message.success(text || '保存成功')
            })
        }

        console.log(JSON.stringify(this.state.data))
    }

    mittPush = () => {
        const { pageData = {} } = this.props;
        const { $oldData } = this;
        const $now = fromJS(this.state.data);
        if (is($oldData, $now)) {
            confirm({
                title: '确认推送页面？',
                content: '',
                onOk: () => {
                    push({
                        id: pageData._id,
                        uploadUserId: 123123123,
                        zipId: pageData.pushId,
                        activityName: pageData.title
                    })
                    .then(() => {
                        message.success('推送成功');
                    })
                    .catch(() => {})
                },
                onCancel() {},
            });

            return false;
        }
        Modal.warning({
            title: '请先保存当前修改',
            content: '',
        });
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

    /**
     * 显示/关闭 已添加组件
     */
    handleShow = () => {
        const layerCakeVisible = this.state.layerCakeVisible;
        this.setState({
            layerCakeVisible: !layerCakeVisible,
        });
    }
    /**
     * 显示 menu
     */
    handleShowMenu = () => {
        const menuVisible = this.state.menuVisible;
        this.setState({
            menuVisible: !menuVisible,
        });
    }

    render() {
        const { rect, data, layerCakeVisible, menuVisible } = this.state;
        const { history, match } = this.props;
        const cls = classNames('show-right', {
            'close-right': layerCakeVisible,
        });

        return (
            <div className={`ec-editor-${match.params.type}`}>
                {/* Top Menu */}
                <TopMenu
                    history={history}
                    visible={menuVisible}
                />

                {/* 左侧工具面板 */}
                <div
                    className="ec-editor-left-panel ec-editor-layout-fixed"
                >
                    <PubComps />
                    <div
                        // className="show-right"
                        className={cls}
                        onClick={this.handleShow}
                    >
                        <Icon type="right" />
                    </div>

                    {/* 已经添加的组件列表 */}
                    <LayerCake
                        activeId={this.state.activeId}
                        active={this.state.layerCakeVisible}
                        outerEl={this.canvasInner}
                        data={data}
                    />
                </div>

                {/* 右侧的控制面板 */}
                <Panel
                    activeId={this.state.activeId}
                    data={data}
                    onClose={this.handleClosePanel}
                    visible={this.state.panelVisible}
                />

                {/* 菜单导航栏 */}
                <div
                    className="menu-button"
                    onClick={this.handleShowMenu}
                >
                    <img src={icon} />
                </div>

                {/* 模块 */}
                <div
                    ref={ref => { this.canvas = ref }}
                    className="ec-editor-canvas"
                >
                    <div
                        className="ec-editor-canvas-inner"
                        ref={ref => { this.canvasInner = ref }}
                    >
                        {/* 操作提示节点 */}
                        <Control
                            rect={rect}
                        />

                        {/* 实际的可编辑组件列表 */}
                        <Editor
                            data={data}
                            outerEl={this.canvasInner}
                            autoActiveId={this.state.autoActiveId}
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

export const sortComponent = (data) => {
    emitter.emit('sort', data);
}

/**
 * 储存数据
 */
export const saveData = () => {
    emitter.emit('save');
}

/**
 * 发布数据
 */
export const handlePush = () => {
    emitter.emit('push');
}

/**
 * 预览页面
 */
export const viewer = () => {
    emitter.emit('viewer')
}

/**
 * 清除激活
 */
export const clearActive = () => {
    emitter.emit('clearActive')
}

export default withRouter(App);
