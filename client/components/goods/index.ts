import Goods from './goods';
import './goods.scss';

interface Config {
    name: string;
    menus?: Array<string>;
    editable: {
        style?: any,
        href?: any,
        row?: any,
        col?: any
    };
}

const config: Config = {
    name: 'goods',
    editable: {
        row: [{label: '行', component: 'attrs'}],
        col: [{label: '列', component: 'attrs'}],
        style: {
            layout: ['basic'],
            goodItem: ['basic']
        }
    }
};

export {
    config,
}

export default Goods;
