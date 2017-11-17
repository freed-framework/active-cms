/// <reference path="../../config.d.ts" />
import List from './List';

const config: Config = {
    name: 'mobile/list',
    displayName: '图片列表',
    menus: [],
    editable: [
        {
            component: 'MobileList',
        },
        {
            component: 'Basic',
            target: 'layout',
        },
    ],

    defaultValues: {
        cols: 2,
        style: {
            layout: {
                padding: 10,
            }
        },
        extendsProps: {
            style: {
                padding: 10,
            }
        }
    }
};

export {
    config,
}

export default List;
