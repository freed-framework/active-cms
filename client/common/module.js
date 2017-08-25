/**
 * @file module.js
 * @author denglingbo
 *
 */
import { findComponents } from '../components/index';
import Panel from '../common/render/panel/Panel';
import utils from './util/util';

class Module {
    /**
     * 通过 data 数据中的 componentId 查找所有组件并封装返回
     * @param data [{ cid: xxx, ... }, ...]
     * @return {Promise.<*>}
     */
    static all(data) {
        const promiseList = [];

        data.forEach(item => {
            promiseList.push(new Promise((resolve) => {
                findComponents(item.name, module => {
                    import(`../components/${module.name}/index`)
                        .then(App => {
                            return resolve({
                                // 返回数据
                                ...item,
                                // 返回模块配置
                                module: {...module},
                                // 返回组件
                                Component: App.default,
                            });
                        })
                });
            }))

        });

        return Promise.all(promiseList);
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
                            Component: App.default,
                        });
                    })
            });
        })
    }

    /**
     * 移除一条组件数据
     * @param guid
     * @param data
     * @return {*}
     */
    static remove(guid, data) {
        // 通知 panel 删除编辑菜单
        Panel.delete(guid);

        return utils.deleteByGuid(data, guid);
    }
}

export default Module;
