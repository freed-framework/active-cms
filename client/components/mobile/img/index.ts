/// <reference path="../../config.d.ts" />
import Img from './Img';

const config: Config = {
    name: 'mobile/img',
    displayName: '图片',
    editable: [{
        label: '图片地址',
        component: 'ImgUrl',
    }]
};

Img.config = config;

export default Img;
