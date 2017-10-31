import Grid from './Grid';
import './index.scss';

interface Config {
    name: string;
    menus?: Array<string>;
    disName?: string,
    editable: {
        style?: any,
        href?: any,
        row?: any,
        col?: any,
        component?: any,
        rowcol: Array<any>
    };
}

const config: Config = {
    name: 'grid',
    disName: '列表',
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
