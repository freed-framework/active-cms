
/// <reference path="../../typings/interface.d.ts" />
import * as React from 'react';

const findBorders = (styles: any) => {
    const borders: any = {
        // ...
    };

    Object.keys(styles).forEach((k: string) => {
        const styleItem: any = styles[k];
        const size: string = styleItem['borderWidth'];
        const color: string = styleItem['borderColor'];

        if (size && color) {
            borders[k] = {
                size,
                color,
                className: `border-1px-${size}-${color.replace('#', '')}`,
            }
        }
    });

    return borders;
}

const borderTransHoc = (WarppedComponent: any) => class extends React.PureComponent<DefaultProps, any> {
    constructor(props: DefaultProps) {
        super(props);

        const { style = {} } = this.props;
        const borders = findBorders(style);

        this.state = {
            borders,
        }
    }

    render() {
        return <WarppedComponent {...this.props} {...this.state} />;
    }
}

export default borderTransHoc;
