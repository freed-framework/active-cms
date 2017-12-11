/**
 * @file loader.js
 * @author denglingbo
 *
 * 异步加载组件
 */
import resolveData from './resolveData';

const loader = (item, topWrappedModule) => {
    // 如果已经有组件被创建，则直接 resolve
    if (item.App) {
        return Promise.resolve(item);
    }

    return new Promise((resolve) => {
        import(`../../../components/${item.name}/index`)
            .then(App => resolve(resolveData(App, item, topWrappedModule)))
            .catch(ex => {
                console.log(ex);
            })
    });
}

export default loader;
