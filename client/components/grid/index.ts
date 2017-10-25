import Grid from './Grid';
import './index.scss';

interface Config {
    name: string;
    menus?: Array<string>;
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
    name: 'goods',
    editable: {
        row: [{label: '行', component: 'Attr'}],
        col: [{label: '列', component: 'Attr'}],
        rowcol: [{label: '行列设置', component: 'Grid'}],
        style: {
            layout: ['Basic'],
            goodItem: ['Basic']
        },
    }
};

export {
    config,
}

export default Grid;
