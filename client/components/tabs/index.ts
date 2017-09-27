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
            layout: ['basic'],
            title: ['basic'],
            main: ['basic'],
        }
    }
};

export default Tabs;
