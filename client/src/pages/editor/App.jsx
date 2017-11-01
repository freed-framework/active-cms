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
import { Observable } from 'rxjs';
import utils from '../../../components/util/util';
import module from '../../../common/module';
import { addPage, getPage, editPage } from '../../services';
import { Editor, Panel, TopMenu, Control, LayerCake, Follow, PubComps, HanleMenu } from '../../components';
import Module from '../../../common/module';

import './app.scss';

const confirm = Modal.confirm;

const emitter = mitt();

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

/**
 * 创建子数据
 * @param data
 * @param guid
 * @param value
 * @return {any|*}
 */
const createChildren = (data, guid, value) => {
    let $new = fromJS({});
    const $data = fromJS(data);

    utils.find($data, guid, ($finder, deep) => {
        if ($finder) {
            $new = $data.updateIn(deep, ($v) => {
                let $child = [];

                if (!$v.get('children')) {
                    $child = [value];
                } else {
                    $child = $v.get('children').push(value);
                }

                return $v.set('children', $child);
            });
        }
    }, {
            findBy: 'guid',
        });

    return $new.toJS();
}

/**
 * 获取元素的基本信息
 * @param target
 * @return {{width: Number, height: Number, left: number, top: number}}
 */
const getRect = (target) => {
    const rect = target.getBoundingClientRect();

    return {
        width: rect.width,
        height: rect.height,
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
    }
}

class App extends Component {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
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
            data: [],

            /**
             * 平铺的带 App 的数据
             */
            tileData: {},

