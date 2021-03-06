/**
 * @file AppComponent.jsx
 * @author denglingbo
 *
 * 创建单个 Component
 * <TODO START>
 *     此处 props 需要传递一个属性来判断是否需要对 componentProps 进行 px 转换的配置
 *     { transPx: true, rootFontSize: 100 }
 * <TODO END>
 * @param props
 * @return {XML}
 * @constructor
 */
import React from 'react';
import { transPx } from './util/util';

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
    if (!props.module) {
        return null;
    }

    const item = props.item;
    const App = props.module.App;
    const config = props.module && props.module.config ? props.module.config : null;
    const componentProps = Object.assign({}, item.componentProps);
    const extendsProps = Object.assign({}, props.extendsProps);

    // 移动端数据转换
    if (props.pageType === 'mobile' && !props.isEdit) {
        if (componentProps && componentProps.style) {
            componentProps.style = transPx(componentProps.style);
        }
        if (extendsProps && extendsProps.style) {
            extendsProps.style = transPx(extendsProps.style);
        }
    }

    // 获取属性
    let allProps = {
        // ...(item.atts && { attrs: item.attrs }),
        ...(item.guid && { guid: item.guid }),
        ...(item.style && { style: item.style }),
        ...(config && { config, }),
        // 给 components 组件判断是否是编辑模式
        ...(props.isEdit && { isEdit: props.isEdit }),
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

    // <TODO> children 待优化
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

            {props.children && props.children({
                data: item.children || [],
                ...(allProps.extendsProps && { extendsProps: allProps.extendsProps }),
                // // 给 components 组件判断是否是编辑模式
                ...(props.isEdit && { isEdit: props.isEdit }),
                pageType: props.pageType,
            })}
        </App>
    );
}

export default AppComponent;
