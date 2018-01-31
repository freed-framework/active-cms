/**
 * @file config.d.ts
 * @author denglingbo
 *
 * 来自于 component/config.ts
 */

interface Config {
    /**
     * 组件名，该字段也用于文件查找
     */
    name: string;

    /**
     * 组件的 默认配置
     */
    config?: any;

    /**
     * 默认 className
     */
    className?: string;

    /**
     * data-xxx 的 下 mapping 对象
     */
    dataTable?: any;

    /**
     * 在编辑模式下组件是否为通用组件
     */
    isCommon?: boolean;

    iconType?: any;

    draggable?: any;

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
