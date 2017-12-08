/**
 * @file resolve.js
 * @author denglingbo
 *
 */

export default (App, item, topWrappedModule) => {
    const Component = App.default;

    return {
        // ...item,
        guid: item.guid,
        // 返回组件
        App: Component,
        // 包裹该组件最顶层的组件名
        ...(topWrappedModule && { topWrappedModule }),
        // displayName
        ...(item.displayName && { displayName: item.displayName }),
        // 返回模块配置
        ...(Component.config && { config: { ...Component.config } }),
        // <TODO> 组件属性对象 将废弃
        // ...(item.attrs && {attrs: { ...item.attrs }}),
        // 该数据用于组件内部的转换
        ...(item.dataTrans && {dataTrans: { ...item.dataTrans }}),
        // ...(item.children && {children: { ...item.children }}),
        ...(item.children && {children: item.children}),
        // 该 props 用于实际组件将要展开的数据
        ...(item.componentProps && {componentProps: { ...item.componentProps }}),
    }
}
