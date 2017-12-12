/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'mobile/layer',
    isCommon: true,
    className: 'guide-steps-handler',
    dataTable: {
        'data-guide': {
            step: 1,
            tip: 'select'
        },
    },
    displayName: '楼层',
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
