import HotImage from './hotImage';
import './hotImage.scss';

interface Config {
    name: string;
    displayName: string;
    menus?: Array<string>;
    editable: {
        style?: any,
        distanceLeft?: any,
        distanceTop?: any,
        target?: any,
        position?: any,
        horizontal?: any,
        vertical?: any
    };
}

const config: Config = {
    name: 'grid/hotImage',
    displayName: '列',
    menus: ['layer'],
    editable: {
        style: {
            layout: ['Basic']
        }
    }
};

export {
    config,
}

export default HotImage;
