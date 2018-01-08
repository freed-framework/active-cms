/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'mobile/click-area',
    className: 'tmc-click-area',
    displayName: '点击区域',
    draggable: {
        position: ['left', 'top', 'width', 'height'],
    },
    editable: [
        {
            component: ['Link', 'Basic'],
            // component: ['Link'],
            target: 'layout',
            name: '外容器',

            // 针对于编辑模式的配置, 与 topWrappedModule 对应
            editModelMapping: [
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
            ]
        },
    ],
    defaultValues: {
        style: {
            layout: {
                position: 'absolute',
                width: '260',
                height: '120',
            }
        }
    }
};

export default config;
