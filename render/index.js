/**
 * @file index.js
 * @author denglingbo
 *
 */
import { findComponents } from '../components';
import Utils from '../common/util/util';

class Render {

    /**
     * 通过 data 数据中的 componentId 查找所有组件并封装返回
     * @param data [{ cid: xxx, ... }, ...]
     * @return {Promise.<*>}
     */
    static components(data) {
        const promiseList = [];

        data.forEach(item => {
            promiseList.push(new Promise((resolve) => {
                findComponents(item.cid, (module) => {
                    import(`../components/${module.name}/index`)
                        .then((App) => {
                            return resolve({
                                ...item,
                                ...App,
                            });
                        })
                });
            }))

        });

        return Promise.all(promiseList);
    }

    /**
     * 创建组件
     * @param cid
     * @param type
     * @return {Promise}
     */
    static createComponent(cid, type) {
        return new Promise((resolve) => {
            findComponents(cid, (module) => {
                import(`../components/${module.name}/index`)
                    .then((App) => {
                        return resolve({
                            // 保存模块 ID
                            cid,
                            // 保存 guid，用作 key
                            guid: Utils.guid(),
                            // 组件类型
                            type,
                            ...App,
                        });
                    })
            });
        })
    }
}

export default Render;
