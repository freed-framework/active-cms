/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'mobile/img',
    displayName: '图片',
    className: 'tmc-img',
    iconType: 'img',
    editable: [{
        label: '图片地址',
        component: 'ImgUrl',
        // 针对于编辑模式的配置, 与 topWrappedModule 对应
        editModelMapping: [
            {
                isDefault: true,
                name: 'detail',
                value: 'detail/index.html?id=',
                defaultValue: '',
                ch: '详情'
            },
            {
                name: 'hybrid',
                value: 'hybrid://100/detail?id=',
                defaultValue: '',
                ch: '应用'
            },
            {
                name: 'activityPage',
                value: 'activityPage/index.html?id=',
                defaultValue: '',
                ch: '活动'
            },
        ]
    }]
};

export default config;
