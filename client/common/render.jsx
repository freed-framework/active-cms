/**
 * @file render.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data || [],

            tileData: null,
        }

        if (this.state.data.length) {
            this.setDataAndTile(props.data);
        }
    }

    componentDidMount() {
        if (this.state.data.length) {
            this.setDataAndTile(this.state.data);
        }
    }

    componentWillUnmount() {}

    componentWillReceiveProps(nextProps) {
        this.setDataAndTile(nextProps.data);
    }

    /**
     * 将数据平铺
     * @param data
     * @param arr
     * @return {Array}
     */
    data2Tile(data, arr = []) {
        const looper = (data) => {
            data.forEach(item => {
                arr = arr.concat(Module.get(item));

                if (item.children) {
                    looper(item.children, arr);
                }
            });
        }

        looper(data);

        return arr;
    }

    /**
     * 设置 state.tabs & state.tileData
     * @param dataArr
     * @param callback
     */
    setDataAndTile(dataArr = [], callback = () => {}) {
        // 平铺的绑定了 App 的数据
        const tileData = {};
        const tile = this.data2Tile(dataArr);

        Promise.all(tile).then(values => {
            values.forEach(v => {
                tileData[v.guid] = v;
            });

            this.setState({
                data: dataArr,
                tileData,
            }, () => callback);
        });
    }

    /**
     * 原始数据
     * @param data
     */
    loopRender(data) {
        const tileData = this.state.tileData;

        return data.map(item => {
            // 获取App 组件
            const d = tileData[item.guid];
            const App = d.App;

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
        });
    }

    render() {
        const { tileData, data } = this.state;

        if (!tileData || data.length === 0) {
            return null;
        }

        return (
            <div>
                {this.loopRender(data)}
            </div>
        )
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
