/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'mobile/layer',
    className: 'tmc-layer',
    isCommon: true,
    displayName: '布局',
    draggable: {
        position: ['left', 'top', 'width', 'height'],
    },
    iconType: 'layers',
    menus: ['mobile/layer', 'mobile/img', 'mobile/list', 'mobile/click-area'],
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
