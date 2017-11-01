/**
 * @file AppComponent.jsx
 * @author denglingbo
 */

import React from 'react';
import Lazyer from './Lazyer';

/**
 * 循环便利数组
 * @param data
 */
const loop = (data) => data.map(item => (
    <div
        key={item.guid}
    >
        <Lazyer item={item}>
            {mod => <AppComponent component={mod.App} item={item} />}
        </Lazyer>
    </div>
));

/**
 * 创建单个 Component
 * @param props
 * @return {XML}
 * @constructor
 */
const AppComponent = (props) => {
    const item = props.item;
    const App = props.component;

    // 获取样式
    let p = {
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
            {...p}
            {...transData.props}
        >
            {/* 通过数据转换生成的组件的子组件 */}
            {transData.childNodes}

            {/* data 数据关系下的父子组件 */}
            {item.children && loop(item.children)}
        </App>
    );
}

const App = (props) => <div>{loop(props.data)}</div>;

App.defaultProps = {
    data: [],
}

export default App;
