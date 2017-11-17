/**
 * @file config.d.ts
 * @author denglingbo
 *
 */

interface Config {
    /**
     * 组件名，该字段也用于文件查找
     */
    name: string;

    /**
     * 在编辑模式下组件是否为通用组件
     */
    isCommon?: boolean;

    /**
     * 用于显示的组件名字
     */
    displayName?: string;

    /**
     * 可添加的子组件
     */
    menus?: Array<string>;

    /**
     * 哪些属性可编辑
     */
    editable?: any;

    /**
     * 默认属性
     */
    defaultValues?: any;
}
