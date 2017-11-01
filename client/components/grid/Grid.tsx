import * as React from 'react';

import Common from '../common';


export interface GridProps {
    module?: string,
    id: string,
    attrs?: {
        style?: any
    }
    
}

class Grid extends React.Component<GridProps, any> {
    constructor(props: GridProps) {
        super(props)
    }

    renderClone = () => {
        const { children, attrs = {} } = this.props;
        const { style = {} } = attrs;

        const cols = React.Children.map(children, (item: any, index: number) => {
            if(item) {
                return React.cloneElement(item, {
                    parentStyle: style.goodsItem || {}
                })
            }
        })

        return cols;
    }

    render() {
        const { attrs = {} } = this.props;
        const { style = {} } = attrs;

        return (
            <div
                {...this.props}
                style={{...style.layout}}
            >
                {this.renderClone()}
            </div>
        );
    }
}

export default Common(Grid);
