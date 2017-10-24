import * as React from 'react';


export interface GridProps {
    attrs?: any
}

export default class Grid extends React.Component<GridProps, any> {

    renderGridItem = (): any => {
        const { attrs = {} } = this.props;
        const { row = 1, col = 1 } = attrs;
        const items = [];
        const lis = [];

        for (let i = 0; i < col; i++) {
            items.push(<span>1231222222222</span>);
        }

        for (let j = 0; j < row; j++) {
            lis.push(<li>{items}</li>)
        }

        return <ul>{lis}</ul>
    }

    render() {
        return (
            <div>
                {this.renderGridItem()}
            </div>
        );
    }
}
