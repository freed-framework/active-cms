/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { Module, Render } from '../render';

class App extends Component {
    constructor(props) {
        super(props);

        this.addComponent = ::this.addComponent;
        this.removeComponent = ::this.removeComponent;
        this.saveData = ::this.saveData;

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

    componentDidMount() {
        Module.all(this.state.data)
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

        Module.create(cid, type)
            .then(value => {
                this.setState({
                    data: this.state.data.concat(value),
                })
            });
    }

    /**
     * 移除渲染的组件
     * @param guid
     */
    removeComponent(guid) {
        this.setState({
            data: Module.remove(guid, this.state.data)
        });
    }

    /**
     * 储存数据
     */
    saveData() {
        console.log(JSON.stringify(this.state.data))
    }

    render() {
        const { data } = this.state;

        return (
            <div>
                <Render.TopController
                    addComponent={this.addComponent}
                    saveData={this.saveData}
                />
                {data.map(item => (
                    <Render.Editor
                        key={item.guid}
                        data={item}
                        removeComponent={this.removeComponent}
                    />
                ))}
            </div>
        );
    }
}

export default App;
