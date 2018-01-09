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
            exclude: ['background', 'border', 'overflow', 'position'],
        },
    ],
    defaultValues: {
        style: {
            /**
             * 目前移动端的 并非最外层 的 body 进行的滚动
             * 为了避免元素 绝对定位 导致展示效果类似 fixed
             */
            layout: {
                // position: 'absolute',
                position: 'static',
                width: '260',
                height: '120',
                // left: 0,
                // top: 0,
            }
        }
    }
};

export default config;
