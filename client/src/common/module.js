/**
 * @file module.js
 * @author denglingbo
 *
 */
import React from 'react';
import { fromJS, Map, List } from 'immutable';
import utils from '../../components/util/util';
import loader from './loader/loader';

class Module {
    /**
     * 获取组件
     * @return {*}
     */
    static get(item, topWrappedModule) {
        return loader(item, topWrappedModule);
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
                // 编辑自定义属性
                if (type === 'attr') {
                    setBy = deep.concat(['attrs', target]);
                }
                // 编辑children
                else if (type === 'children') {
                    setBy = deep.concat(['children']);
                }
                // 编辑样式属性
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

        const result = this.findByGuid(guid, $data, ($finder, deep) => {
            const $val = fromJS(value);

            if (Map.isMap($val)) {
                const oldData = $data.getIn(deep.concat(keys)) || fromJS({});

                // TODO 此处判断有问题
                if (oldData) {
                    // Map
                    const mergeData = oldData.mergeDeep(value);
                    return $data.setIn(deep.concat(keys), mergeData.toJS());
                }
            }

            return $data.setIn(deep.concat(keys), value);
        });

        if (result.size === 0) {
            return data;
        }

        return result.toJS();
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
     * 粘贴组件 <TODO> 石进华，你个逗比，module 就是处理数据的，你居然放在 util
     * @param guid
     * @param data
     * @param copyData
     * @return {*}
     */
    static paste(guid, data, copyData) {
        const $data = fromJS(data);

        return this.findByGuid(guid, $data, ($finder, deep) => {
            if (deep.length === 1) {
                return $data.concat(utils.changeGuid([copyData]));
            }

            deep.pop();

            return $data.setIn(
                deep,
                $data.getIn(deep).concat(utils.changeGuid([copyData]))
            );
        }).toJS();

        // return utils.pasteByGuid(data, guid, copyData);
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
