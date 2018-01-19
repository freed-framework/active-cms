/// <reference path="../../config.d.ts" />

const config: Config = {
    name: 'mobile/click-area',
    className: 'tmc-click-area',
    displayName: '点击区域',
    isCommon: true,
    draggable: {
        position: {
            x: true,
            y: true,
            width: true,
            height: true,
        },
    },
    editable: [
        {
            component: 'Basic',
            target: 'layout',
            name: '外容器',
            /**
             * Basic 组件要排除的可编辑属性
             */
            exclude: [
                'background',
                'border',
                'overflow',
                'position:static,relative,fixed',
            ],
        },
        {
            component: 'Link',
        },
        {
            component: 'Modal',
            name: "弹出框内容"
        },
    ],
    defaultValues: {
        style: {
            /**
             * 目前移动端的 并非最外层 的 body 进行的滚动
             * 为了避免元素 绝对定位 导致展示效果类似 fixed
             */
            layout: {
                position: 'absolute',
                width: '260',
                height: '120',
            }
        }
    }
};

export default config;
