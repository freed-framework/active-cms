import Tabs from './Tabs';

interface Config {
    name: string;
    displayName: string;
    menus: Array<string>;
    editable: any;
}

export const config: Config = {
    name: 'tabs',
    displayName: 'TAB 标签',
    menus: [],
    editable: {
        component: 'SetTabs',

        style: {
            layout: ['Basic'],
            title: ['Basic'],
            main: ['Basic'],
        },


    }
};

export default Tabs;
