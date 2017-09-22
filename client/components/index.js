/**
 * @file index.js
 * @author denglingbo
 *
 */
import _ from 'lodash';

export const modules = [
    // 楼层组件
    {
        id: 3,
        name: 'floor',
        file: 'floor',
        menus: ['pre-image', 'tabs', 'floor', 'img', 'fix'],
        editable: {
            layout: ['basic'],
        }
    },
    // tabs 组件
    {
        id: 1,
        name: 'tabs',
        file: 'tabs',
        menus: [],
        editable: {
            layout: ['basic'],
            title: ['basic'],
            main: ['basic'],
        }
    },
    // 浮动组件
    {
        id: 2,
        name: 'fixer',
        file: 'fixer',
        menus: []
    },
    // 图片处理组件
    {
        id: 10,
        name: 'pre-image',
        file: 'preImage'
    },
    // 图片组件
    {
        id: 4,
        name: 'img',
        file: 'img',
        editable: {
            layout: ['basic'],
        }
    },
    // 固定组件
    {
        id: 5,
        name: 'fix',
        file: 'fix',
        editable: {
            layout: ['basic', 'position'],
        }
    }
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
