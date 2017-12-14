/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'mobile/layer',
    isCommon: true,
    displayName: '布局',
    iconType: 'layers',
    menus: ['mobile/layer', 'mobile/img', 'mobile/list'],
    editable: [
        {
            component: 'Basic',
            target: 'layout',
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
