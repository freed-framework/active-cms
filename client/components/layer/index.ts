import Floor from './Layer';

interface Config {
    name: string;
    menus: Array<string>;
    editable: any;
}

const config: Config = {
    name: 'layer',
    menus: ['preImage', 'tabs', 'layer', 'img', 'float', 'hotMap'],
    editable: {
        style: {
            layout: ['basic'],
        },
        anchor: [{label: '设置锚点', component: 'attrs'}],
    }
};

export {
    config,
}

export default Floor;
