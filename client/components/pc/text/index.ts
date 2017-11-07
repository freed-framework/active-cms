/// <reference path="../../config.d.ts" />
import Text from './Text';

export const config: Config = {
    name: 'text',
    editable: {
        text: [{label: '设置文字', component: 'Attr'}],
    }
};

export default Text;
