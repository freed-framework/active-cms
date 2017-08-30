/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import _ from 'lodash';
import { fromJS } from 'immutable';
import utils from '../common/util/util';
import module from '../common/module';
import { Editor, Panel } from '../common/render';
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

export const editComponent = (event) => {
    const guid = event.currentTarget.getAttribute('data-guid');
    const attr = event.currentTarget.getAttribute('data-attr');
    const value = event.currentTarget.value;

    emitter.emit('edit', {
        guid,
        attr,
        value,
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
            data: [
                {
                    name: 'floor',
                    guid: 'ddddds11-1ead-43ae-b6de-e6debb958b08',
                    style: {
                        height: 100
                    },
                    // children: [],
                },
                {
                    name: 'floor',
                    guid: '237d6d2c-1034-4f76-a5c8-6678b9a3cb78',
                    style: {
                        height: 60
                    },
                },
                // {
                //     name: 'floor',
                //     guid: 'f1327a51-1ead-43ae-b6de-e6debb958b08'
                // }
            ],
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
     * @param guid
     * @param attr
     * @param value
     */
    mittEdit({ guid, attr, value }) {
        this.setState({
            data: module.edit(guid, this.state.data, attr, value),
        })
    }

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
