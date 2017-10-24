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
        component?: any
    };
}

const config: Config = {
    name: 'goods',
    editable: {
        row: [{label: '行', component: 'Attr'}],
        col: [{label: '列', component: 'Attr'}],
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
