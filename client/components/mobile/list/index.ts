import List from './List';

interface Config {
    name: string;
    displayName?: string,
    menus: Array<string>;
    editable: any;
}

const config: Config = {
    name: 'xx',
    displayName: 'xxx',
    menus: [],
    editable: {
        items: [{label: '商品数', component: 'GoodsNumber', defaultValue: 1 }],
        style: {
            layout: ['Basic'],
        },
    }
};

export {
    config,
}

export default List;
