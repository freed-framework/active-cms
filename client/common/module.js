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
                        ...item,
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
        return this.asyncComponent({
            guid: `ec-module-${utils.guid()}`,
            name: moduleName,
        })
    }

    /**
     * 编辑模块
     * @param guid
     * @param data
     * @param target
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
            if (type === 'attr') {
                setBy = deep.concat(['attrs', target]);
            }
            else {
                setBy = deep.concat(['attrs', 'style', target, attr]);
            }
            
            $new = $data.setIn(setBy, value);
            // console.log($new.toJS())
            
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
        return utils.deleteByGuid(data, guid);
    }
}

export default Module;
