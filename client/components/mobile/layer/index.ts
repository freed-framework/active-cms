/// <reference path="../../config.d.ts" />
import Layer from './Layer';

const config: Config = {
    name: 'mobile/layer',
    isCommon: true,
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
                padding: 10,
            }
        }
    }
};

Layer.config = config;

export default Layer;
