/**
 * @file index.js
 * @author denglingbo
 *
 */
export const modules = [
    // tab 组件
    {
        id: 1,
        name: 'tab',
    },
    // 浮动组件
    {
        id: 2,
        name: 'fixer',
    },
    // 楼层组件
    {
        id: 3,
        name: 'floor',
    },
]

export const findComponents = (mid, callback) => {
    modules.forEach(module => {
        if (module.id.toString() === mid.toString()) {
            callback(module);
        }
    });
}
