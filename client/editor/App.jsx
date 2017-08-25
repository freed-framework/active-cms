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
import { TopController, Editor, Panel } from '../common/render';
import mitt from 'mitt';

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
    const cname = event.currentTarget.getAttribute('data-name');
    const guid = event.currentTarget.getAttribute('data-guid');

    emitter.emit('add', {
        cname,
        guid,
    });
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
            data: [{
                name: 'floor',
                guid: 'ddddds11-1ead-43ae-b6de-e6debb958b08',
                props: {
                    style: {},
                    // ...
                },
                // children: [],
            },
                // {
                //     name: 'floor',
                //     guid: '237d6d2c-1034-4f76-a5c8-6678b9a3cb78'
                // }, {
                //     name: 'floor',
                //     guid: 'f1327a51-1ead-43ae-b6de-e6debb958b08'
                // }
            ],
        };

        this.mittDelete = ::this.mittDelete;
        this.mittAdd = ::this.mittAdd;
        this.mittSave = ::this.mittSave;

        emitter.on('delete', this.mittDelete);
        emitter.on('add', this.mittAdd);
        emitter.on('save', this.mittSave);
    }

    componentDidMount() {
        // 这个位置给 data 添加上组件方法
        module.all(this.state.data)
            .then(values => {
                this.setState({
                    data: values,
                })
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
        });
    }

    /**
     * 添加模块
     * @param cname
     * @param guid
     */
    mittAdd({ cname, guid }) {
        const data = this.state.data;

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

    mittSave() {
        console.log(JSON.stringify(this.state.data))
    }

    render() {
        const { data } = this.state;

        return (
            <div>
                <Panel />

                {data.map(item => {
                    return (
                        <Editor
                            key={item.guid}
                            data={item}
                        />
                    );
                })}
            </div>
        );
    }
}

export default App;
