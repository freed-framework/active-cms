/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'pc/layer',
    isCommon: true,
    displayName: '楼层',
    iconType: 'layers',
    menus: ['pc/layer'],
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
