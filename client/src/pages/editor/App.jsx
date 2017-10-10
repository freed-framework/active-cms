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
import { Editor, Panel, TopMenu, Control } from '../../components';
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
            info: {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            },
            hoverId: null,
            data: [{"guid":"a7731b7c-9ae6-4983-8ec0-417e4f23b239","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tab","floor","img","fix","float"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"padding":"","backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926094353408_22.jpg)","height":"725px"}},"anchor":"1"},"children":[{"guid":"d2e97c0c-1b6b-4455-9ab3-5ce109acd263","name":"fix","module":{"name":"fix","menus":["floor","hotMap"],"editable":{"style":{"layout":["basic"]},"distanceLeft":[{"label":"侧边距离","component":"attrs"}],"distanceTop":[{"label":"顶部距离","component":"attrs"}],"target":[{"label":"定位目标","component":"radio","data":[{"key":"body","label":"窗口"},{"key":"parent","label":"父元素"}]}],"horizontal":[{"label":"水平方向定位","component":"chooseData","items":[{"key":"left","label":"左"},{"key":"right","label":"右"}]}],"vertical":[{"label":"垂直方向定位","component":"chooseData","items":[{"key":"top","label":"上"},{"key":"bottom","label":"下"}]}]}},"attrs":{"style":{"layout":{"height":"150","width":"100%","backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926160800707_500.png)"}},"vertical":{"key":"bottom","value":0}},"children":[{"guid":"46c3f9b7-c1b1-47ad-bdd6-009d4d823ace","name":"floor","module":{"name":"floor","menus":["pre-image","tab","floor","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"width":"156","height":"150","backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926160824131_922.png)"}}}}]}]},{"guid":"8128c45e-2044-4a55-aaa8-560cab083c06","name":"floor","module":{"name":"floor","menus":["pre-image","tab","floor","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926094528831_125.jpg)","height":"614px"}}},"children":[{"guid":"d01a5953-765e-4f1b-9144-192d05b820f8","name":"floor","module":{"name":"floor","menus":["pre-image","tab","floor","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926095306436_191.jpg)","height":"614px","width":"1200px","margin":"0 auto"}},"anchor":"2"},"children":[{"guid":"bb764452-af31-4f2d-9650-60c9b3aa710e","name":"fix","module":{"name":"fix","menus":["floor","hotMap"],"editable":{"style":{"layout":["basic"]},"distanceLeft":[{"label":"侧边距离","component":"attrs"}],"distanceTop":[{"label":"顶部距离","component":"attrs"}],"target":[{"label":"定位目标","component":"radio","data":[{"key":"body","label":"窗口"},{"key":"parent","label":"父元素"}]}],"horizontal":[{"label":"水平方向定位","component":"chooseData","items":[{"key":"left","label":"左"},{"key":"right","label":"右"}]}],"vertical":[{"label":"垂直方向定位","component":"chooseData","items":[{"key":"top","label":"上"},{"key":"bottom","label":"下"}]}]}},"attrs":{"style":{"layout":{"width":"136","height":"596","backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926095353465_585.png)"}},"target":"parent","horizontal":{"key":"left","value":"-1300"}},"children":[{"guid":"f1153ccf-dd92-4b55-b6da-6bf5e66af9be","name":"hotMap","module":{"name":"hotMap","editable":{"style":{"layout":["basic","position"]},"href":[{"label":"连接","component":"attrs"}]}},"attrs":{"style":{"layout":{"width":"60","height":"52","border":"1px solid #333","top":510,"margin":"","left":30}},"href":"#1"}},{"guid":"55cf84ae-0c53-44df-90bd-96c0d4b171bb","name":"hotMap","module":{"name":"hotMap","editable":{"style":{"layout":["basic","position"]},"href":[{"label":"连接","component":"attrs"}]}},"attrs":{"style":{"layout":{"width":"60","height":"52","border":"1px solid #333","top":110,"left":30}},"href":"#1"}},{"guid":"257f49f6-7a4c-4515-9918-c87d0f6824ac","name":"hotMap","module":{"name":"hotMap","editable":{"style":{"layout":["basic","position"]},"href":[{"label":"连接","component":"attrs"}]}},"attrs":{"style":{"layout":{"width":"60","height":"52","border":"1px solid #333","top":161,"left":30}},"href":"#2"}}]}]}]},{"guid":"d48dc166-e582-4647-8f64-d77e16a7fdb9","name":"floor","module":{"name":"floor","menus":["pre-image","tab","floor","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926095235519_212.jpg)","height":"8559"}}}}]
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
            // guid 作为 id 被添加到组件上
            const guid = event.target.getAttribute('id');

            if (guid) {
                this.mittActive(guid);
            } else {
                this.mittActive(null);
            }
        });

        document.addEventListener('mouseover', (event) => {
            const target = event.target;
            const guid = target.getAttribute('id');

            if (guid) {
                const info = {
                    width: target.offsetWidth,
                    height: target.offsetHeight,
                    left: target.offsetLeft,
                    top: target.offsetTop,
                };

                this.setState({
                    info,
                    hoverId: guid,
                });
            }
        });
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
        const { info, hoverId } = this.state;

        return (
            <div>
                <Control
                    hoverId={hoverId}
                    info={info}
                />

                {/* Top Menu */}
                <TopMenu />

                {/* 模块 */}
                <div className="as-editor-canvas">
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
