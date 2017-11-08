/**
 * @file AppComponent.jsx
 * @author denglingbo
 */
import React from 'react';
import Lazyer from './Lazyer';

/**
 * 循环便利数组
 * @param data
 * @param type 调用指定 components 库的 key
 */
const loop = (data, type) => data.map(item => (
    <div
        key={item.guid}
    >
        <Lazyer
            item={item}
            type={type}
        >
            {mod => <AppComponent component={mod.App} item={item} type={type} />}
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
    const type = props.type;
    const App = props.component;

    // 获取属性
    let allProps = {
        style: item.style,
        attrs: item.attrs,
        guid: item.guid,
    };

    // 如果存在需要组件转换情况
    let transData = {};
    if (item.dataTrans && App.dataTrans) {
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
            {...allProps}
            {...transData.props}
            {...item.componentProps}
        >
            {/* 通过数据转换生成的组件的子组件 */}
            {transData.childNodes ? transData.childNodes : null}

            {/* data 数据关系下的父子组件 */}
            {item.children && loop(item.children, type)}
        </App>
    );
}

const App = (props) => <div>{loop(props.data, props.type)}</div>;

App.defaultProps = {
    data: [],
    type: null,
}

export default App;
