import * as React from 'react';
import classnames from 'classnames';
import BaiscComponent from '../../../common/hoc/baiscComponent';

export interface RowProps {
    className: string,
    module?: string,
    id: string,
    attrs?: {
        style?: any
    },
    parentStyle?: any
}

class Row extends React.Component<RowProps, any> {

    renderClone = () => {
        const { children, attrs = {}, parentStyle } = this.props;
        const { style = {} } = attrs;

        const cols = React.Children.map(children, (item: any, index: number) => {
            if(item) {
                return React.cloneElement(item, {
                    parentStyle
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
                className={'as-edit-Row'}
                style={{...style.layout}}
            >
                {this.renderClone()}
            </div>
        );
    }
}

export default BaiscComponent(Row);
