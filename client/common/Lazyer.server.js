/**
 * @file Lazyer.js
 * @author denglingbo
 *
 * Des
 */

import React from 'react';
import { findComponents } from '../components/index';

const Lazyer = (props) => {
    const { item } = props;
    let result = null;
    findComponents(item.name, (module) => {
        result = props.children({
            // 返回数据
            ...item,
            // 返回模块配置
            module: {...module},
            // 返回组件
            App: module.App,
        });
    })
    return result;
}

export default Lazyer;
