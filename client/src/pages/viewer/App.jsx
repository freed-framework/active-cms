/**
 * @file App.jsx
 * @author denglingbo
 *
 * 预览功能页面
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPage } from '../../services';
import { Editor } from '../../components';
import Module from '../../../common/module';
import '../editor/app.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data || [],

            tileData: props.tileData,
        }
    }

    componentDidMount() {
        const { match = {} } = this.props;
        const { params = {} } = match;
        const { id } = params;
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
