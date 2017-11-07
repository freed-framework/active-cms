/// <reference path="../../config.d.ts" />
import Grid from './Grid';
import './index.scss';

interface GridConfig extends Config {
    editable: {
        style?: any;
        href?: any;
        row?: any;
        col?: any;
        component?: any;
        rowcol: Array<any>;
    };
}

const config: GridConfig = {
    name: 'grid',
    displayName: '列表',
    editable: {
        rowcol: [{label: '行列设置', component: 'Grid'}],
        style: {
            layout: ['Basic'],
            goodsItem: ['Basic']
        },
    }
};

export {
    config,
}

export default Grid;
