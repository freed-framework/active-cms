/**
 * @file List.tsx
 * @author shijh
 *
 * 商品列表
 */
import * as React from 'react';

export interface ListProps {
    children: Array<any>,
    module?: string,
    id: string,
    attrs?: {
        style?: any
    }
}

export default class List extends React.Component<ListProps, any> {
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
                className="as-list"
            >
                { this.renderClone() }
            </div>
        );
    }
}
