/// <reference path="../../config.d.ts" />
import Floor from './Layer';

const config: Config = {
    name: 'layer',
    isCommon: true,
    displayName: '布局',
    menus: ['preImage', 'tabs', 'layer', 'img', 'float', 'hotMap', 'goods', 'grid', 'list'],
    editable: {
        style: {
            layout: ['Basic'],
        },
        anchor: [{label: '设置锚点', component: 'Attr'}],
    }
};

export {
    config,
}

export default Floor;
