import * as React from 'react';
import Goods from './goodsItem';

export interface GridProps {
    id: string,
    row?: string,
    col?: string,
    component: React.ReactNode,
    style: any
}

export default class Grid extends React.PureComponent<GridProps, any> {

    renderItem = (): any => {
        const { row, col, id, style} = this.props;
        const li = [];
        const item = [];

        for (let j = 0; j < parseInt(col, 10); j++) {
            item.push(<Goods style={{...style}}/>)
        }

        for (let i = 0; i < parseInt(row, 10); i++) {
            li.push(
                <li key={i} className="as-layer-goods-row">
                    {item}
                </li>
            )
        }

        return <ul className="as-layer-goods-col">{li}</ul>;
    }

    render() {
        const {id} = this.props;

        return (
            <div>
               { this.renderItem() }
            </div>
        );
    }
}
