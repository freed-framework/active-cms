/// <reference path="../../config.d.ts" />
import EditModelMapping from '../../common/editModelMapping';

const config: Config = {
    name: 'mobile/click-area',
    className: 'tmc-click-area',
    displayName: '点击区域',
    draggable: {
        position: ['left', 'top', 'width', 'height'],
    },
    editable: [
        {
            component: 'Link',

            editModelMapping: EditModelMapping.url,
        },
        {
            component: 'Basic',
            target: 'layout',
            name: '外容器',
            /**
             * Basic 组件要排除的可编辑属性
             */
            exclude: ['background', 'border', 'overflow'],
        },
    ],
    defaultValues: {
        style: {
            layout: {
                position: 'absolute',
                width: '260',
                height: '120',
            }
        }
    }
};

export default config;
