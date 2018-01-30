
interface DefaultProps {
    id: string;
    style?: any;
    className?: string;
    
    // module name
    module?: string;

    // 组件的配置信息
    config?: any;

    // data-xxx 的 下 mapping 对象
    dataTable?: any;

    // 是否为编辑模式
    isEdit?: boolean;

    // 是否有需要继承上层组件的 props 属性
    extendsProps?: any;

    // 是否设置时间段限制
    termDates?: number[];
}

declare function escape(message: string): any;
declare function unescape(message: string): any;
