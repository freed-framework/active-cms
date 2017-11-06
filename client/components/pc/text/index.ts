import Text from './Text';

interface Config {
    name: string;
    editable: any;
}

export const config: Config = {
    name: 'text',
    editable: {
        text: [{label: '设置文字', component: 'Attr'}],
    }
};

export default Text;
