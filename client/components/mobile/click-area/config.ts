/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'mobile/click-area',
    className: 'tmc-click-area',
    displayName: '热区',
    editable: [
        {
            component: ['Link', 'Basic'],
            target: 'layout',
            name: '外容器',
        },
    ],
    defaultValues: {
        style: {
            layout: {
                position: 'absolute',
                height: '100%',
                width: '100%',
            }
        }
    }
};

export default config;
