/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'mobile/list',
    isCommon: true,
    className: 'tmc-list guide-steps-handler',
    dataTable: {},
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
            name: '外容器',
            exclude: ['width'],
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
