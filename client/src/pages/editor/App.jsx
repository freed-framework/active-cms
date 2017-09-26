/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { fromJS } from 'immutable';
import utils from '../../../components/util/util';
import module from '../../../common/module';
import { Editor, Panel } from '../../components/index';
import mitt from 'mitt';
import './app.scss';

const emitter = mitt();

/**
 * 移除组件
 * @param event
 */
export const deleteComponent = (event) => {
    const guid = event.currentTarget.getAttribute('data-guid');
    emitter.emit('delete', guid);
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
        type
    })
}

export const activeComponent = (guid) => {
    emitter.emit('active', guid);
}

/**
 * 储存数据
 */
export const saveData = () => {
    emitter.emit('save');
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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // data: [{"guid":"3a52bb7e-ee96-4a0e-86ed-c5ee02ddf44b","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tabs","floor","img"],"editable":{"layout":["basic"]}},"children":[{"guid":"ebc5f7e1-9090-4973-b596-fa3ee9edf2b7","name":"img","module":{"id":4,"name":"img","file":"img","editable":{"layout":["basic"]}}},{"guid":"3e3f1f01-6a3f-4020-9325-9b41fb3a3ab1","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tabs","floor","img"],"editable":{"layout":["basic"]}},"style":{"layout":{"width":"1200","margin":"0 auto"}},"children":[{"guid":"d9f535f7-1a41-403a-b890-155cf093673f","name":"img","module":{"id":4,"name":"img","file":"img","editable":{"layout":["basic"]}},"style":{"layout":{"width":"100%","height":"100%"}}},{"guid":"28e83b31-e34c-48f4-ba48-a28a7f1db3d4","name":"fix","module":{"id":5,"name":"fix","file":"fix","editable":{"layout":["basic","position"]}},"style":{"layout":{"left":"50%","top":"20%","margin":"0 0 0 -800px","background":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170821173038930_831.png)","width":"194px","height":"538px"}}}]}],"style":{"layout":{"background":"#feeae8"}}}],
            data: [
                {
                    "guid":"3a52bb7e-ee96-4a0e-86ed-c5ee02ddf44b",
                    "name":"floor",
                    "attrs": {
                        style: {
                            layout: {
                                height: 60,
                            }
                        }
                    }
                }
            ]
        };

        this.mittDelete = ::this.mittDelete;
        this.mittAdd = ::this.mittAdd;
        this.mittEdit = ::this.mittEdit;
        this.mittActive = ::this.mittActive;
        this.mittSave = ::this.mittSave;

        emitter.on('delete', this.mittDelete);
        emitter.on('add', this.mittAdd);
        emitter.on('edit', this.mittEdit);
        emitter.on('active', this.mittActive);
        emitter.on('save', this.mittSave);
    }

    componentWillUnmount() {
        emitter.off('delete', this.mittDelete);
        emitter.off('add', this.mittAdd);
        emitter.off('save', this.mittSave);
    }

    /**
     * 删除模块
     * @param guid
     */
    mittDelete(guid) {
        this.setState({
            data: module.remove(guid, this.state.data),
        }, () => {
            // 通知 panel 删除编辑菜单
            Panel.delete(guid);
        });
    }

    /**
     * 添加模块
     * @param cname
     * @param guid
     */
    mittAdd({ cname, guid }) {
        module.create(cname)
            .then(value => {
                if (guid) {
                    this.setState({
                        data: createChildren(this.state.data, guid, value),
                    })
                } else {
                    this.setState({
                        data: this.state.data.concat(value),
                    })
                }
            });
    }

    /**
     * 编辑组件属性
     * @param guid 组件id
     * @param attr 修改属性
     * @param target 目标元素
     * @param value 修改后值
     */
    mittEdit({ guid, attr, target, value, type }) {
        this.setState({
            data: module.edit(guid, this.state.data, target, attr, value, type),
        })
    }

    /**
     * 激活组件
     */
    mittActive(guid) {
        this.setState({
            activeId: guid,
        })
    }

    mittSave() {
        console.log(JSON.stringify(this.state.data))
    }

    render() {
        return (
            <div>
                {/* 模块 */}
                <div className="as-editor-layout">
                    <Editor
                        activeId={this.state.activeId}
                        data={this.state.data}
                    />
                </div>

                {/* 右侧的控制面板 */}
                <Panel />
            </div>
        );
    }
}

export default App;
