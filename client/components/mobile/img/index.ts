/// <reference path="../../config.d.ts" />
import Img from './Img';

interface Config {
    name: string;
    displayName?: string,
    menus: Array<string>;
    editable: any;
}

const config: Config = {
    name: 'img',
    displayName: '图片',
    menus: [''],
    editable: {
        src: [{label: '地址', component: 'ImgUrl' }] 
    }
};

export {
    config,
}

export default Img;
