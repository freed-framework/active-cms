/**
 * @file render.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import Lazyer from './Lazyer';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data || [],
        }
    }

    loop(data) {
        return data.map(item => (
            <div
                key={item.guid}
            >
                <Lazyer item={item}>
                    {mod => {
                        const App = mod.App;

                        // 获取样式
                        let props = {
                            style: item.style,
                            attrs: item.attrs,
                            guid: item.guid,
                        };

                        // 如果存在需要组件转换情况
                        let transData = {};
                        if (item.dataTrans) {
                            transData = {
                                ...App.dataTrans(item.dataTrans)
                            };
                        }

                        return (
                            <App
                                id={item.guid}
                                key={item.guid}
                                // 模块名
                                module={item.name}
                                {...props}
                                {...transData.props}
                            >
                                {/* 通过数据转换生成的组件的子组件 */}
                                {transData.childNodes}

                                {/* data 数据关系下的父子组件 */}
                                {item.children && this.loopRender(item.children)}
                            </App>
                        );
                    }}
                </Lazyer>
            </div>
        ));
    }

    render() {
        const { data } = this.state;

        if (!data) {
            return null;
        }

        return (
            <div>
                {this.loop(data)}
            </div>
        );
    }
}

export default App;





/*
import React, { Component } from 'react';
import Lazyer from './Lazyer';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.pageData,
            // tabs: [{"name":"layer","guid":"ddddds11-1ead-43ae-b6de-e6debb958b08","style":{"layout":{"width":100}}},{"name":"layer","guid":"237d6d2c-1034-4f76-a5c8-6678b9a3cb78","style":{"layout":{"height":60}},"children":[{"guid":"161cc93a-43af-435f-a011-9c676f87ff7b","name":"tabs","module":{"id":1,"name":"tabs","file":"tabs","menus":[],"editable":{"layout":["basic"],"title":["basic"],"main":["basic"]}},"style":{"title":{"height":"50"}}}]}],
        };
    }

    loop(data) {
        return data.map(item => (
            <div
                key={item.guid}
            >
                <Lazyer item={item}>
                    {mod => (
                        <mod.App attrs={item.attrs}>
                            {item.children && this.loop(item.children)}
                        </mod.App>
                    )}
                </Lazyer>
            </div>
        ));
    }

    render() {
        const { data } = this.state;
        if (!data) {
            return null;
        }

        return (
            <div>
                {this.loop(data)}
            </div>
        );
    }
}

export default App;
*/
