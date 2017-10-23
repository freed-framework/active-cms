import Goods from './goods';
import './goods.scss';

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
        // component: [{
        //     label: '商品组件',
        //     component: 'radio',
        //     data: [{
        //         key: 'ImageText',
        //         label: '图片和文字'
        //     }, {
        //         key: 'Image',
        //         label: '图片'
        //     }, {
        //         key: 'HotImage',
        //         label: '热图'
        //     }]
        // }],
        style: {
            layout: ['Basic'],
            goodItem: ['Basic']
        },
    }
};

export {
    config,
}

export default Goods;
