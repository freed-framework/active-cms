/**
 * @file index.js
 * @author denglingbo
 *
 */
import _ from 'lodash';

import Fixer from './fixer';
import Floor from './floor';
import Tab from './tab';
import PreImage from './preImage';

export const modules = [
    // 楼层组件
    {
        id: 3,
        name: 'floor',
        file: 'floor',
        menus: ['pre-image', 'tab'],
        editable: {
            layout: ['basic'],
        },
        App: Floor
    },
    // tab 组件
    {
        id: 1,
        name: 'tab',
        file: 'tab',
        menus: [],
        editable: {
            layout: ['basic'],
            title: ['basic'],
            main: ['basic'],
        },
        App: Tab
    },
    // 浮动组件
    {
        id: 2,
        name: 'fixer',
        file: 'fixer',
        menus: [],
        App: Fixer
    },
    // 图片处理组件
    {
        id: 10,
        name: 'pre-image',
        file: 'preImage',
        App: PreImage
    },
]

/**
 * 查找组件
 * @param arg, moduleName or [moduleName, moduleName, ...]
 * @param callback
 */
export const findComponents = (arg, callback) => {
    let arr = [];
    if (_.isString(arg)) {
        arr.push(arg);
    } else if (_.isArray(arg)) {
        arr = arg;
    } else {
        return;
    }

    arr.forEach(moduleName => {
        modules.forEach(module => {
            if (module.name === moduleName) {
                callback(module);
            }
        });
    });
}
