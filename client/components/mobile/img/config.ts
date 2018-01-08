/// <reference path="../../config.d.ts" />
import EditModelMapping from '../../common/editModelMapping';

const config: Config = {
    name: 'mobile/img',
    displayName: '图片',
    className: 'tmc-img',
    iconType: 'img',
    editable: [{
        label: '图片地址',
        component: 'ImgUrl',

        editModelMapping: EditModelMapping.url,
    }]
};

export default config;
