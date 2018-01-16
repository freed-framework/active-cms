/**
 * @file loader.js
 * @author denglingbo
 *
 * 异步加载组件
 */
import resolveData from './resolveData';
import * as Components from '../../../components/mobile';

const loader = (item, topWrappedModule) => {
    // 如果已经有组件被创建，则直接 resolve
    if (item.App) {
        return Promise.resolve(item);
    }

    return new Promise((resolve, reject) => {
        if (!item.name) {
            return reject();
        }

        import(`../../../components/${item.name}/index`)
            .then(App => resolve(resolveData(App, item, topWrappedModule)))
            .catch(ex => {
                console.error(ex);
            })
    });
}

export default loader;
