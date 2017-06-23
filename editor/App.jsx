/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { Button } from 'antd';
import EditorWrapper from '../common/container/EditorWrapper';
import Render from '../render';

class App extends Component {
    constructor(props) {
        super(props);

        this.addComponent = ::this.addComponent;
        this.removeComponent = ::this.removeComponent;
        this.save = ::this.save;

        this.state = {
            // data: []
            data: [{
                "cid": "3",
                "type": "floor",
                "guid": "ddddds11-1ead-43ae-b6de-e6debb958b08"
            }, {
                "cid":"3",
                "type": "floor",
                "guid": "237d6d2c-1034-4f76-a5c8-6678b9a3cb78"
            }, {
                "cid": "3",
                "type": "floor",
                "guid": "f1327a51-1ead-43ae-b6de-e6debb958b08"
            }]
        };
    }

    componentWillMount() {
        Render.components(this.state.data)
            .then(values => {
                this.setState({
                    data: values,
                })
            })
    }

    /**
     * 创建组件
     * @param event
     */
    addComponent(event) {
        const cid = event.currentTarget.getAttribute('data-cid');
        const type = event.currentTarget.getAttribute('data-type');

        Render.createComponent(cid, type)
            .then(value => {
                this.setState({
                    data: this.state.data.concat(value),
                })
            });
    }

    /**
     * 移除组件
     * @param guid
     */
    removeComponent(guid) {
        const { data } = this.state;

        data.forEach((App, index) => {
            if (App.guid.toString() === guid.toString()) {
                data.splice(index, 1);
            }
        });

        this.setState({
            data,
        });
    }

    /**
     * 储存数据
     */
    save() {
        console.log(JSON.stringify(this.state.data))
    }

    render() {
        const { data } = this.state;

        return (
            <div>
                <div>
                    <Button
                        data-cid="3"
                        data-type="floor"
                        onClick={this.addComponent}
                    >
                        添加楼层
                    </Button>
                    <Button
                        onClick={this.save}
                    >
                        保存
                    </Button>
                </div>
                <div>
                    {data.map(item => {
                        if (!item.component) {
                            return null;
                        }

                        return (
                            <EditorWrapper
                                key={item.guid}
                                guid={item.guid}
                                onRemoveComponent={this.removeComponent}
                            >
                                <item.component />
                            </EditorWrapper>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default App;
