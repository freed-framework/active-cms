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
        menus: ['pre-image', 'tab'],
        editable: {
            box: {
                width: true,
                height: true,
                background: true,
                border: true,
                'background-size': true
            }
        },
    },
    // tab 组件
    {
        id: 1,
        name: 'tab',
        file: 'tab',
        menus: [],
        editable: {
            title: {
                width: true,
                height: true,
            }
        }
    },
    // 浮动组件
    {
        id: 2,
        name: 'fixer',
        file: 'fixer',
        menus: [],
    },
    // 图片处理组件
    {
        id: 10,
        name: 'pre-image',
        file: 'preImage',
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
