/**
 * @file List.tsx
 * @author denglingbo
 *
 * 商品列表
 */
import * as React from 'react';

export interface ListProps {
    children: Array<any>;
    module?: string;
    id: string;
    attrs?: {
        style?: any;
    }
}

class List extends React.Component<ListProps, any> {
    renderClone = () => {
        const { children, attrs = {} } = this.props;
        const { style = {} } = attrs;

        return React.Children.map(children, (item: any) => {
            if(item) {
                return React.cloneElement(item, {
                    parentStyle: style.goodsItem || {}
                })
            }
        })
    }

    render() {
        const { attrs = {} } = this.props;
        const { style = {} } = attrs;

        return (
            <div
                {...this.props}
                style={{...style.layout}}
                className="tmc-list"
            >
                { this.renderClone() }
            </div>
        );
    }
}

export default List;
