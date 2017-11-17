/**
 * @file defaultStyleHoc
 * @author denglingbo
 *
 * 用于将 components/{component}/index.ts config 的 defaultValues 和 数据的 componentProps 进行合并
 */
import React, { PureComponent } from 'react';
import { editComponentByGuid } from '../../pages/editor/App';

const defaultStyleHoc = WarppedComponent => class extends PureComponent {
    constructor(props) {
        super(props);

        const {
            guid,
            target,
            defaultValues = {},
            componentProps = {},
        } = props;

        const value = Object.assign({}, defaultValues, componentProps);

        this.state = {
            componentProps: value,
        };
        
        editComponentByGuid(
            guid,
            ['componentProps'],
            value
        );
    }

    render() {
        return (
            <WarppedComponent
                {...this.props}
                {...this.state}
            />
        )
    }
}

export default defaultStyleHoc;
