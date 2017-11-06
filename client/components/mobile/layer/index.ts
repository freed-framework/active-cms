import Floor from './Layer';

interface Config {
    name: string;
    displayName?: string,
    menus: Array<string>;
    editable: any;
}

const config: Config = {
    name: 'layer',
    displayName: '布局',
    menus: ['preImage', 'tabs', 'layer', 'img', 'list'],
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
