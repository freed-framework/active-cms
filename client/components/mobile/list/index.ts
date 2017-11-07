
interface Config {
    name: string;
    displayName?: string,
    menus: Array<string>;
    editable: any;
}

const config: Config = {
    name: 'xx',
    displayName: 'xxx',
    menus: [''],
    editable: {
        style: {
            layout: ['Basic'],
        },
    }
};

export {
    config,
}
