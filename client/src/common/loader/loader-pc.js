/**
 * @file loader-pc.js
 * @author denglingbo
 *
 * 异步加载组件
 */
import resolveData from './resolveData';

const loader = (item) => {
    // 如果已经有组件被创建，则直接 resolve
    if (item.App) {
        return Promise.resolve(item);
    }

    return new Promise((resolve) => {
        const name = item.name.split('/')[1];

        import(`../../../components/pc/${name}/index`)
            .then(App => resolve(resolveData(App, item)))
            .catch(ex => {
                console.log(ex);
            })
    });
}

export default loader;
