/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */
import * as React from 'react';
import config from './config';
import { LayerProps } from './interface';
import componentPropsHoc from '../../common/hoc/componentPropsHoc';
import Term from '../../common/term';
import './layer.scss';

@componentPropsHoc({
    config,
})
class Layer extends React.PureComponent<LayerProps, any> {
    render(): JSX.Element {
        const {
            id,
            style = {},
            dataTable,
            className,
            termDates,
        } = this.props;

        const Content = (
            <div
                id={id}
                className={className}
                {...(dataTable && { ...dataTable })}
                style={{
                    ...(style && {
                        ...style.layout,
                        'backgroundPosition': 'top center',
                        'backgroundRepeat': 'no-repeat',
                        'backgroundSize': 'cover'
                    })
                }}
            >
                {this.props.children}
            </div>
        );

        if (termDates) {
            return (
                <Term range={termDates}>
                    {Content}
                </Term>
            );
        }

        return Content;
    }
}

export {
    config,
}

export default Layer;
