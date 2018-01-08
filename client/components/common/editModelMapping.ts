
class EditModelMapping {
    /**
     * 针对于编辑模式的配置, 与 topWrappedModule 对应
     */
    static url: any[] = [
        {
            isDefault: true,
            name: 'http',
            value: 'http://',
            defaultValue: '请输入链接',
        },
        {
            name: 'https',
            value: 'https://',
            defaultValue: '请输入链接',
        },
        {
            name: 'detail',
            value: 'detail/index.html?id=',
            defaultValue: '请输入id',
            ch: '详情'
        },
        {
            name: 'hybrid',
            value: 'hybrid://100/detail?id=',
            defaultValue: '请输入id',
            ch: '应用'
        },
        {
            name: 'activityPage',
            value: 'activityPage/index.html?id=',
            defaultValue: '请输入id',
            ch: '活动'
        },
    ];
}

export default EditModelMapping;
