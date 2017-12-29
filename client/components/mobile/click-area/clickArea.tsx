/// <reference path="./clickArea.d.ts" />
import * as React from 'react';
import config from './config';
import redirect from '../../../node_modules/freed-multi/lib/native/redirect';
import componentPropsHoc from '../../common/hoc/componentPropsHoc';

@componentPropsHoc({
    config,
})
class ClickArea extends React.PureComponent<ClickAreaProps, any> {
    constructor(props: ClickAreaProps) {
        super(props);
    }

    handleClick = () => {
        redirect(this.props.url, {});
    }

    render() {
        const { id, style, className } = this.props;

        return (
            <div
                id={id}
                className={className}
                style={{
                    ...(style && { ...style.layout })
                }}
                onClick={this.handleClick}
            >
                {this.props.children}
            </div>
        )
    }
}

export default ClickArea;
