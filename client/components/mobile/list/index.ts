/// <reference path="../../config.d.ts" />
import List from './List';

const config: Config = {
    name: 'mobile/list',
    isCommon: true,
    displayName: '图片列表',
    iconType: 'layers',
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
                layout: {
                    padding: 10,
                }
            }
        }
    }
};

List.config = config;

export default List;