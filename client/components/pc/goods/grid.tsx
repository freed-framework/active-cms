import * as React from 'react';
import { GoodsItem, GoodsImageItem } from './goodsItem';

export interface GridProps {
    id: string,
    row?: string,
    col?: string,
    component?: string,
    style?: any
}

export default class Grid extends React.PureComponent<GridProps, any> {

    renderItem = (): any => {
        const { row, col, id, style, component} = this.props;
        const li = [];
        const item = [];
        let node = <GoodsItem style={{...style}} />;

        if (component === 'Image') {
            node = <GoodsImageItem style={{...style}} />;
        }

        for (let j = 0; j < parseInt(col, 10); j++) {
            item.push(node)
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
