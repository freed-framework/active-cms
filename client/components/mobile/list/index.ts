import List from './List';

interface Config {
    name: string;
    displayName?: string,
    menus: Array<string>;
    editable: any;
}

const config: Config = {
    name: 'mobile/list',
    displayName: 'xxx',
    menus: [],
    editable: {
        components: [
            { component: 'EditDataNumber', defaultValue: 1 },
            { component: 'ClickArea' },
        ],
        style: {
            layout: ['Basic'],
        },
    }
};

export {
    config,
}

export default List;
