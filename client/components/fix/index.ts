/**
 * @file index.ts
 * @author denglingbo
 *
 * Des
 */
import Fix from './Fix';
import './index.scss';

interface Config {
    name: string;
    menus?: Array<string>;
    editable: {
        style?: any,
        distanceLeft?: any,
        distanceTop?: any,
        target?: any,
        position?: any,
        horizontal?: any,
        vertical?: any
    };
}

const config: Config = {
    name: 'fix',
    menus: ['floor', 'hotMap'],
    editable: {
        style: {
            layout: ['basic']
        },
        distanceLeft: [{label: '侧边距离', component: 'attrs'}],
        distanceTop: [{label: '顶部距离', component: 'attrs'}],
        target: [{
            label: '定位目标',
            component: 'radio',
            data: [{
                key: 'body',
                label: '窗口'
            }, {
                key: 'parent',
                label: '父元素'
            }]
        }],
        horizontal: [{label: '水平方向定位', component: 'chooseData', items: [
            {
                key: 'left',
                label: '左'
            },
            {
                key: 'right',
                label: '右'
            }
        ]}],
        vertical: [{label: '垂直方向定位', component: 'chooseData', items: [
            {
                key: 'top',
                label: '上'
            },
            {
                key: 'bottom',
                label: '下'
            }
        ]}]
        // horizontal: [{label: '距左右边框的距离', component: 'attrs'}],
        // vertical: [{label: '距上下边框的距离', component: 'attrs'}]
    }
};

export {
    config,
}

export default Fix;
