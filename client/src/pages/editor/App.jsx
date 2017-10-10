/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { message, Modal, Input } from 'antd';
import utils from '../../../components/util/util';
import module from '../../../common/module';

import { addPage, getPage, editPage } from '../../server';
import { Editor, Panel, TopMenu, Control } from '../../components';
import mitt from 'mitt';
import './app.scss';

const confirm = Modal.confirm;

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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rect: {},
            hoverId: null,
            data: [],
        };

        this.mittDelete = ::this.mittDelete;
        this.mittAdd = ::this.mittAdd;
        this.mittEdit = ::this.mittEdit;
        this.mittActive = ::this.mittActive;
        this.mittSave = ::this.mittSave;
        this.mittViewer = ::this.mittViewer;

        emitter.on('delete', this.mittDelete);
        emitter.on('add', this.mittAdd);
        emitter.on('edit', this.mittEdit);
        emitter.on('active', this.mittActive);
        emitter.on('save', this.mittSave);
        emitter.on('viewer', this.mittViewer)
    }

    componentDidMount() {
        const { match = {} } = this.props;
        const { params = {} } = match;
        const { id } = params;
        id && getPage(id).then((res) => {
            const { data } = res;
            this.setState({
                data: data.content
            })
        })

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
                const rect = target.getBoundingClientRect();

                this.setState({
                    rect: {
                        width: rect.width,
                        height: rect.height,
                        left: rect.left + window.scrollX,
                        top: rect.top + window.scrollY,
                    },
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

    showConfirm = (callback) => {
        confirm({
            title: '请输入页面标题?',
            content: <Input onChange={this.handleChange} />,
            onOk: callback,
            onCancel() {},
        });
    }

    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    mittSave() {
        const { location = '', match = {} } = this.props;
        const { params = {} } = match;
        const { id } = params;
        if ( !this.state.data.length ) {
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
                    "title": title,
                    "content":  this.state.data
                }).then((res) => {
                    message.success('保存成功')
                    this.props.history.replace(`/${res.data.id}${location.hash}`)
                })
            })
        }
        // 编辑
        else {
            editPage({
                "id": id,
                "page": {
                    "content": this.state.data
                }
            }).then((res) => {
                message.success('保存成功')
            })
        }
        
        console.log(JSON.stringify(this.state.data))
    }

    mittViewer() {
        this.props.history.replace(`/view`)
    }

    render() {
        const { rect, hoverId } = this.state;

        return (
            <div>
                <Control
                    hoverId={hoverId}
                    rect={rect}
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
