import hotMap from './hotMap';
import './hotMap.scss';

interface Config {
    name: string;
    menus?: Array<string>;
    editable: {
        style?: any,
        href?: any
    };
}

const config: Config = {
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
