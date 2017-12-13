/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'mobile/list',
    isCommon: true,
    className: 'guide-steps-handler',
    dataTable: {
        'data-guide': {
            "step": 1,
            "tip": "点击添加图片列表组件",
            "trigger": "click",
            "delay": 800,
            "nextStep": 2
        },
    },
    displayName: '图片列表',
    iconType: 'pictures',
    menus: [],
    editable: [
        {
            component: 'MobileList',
        },
        {
            component: 'Basic',
            target: 'layout',
        },
    ],

    defaultValues: {
        cols: 2,
        style: {
            layout: {
                padding: 10,
            }
        },
        extendsProps: {
            style: {
                layout: {
                    padding: 10,
                }
            }
        }
    }
};

export default config;
