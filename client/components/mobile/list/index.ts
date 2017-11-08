
/// <reference path="../../config.d.ts" />
import List from './List';

interface Config {
    name: string;
    displayName?: string,
    menus: Array<string>;
    editable: any;
}

const config: Config = {
    name: 'list',
    displayName: '列表',
    menus: [''],
    editable: {
        src: [{label: '图片', component: 'MobileList' }] 
    }
};

export {
    config,
}

export default List;