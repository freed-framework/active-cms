/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'pc/tabs',
    isCommon: true,
    displayName: '标签页',
    iconType: 'layers',
    menus: [],
    editable: [
        {
            component: 'SetTabs',
        },
        {
            component: 'Basic',
            target: 'layout',
        },
        {
            component: 'Basic',
            target: 'title',
        },
        {
            component: 'Basic',
            target: 'main',
        },
    ],
    defaultValues: {
        style: {
            layout: {
                padding: 0,
            }
        }
    }
};

export default config;
