/**
 * @file AppComponent.jsx
 * @author denglingbo
 */
import React from 'react';
import Lazyer from './Lazyer';
import Img from '../../components/mobile/img';
import { num2rem } from './util';

/**
 * 转换数据
 * @param data
 */
function transPx(data) {
    const transExpr = /^(width|height|padding|margin)$/;
    const trans = JSON.parse(JSON.stringify(data));

    Object.keys(trans).forEach(k => {
        const item = trans[k];

        Object.keys(item).forEach(key => {
            if (transExpr.test(key)) {
                item[key] = num2rem(item[key]);
            }
        })
    });

    return trans;
}

/**
 * 创建单个 Component
 * <TODO START>
 *     此处 props 需要传递一个属性来判断是否需要对 componentProps 进行 px 转换的配置
 *     { transPx: true, rootFontSize: 100 }
 * <TODO END>
 * @param props
 * @return {XML}
 * @constructor
 */
const AppComponent = (props) => {
    const item = props.item;
    const App = props.module.App;
    const componentProps = Object.assign({}, item.componentProps);
    const extendsProps = Object.assign({}, props.extendsProps);

    // 移动端数据转换
    if (props.pageType === 'mobile') {
        if (componentProps && componentProps.style) {
            componentProps.style = transPx(componentProps.style);
        }
        if (extendsProps && extendsProps.style) {
            extendsProps.style = transPx(extendsProps.style);
        }
    }

    // 获取属性
    let allProps = {
        ...(item.style && { style: item.style }),
        ...(item.atts && { attrs: item.attrs }),
        ...(item.guid && { guid: item.guid }),
        ...(componentProps && { ...componentProps }),
        // 这里如果有子组件需要通过 data 数据来继承 的属性，由 children loop 的时候添加到 props.extendsProps 上
        ...(extendsProps && { ...extendsProps })
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
            {item.children && loop({
                data: item.children,
                pageType: props.pageType,
                ...(allProps.extendsProps && { extendsProps: allProps.extendsProps }),
            })}
        </App>
    );
}

/**
 *
 * @param data
 * @param pageType
 * @param extendsProps
 */
const loop = (props) => props.data.map(item => (
    <Lazyer
        key={item.guid}
        item={item}
    >
        {mod => (
            <AppComponent {...{
                ...mod,
                ...(props.extendsProps && { extendsProps: props.extendsProps }),
                pageType: props.pageType,
            }} />
        )}
    </Lazyer>
));

const App = props => (
    <div>{loop(props)}</div>
);

App.defaultProps = {
    data: [],
}

export default App;
