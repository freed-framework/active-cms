/**
 * @file Common.ts
 * @author shijh
 *
 * 高阶组件，处理公共业务
 */

import * as React from 'react';
import classnames from 'classnames';

export interface HocProps {
    attrs?: object,
    children?: Array<any>,
    guid?: string,
    id?: string,
    module?: string,
    style?: any
}

const Common = (ComposedComponent: any) => class Hoc extends React.PureComponent<HocProps, any> {
    constructor(props: HocProps) {
        super(props)
    }

    render() {
        const { attrs, children = [], id, module } = this.props;

        const classes = classnames('as-common', {
            'as-common-hasChild': !!children.length,
            [`as-common-${module}`]: !!module,
        })

        return (
            <ComposedComponent
                {...this.props}
                className={classes}
                id={id}
                data-module={module} 
            />
        )
    }
}

export default Common;
