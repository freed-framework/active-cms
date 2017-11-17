/// <reference path="../../config.d.ts" />
import Layer from './Layer';

const config: Config = {
    name: 'mobile/layer',
    isCommon: true,
    displayName: '布局',
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
                padding: 10,
            }
        }
    }
};

export {
    config,
}

export default Layer;
