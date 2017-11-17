/// <reference path="../../config.d.ts" />
import Tabs from './Tabs';

export const config: Config = {
    name: 'tabs',
    displayName: 'TAB 标签',
    menus: [],
    editable: {
        components: [{
            component: 'SetTabs',
        }],

        style: {
            layout: ['Basic'],
            title: ['Basic'],
            main: ['Basic'],
        },
    }
};

export default Tabs;
