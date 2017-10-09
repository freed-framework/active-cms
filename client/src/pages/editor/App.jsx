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
import { Editor, Panel } from '../../components';
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
        type,
    })
}

/**
 * 
 * @param {Object} event 编辑参数 
 * @param {string|undefined} type 编辑的属性
 */
export const editComponentByOption = (option, type) => {
    const { guid, attr, target, value } = option;

    emitter.emit('edit', {
        guid,
        attr,
        target,
        value,
        type,
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
            data: [{"guid":"a7731b7c-9ae6-4983-8ec0-417e4f23b239","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tab","floor","img","fix","float"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"padding":"200xp","backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170821163422188_217.jpg)","height":"600px"}}},"children":[]},{"guid":"8b6fb289-8852-4909-b5f3-20d042789adf","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tab","floor","img","fix","float"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"width":"1200px","margin":"0 auto","backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170821163422188_217.jpg)","height":"300px"}}},"children":[{"guid":"c1934f03-b05c-4d89-93be-91d0557037b4","name":"fix","module":{"id":5,"name":"fix","file":"fix","editable":{"style":{"layout":["basic","position"]}}},"attrs":{"style":{"layout":{"width":"190px","height":"538px","top":"100px","left":"160px","backgroundColor":"rgba(255, 255, 255, 0)","backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170821163422188_217.jpg)"}}}},{"guid":"af701c43-1a18-4ccf-8d60-7839c1d2c6d3","name":"hotMap","module":{"id":7,"name":"hotMap","file":"hotMap","menus":["hotArea"],"editable":{"style":{"layout":["basic","position"]},"href":[{"label":"连接","component":"attrs"}]}},"attrs":{"style":{"layout":{"width":"100px","height":"100px","border":"1px solid #666","top":"120px","left":"400px"}},"href":"http://www.baidu.com"}}]}]
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

    componentDidMount() {
        document.addEventListener('click', (event) => {
            const guid = event.target.getAttribute('data-guid');

            if (guid) {
                this.mittActive(guid);
            } else {
                this.mittActive(null);
            }
        })
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
     * @param type 修改后值
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
        });

        Panel.active(guid);
    }

    mittSave() {
        console.log(JSON.stringify(this.state.data));
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
