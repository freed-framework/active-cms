import * as React from 'react';

import Grid from './grid';

export interface AppProps {
    id: string;
    
    children?: React.ReactNode;

    attrs?: {
        row?: string,
        col?: string,
        style?: any
    };
}

export default class Goods extends React.PureComponent<AppProps, any> {
    constructor(props: AppProps) {
        super(props)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps: any) {

    }

    render() {
        const { id, children, attrs = {} } = this.props;
        const { row, col, style = {} } = attrs;
        console.log(attrs)
        return (
            <div
                id={id}
                style={{...style.layout}}
            >
                <Grid
                    row={row || '1'}
                    col={col || '1'}
                    component={null}
                    id={id}
                    style={{...style.goodItem}}
                />
                {children}
            </div>
        );
    }
}
