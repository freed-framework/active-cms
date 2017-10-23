import Tabs from './Tabs';

interface Config {
    name: string;
    menus: Array<string>;
    editable: any;
}

export const config: Config = {
    name: 'tabs',
    menus: [],
    editable: {
        style: {
            layout: ['Basic'],
            title: ['Basic'],
            main: ['Basic'],
        }
    }
};

export default Tabs;
