/**
 * @file module.js
 * @author denglingbo
 *
 */
import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { findComponents } from '../components/index';
import Panel from '../common/render/panel';
import utils from './util/util';

class Module {
    /**
     * 异步加载组件
     * @param item
     */
    static asyncComponent(item) {
        // 如果已经有组件被创建，则直接 resolve
        if (item.App || item.module) {
            return Promise.resolve(item);
        }

        return new Promise((resolve) => {
            findComponents(item.name, module => {
                import(`../components/${module.name}/index`)
                    .then(App => {
                        return resolve({
                            // 返回数据
                            ...item,
                            // 返回模块配置
                            module: {...module},
                            // 返回组件
                            App: App.default,
                        });
                    })
            });
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
        return new Promise((resolve) => {
            findComponents(moduleName, (module) => {
                import(`../components/${module.file}/index`)
                    .then(App => {
                        return resolve({
                            // 保存模块 ID
                            cid: module.id,
                            // 保存 guid，用作 key
                            guid: utils.guid(),
                            // 返回模块配置
                            module: {...module},
                            // 返回组件
                            App: App.default,
                        });
                    })
            });
        })
    }

    /**
     * 编辑模块
     * @param guid
     * @param data
     * @param attr
     * @param value
     * @return {any|*}
     */
    static edit(guid, data, attr, value) {
        let $new = fromJS({});
        const $data = fromJS(data);

        utils.find($data, guid, ($finder, deep) => {
            const setBy = deep.concat(['style', attr]);

            $new = $data.setIn(setBy, value);
        }, {
            findBy: 'guid',
        })

        return $new.toJS();
    }

    /**
     * 移除一条组件数据
     * @param guid
     * @param data
     * @return {*}
     */
    static remove(guid, data) {
        // 通知 panel 删除编辑菜单
        // Panel.delete(guid);

        return utils.deleteByGuid(data, guid);
    }
}

export default Module;
