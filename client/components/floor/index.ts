import Floor from './Floor';

interface Config {
    name: string;
    menus: Array<string>;
    editable: any;
}

const config: Config = {
    name: 'floor',
    menus: ['pre-image', 'tab', 'floor', 'img', 'fix', 'float', 'hotMap'],
    editable: {
        style: {
            layout: ['basic'],
        }
    }
};

export {
    config,
}

export default Floor;
