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
        menus: ['pre-image', 'tab', 'floor', 'img', 'fix', 'float', 'hotMap'],
        editable: {
            style: {
                layout: ['basic']
            }
        }
    },
    // tabs 组件
    {
        id: 1,
        name: 'tabs',
        file: 'tabs',
        menus: [],
        editable: {
            style: {
                layout: ['basic'],
                title: ['basic'],
                main: ['basic'],
            }
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
            style: {
                layout: ['basic'],
            },
            src: [{label: '链接', component: 'attrs'}]
        }
    },
    // 固定组件
    {
        id: 5,
        name: 'fix',
        file: 'fix',
        editable: {
            style: {
                layout: ['basic']
            },
            distanceLeft: [{label: '侧边距离', component: 'attrs'}],
            distanceTop: [{label: '顶部距离', component: 'attrs'}]
        }
    },
    // 浮动组件
    {
        id: 6,
        name: 'float',
        file: 'float',
        editable: {
            style: {
                layout: ['basic', 'position']
            }
        }
    },
    {
        id: 7,
        name: 'hotMap',
        file: 'hotMap',
        menus: ['hotArea'],
        editable: {
            style: {
                layout: ['basic', 'position']
            },
            href: [{label: '连接', component: 'attrs'}]
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
