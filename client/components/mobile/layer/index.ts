/// <reference path="../../config.d.ts" />
import Layer from './Layer';

const config: Config = {
    name: 'mobile/layer',
    isCommon: true,
    displayName: '布局',
    // menus: ['layer', 'img', 'list'],
    editable: {
        style: {
            layout: ['Basic'],
        },
    }
};

export {
    config,
}

export default Layer;
