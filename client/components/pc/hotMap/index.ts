import hotMap from './hotMap';
import './hotMap.scss';

interface HotMapConfig extends Config {
    editable: {
        style?: any,
        href?: any
    };
}

const config: HotMapConfig = {
    name: 'hotMap',
    editable: {
        style: {
            layout: ['Basic', 'Position'],
        },
        href: [{label: '连接', component: 'Attr'}]
    }
};

export {
    config,
}

export default hotMap;
