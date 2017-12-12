/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'mobile/img',
    displayName: '图片',
    iconType: 'img',
    editable: [{
        label: '图片地址',
        component: 'ImgUrl',
        // 针对于编辑模式的配置, 与 topWrappedModule 对应
        editModelMapping: {

            // 图片类型的商品列表的对应关系
            'mobile/list': [
                {
                    isDefault: true,
                    name: 'Detail',
                    value: '/detail.html?id=',
                    defaultValue: 'Product ID',
                },
                {
                    name: 'Hybrid',
                    value: 'hybrid://100/detail?id=',
                    defaultValue: 'Product ID',
                },
            ]
        }
    }]
};

export default config;
