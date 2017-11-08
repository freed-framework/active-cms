
/// <reference path="../../../config.d.ts" />
import Col from './Col';

interface Config {
    name: string;
    displayName?: string,
    menus: Array<string>;
    editable: any;
}

const config: Config = {
    name: 'list/col',
    displayName: '行',
    menus: [''],
    editable: {}
};

export {
    config,
}

export default Col;
