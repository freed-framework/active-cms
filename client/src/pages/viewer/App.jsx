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
import Lazyer from '../../../common/Lazyer';
import '../editor/app.scss';

class App extends Component {
    constructor(props) {
        super(props);
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
                                {item.children && this.loop(item.children)}
                            </App>
                        );
                    }}
                </Lazyer>
            </div>
        ));
    }

    render() {
        const { data } = this.props;

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
