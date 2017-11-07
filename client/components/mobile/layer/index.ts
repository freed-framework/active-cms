/// <reference path="../../config.d.ts" />
import Floor from './Layer';

const config: Config = {
    name: 'layer',
    isCommon: true,
    displayName: '布局',
    menus: ['layer', 'img', 'list'],
    editable: {
        style: {
            layout: ['Basic'],
        },
    }
};

export {
    config,
}

export default Floor;
