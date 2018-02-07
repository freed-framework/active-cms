const config: Config = {
    name: 'mobile/layer',
    className: 'tmc-layer',
    isCommon: true,
    displayName: '布局',
    // draggable: {
    //     position: {
    //         y: true,
    //         height: true,
    //     },
    // },
    iconType: 'layers',
    menus: [
        'mobile/layer',
        'mobile/img',
        'mobile/list',
        'mobile/click-area'
    ],
    editable: [
        {
            component: 'Term',
        },
        {
            component: 'Basic',
            target: 'layout',
            name: '外容器',
            exclude: [
                'width', 
                // 'height',
                'position'
            ],
        },
    ],
    defaultValues: {
        style: {
            layout: {
                overflow: 'hidden'
            }
        }
    }
};

export default config;
