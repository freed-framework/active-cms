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

export {
    config,
}

export default Img;
