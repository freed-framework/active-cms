/**
 * @file AppComponent.jsx
 * @author denglingbo
 */
import React from 'react';
import Lazyer from './Lazyer';
import Img from '../../components/mobile/img';

/**
 * 创建单个 Component
 * @param props
 * @return {XML}
 * @constructor
 */
const AppComponent = (props) => {
    const item = props.item;
    const App = props.module.App;

    // 获取属性
    let allProps = {
        ...(item.style && { style: item.style }),
        ...(item.atts && { attrs: item.attrs }),
        ...(item.guid && { guid: item.guid }),
        ...(item.componentProps && { ...item.componentProps }),

        // 这里如果有子组件需要通过 data 数据来继承 的属性，由 children loop 的时候添加到 props.extendsProps 上
        ...(props.extendsProps && { extendsProps: props.extendsProps })
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
            module={item.name}
            {...allProps}
            {...transData.props}
        >
            {/* 通过数据转换生成的组件的子组件 */}
            {transData.childNodes ? transData.childNodes : null}

            {/* data 数据关系下的父子组件 */}
            {item.children && loop(item.children, allProps.extendsProps)}
        </App>
    );
}

/**
 * 循环便利数组
 * @param data
 * @param type 调用指定 components 库的 key
 */
const loop = (data, extendsProps = null) => data.map(item => (
    <Lazyer
        key={item.guid}
        item={item}
    >
        {mod => (
            <AppComponent
                {...mod}
                extendsProps={extendsProps}
            />
        )}
    </Lazyer>
));

const App = (props) => <div>{loop(props.data)}</div>;

App.defaultProps = {
    data: [],
}

export default App;
