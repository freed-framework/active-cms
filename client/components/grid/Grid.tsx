import * as React from 'react';

import Common from '../common';


export interface GridProps {
    attrs?: any,
    module?: string,
    id: string
}

class Grid extends React.Component<GridProps, any> {
    constructor(props: GridProps) {
        super(props)
    }
    render() {
        return (
            <div
                {...this.props}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Common(Grid);
