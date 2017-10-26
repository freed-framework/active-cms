/**
 * @file module.js
 * @author denglingbo
 *
 */
import React from 'react';
import { fromJS } from 'immutable';
import utils from '../components/util/util';

class Module {
    /**
     * 异步加载组件
     * @param item
     */
    static asyncComponent(item) {
        // 如果已经有组件被创建，则直接 resolve
        if (item.App && item.module) {
            return Promise.resolve(item);
        }

        return new Promise((resolve) => {
            import(`../components/${item.name}/index`)
                .then(App => {
                    return resolve({
                        // 返回数据
                        // ...item,
                        guid: item.guid,
                        // 返回组件 name
                        name: item.name,
                        // 组件属性对象
                        attrs: item.attrs,
                        // 返回模块配置
                        ...(App.config && { module: {...App.config} }),
                        // 返回组件
                        App: App.default,
                    });
                })
        })
    }

    /**
     * 获取组件
     * @param item
     * @return {*}
     */
    static get(item) {
        return this.asyncComponent(item);
    }

    /**
     * 创建组件
     * @param moduleName
     * @return {Promise}
     */
    static create(moduleName) {
        return {
            guid: `ec-module-${utils.guid()}`,
            name: moduleName,
        }
    }

    /**
     * 编辑模块
     * @param guid
     * @param data
     * @param target {string} layout, main, ...
     * @param attr
     * @param value
     * @param type
     * @return {any|*}
     */
    static edit(guid, data, target, attr, value, type) {
        let $new = fromJS({});
        const $data = fromJS(data);

        utils.find($data, guid, ($finder, deep) => {
            let setBy = deep;

            // TODO: 待改进
            if (target === null) {
                setBy = deep.concat([attr, 'data']);
            } else {

                if (type === 'attr') {
                    setBy = deep.concat(['attrs', target]);
                }
                else {
                    setBy = deep.concat(['attrs', 'style', target, attr]);
                }
            }
            
            $new = $data.setIn(setBy, value);
            
        }, {
            findBy: 'guid',
        })

        return $new.toJS();
    }

    /**
     * 通过 guid 查找数据
     * @param guid
     * @param data
     * @param callback
     * @return {any}
     */
    static findByGuid(guid, data, callback) {
        let $new = fromJS({});

        utils.find(data, guid, ($finder, deep) => {
            $new = callback($finder, deep);
        }, {
            findBy: 'guid',
        });

        return $new;
    }

    /**
     * 通过 guid 修改数据
     * @param guid {string} 查找的 id
     * @param data {Array} 原始数据
     * @param keys {Array} 指定修改的位置, eg: ['dataTrans', 'data']
     * @param value {any} 指定位置对应修改的值, eg: {...}
     */
    static modify(guid, data, keys, value) {
        const $data = fromJS(data);

        return this.findByGuid(guid, $data, ($finder, deep) => (
            $data.setIn(deep.concat(keys), value)
        )).toJS();
    }

    /**
     * 移除一条组件数据
     * @param guid
     * @param data
     * @return {*}
     */
    static remove(guid, data) {
        return utils.deleteByGuid(data, guid);
    }

    /**
     * 复制组件
     * @param guid
     * @param data
     * @return {*}
     */
    static copy(guid, data) {
        return utils.copyByGuid(data, guid);
    }

    /**
     * 粘贴组件
     * @param guid
     * @param data
     * @param copyData
     * @return {*}
     */
    static paste(guid, data, copyData) {
        return utils.pasteByGuid(data, guid, copyData);
    }

    /**
     * 移动组件
     * @param {Array} data 页面数据
     * @param {string} startId 组件id
     * @param {string} endId 组件id
     */
    static move(data, startId, endId) {
        return utils.move(data, startId, endId);
    }
}

export default Module;