            /**
             * 复制数据
             */
            copyData: null
        };

        this.mittDelete = ::this.mittDelete;
        this.mittAdd = ::this.mittAdd;
        this.mittEdit = ::this.mittEdit;
        this.mittModify = ::this.mittModify;
        this.mittActive = ::this.mittActive;
        this.mittSave = ::this.mittSave;
        this.mittViewer = ::this.mittViewer;
        this.mittCopy = ::this.mittCopy;
        this.mittPaste = ::this.mittPaste;
        this.mittMove = ::this.mittMove;

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
        const { match = {} } = this.props;
        const { params = {} } = match;
        const { id } = params;
        let $oldData = fromJS(this.state.data);

        // 如果存在id说明是编辑
        if (id) {
            getPage(id).then((res) => {
                // const res = {
                //     "code": 200,
                //     "message": "请求成功",
                //     "data": {
                //         "_id": "59dc5ecc10c25c113487e54e",
                //         "title": "123",
                //         "content": [
                //             {
                //                 "guid": "ec-module-bd54abf3-42a6-490e-99ac-b4a1686d5fd5",
                //                 "name": "tabs",
                //                 "dataTrans": {
                //                     "activeKey": "0",
                //                     "data": [
                //                         {
                //                             key: "0",
                //                             title: 'Tab 1.',
                //                             content: 'Content 1',
                //                         },
                //                         {
                //                             key: "1",
                //                             title: 'Tab 2',
                //                             content: 'Content 2',
                //                         },
                //                     ]
                //                 }
                //             },
                //             {
                //                 "guid": "ab1b2580-8d5e-4412-8a76-f11fa5e086e8",
                //                 "name": "layer",
                //                 "attrs": {
                //                     "style": {
                //                         "layout": {
                //                             "height": "800",
                //                             "backgroundColor": "rgba(238, 236, 248, 1)",
                //                             "borderStyle": "dashed",
                //                             "borderWidth": 1
                //                         }
                //                     }
                //                 },
                //                 "children": [{
                //                     "guid": "ec-module-11122-42a6-490e-99ac-b4a1686d5fd5",
                //                     "name": "layer",
                //                 }]
                //             }
                //         ]
                //     }
                // }

                const { data } = res;

                document.title = data.title;

                this.setDataAndTile(data.content);
            })
        }

        // 定时保存每分钟保存一次
        this.timer = Observable.interval(60000).subscribe(() => {
            const $newData = fromJS(this.state.data);

            // 数据修改了才保存
            if (!is($oldData, $newData)) {
                this.mittSave('定时保存成功！');
                $oldData = $newData;
            }
        })

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

        this.timer.unsubscribe();

        this.canvas.removeEventListener('click', this.handleActive);
        this.canvas.removeEventListener('mouseover', this.handleHover);
        this.canvas.removeEventListener('mouseout', this.handleOut);
    }

    /**
     * 设置 state.tabs & state.tileData
     * @param dataArr
     * @param callback
     */
    setDataAndTile(dataArr = [], callback = () => {}) {
        // 平铺的绑定了 App 的数据
        const tileData = {};
        const result = this.data2Tile(dataArr);

        Promise.all(result.tile).then(values => {
            values.forEach(v => {
                const children = result.childs[v.guid];
                tileData[v.guid] = {...v, children: children || []};
            });

            this.setState({
                data: dataArr,
                tileData,
            }, () => callback);
        });
    }

    /**
     * 设置 state.data & state.tileData
     * 将数据平铺
     * @param data
     * @param arr
     * @return {Array}
     */
    data2Tile(data, arr = []) {
        const childs = {};
        const looper = (data) => {
            data.forEach(item => {
                childs[item.guid] = item.children || [];
                arr = arr.concat(Module.get(item));

                if (item.children) {
                    looper(item.children, arr);
                }

                if (item.components) {
                    looper(item.components, arr);
                }
            });
        }

        looper(data);

        return {tile: arr, childs};
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
     * @param el
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
    mittDelete(guid) {
        const data = module.remove(guid, this.state.data);

        message.error('删除成功');

        this.setDataAndTile(data);

        this.setState({
            activeId: null,
            rect: null,
            activeRect: null,
        })
    }

    /**
     * 复制组件
     * @param guid
     */
    mittCopy(guid) {
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
    mittPaste(guid) {
        const { data, copyData } = this.state;

        if (!copyData) {
            message.error('并无数据被复制');
            return;
        }

        const result = module.paste(guid, data, copyData);

        message.success('粘贴成功');

        this.setDataAndTile(result);
    }

    /**
     * 移动组件
     */
    mittMove = ({startId, endId}) => {
        const { data } = this.state;
        const result = module.move(data, startId, endId);

        if (!result) {
            message.success('暂时只支持同级元素拖动');
            return;
        }

        this.setDataAndTile(result);
    }

    /**
     * 添加模块
     * @param cname
     * @param guid
     */
    mittAdd({ cname, guid }) {
        const mod = module.create(cname);
        const arr = this.state.data;

        const data = guid ?
            createChildren(this.state.data, guid, mod) :
            arr.concat(mod);

        this.setDataAndTile(data);
    }

    /**
     * 编辑组件属性
     * @param guid 组件id
     * @param attr 修改属性
     * @param target 目标元素
     * @param value 修改后值
     * @param type 修改后值
     */
    mittEdit({ guid, attr, target, value, type }) {
        const el = document.getElementById(guid);
        const newData = module.edit(guid, this.state.data, target, attr, value, type);

        this.setDataAndTile(newData, () => {
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
        })
    }

    mittModify({ guid, key, value }) {
        this.setState({
            data: module.modify(guid, this.state.data, key, value),
        });
    }

    /**
     * 激活组件
     * @param guid
     * @param target
     */
    mittActive({ guid, target }) {
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
    mittSave(text) {
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

    mittViewer() {
        this.props.history.replace('/view')
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
        const { rect, tileData, data } = this.state;
        const { history } = this.props;

        return (
            <div>
                <Control
                    rect={rect}
                />

                {/* Top Menu */}
                <TopMenu history={history} />

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
                        tileData={tileData}
                    />
                </Follow>

                {/* 右侧的控制面板 */}
                <Panel
                    activeId={this.state.activeId}
                    data={tileData}
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
                            tileData={tileData}
                        />
                    </div>
                </div>
                {/* <HanleMenu /> */}
            </div>
        );
    }
}

export default App;
