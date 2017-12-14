/**
 * @file App.jsx
 * @author shijh
 *
 * 编辑组件引入
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as EditItem from './export';
import './propsEdit.scss';

export default class EditAttr extends PureComponent {
    static propTypes = {
        editable: PropTypes.arrayOf(PropTypes.any),
        guid: PropTypes.string,
    }

    loopRender = () => {
        const {
            guid,
            editable = [],
            componentProps = {},
            config = {},
            topWrappedModule = null,
        } = this.props;

        return editable.map((item, index) => {
            // 对应的编辑组件
            const EditComponent = EditItem[item.component];

            // 将 {component}/index.ts 的 config 中的可编辑项与需要传递到编辑组件的属性进行合并
            const props = {
                ...item,
                ...(topWrappedModule && { topWrappedModule }),
                defaultValues: {
                    ...config.defaultValues
                },
                children: this.props.children,
                componentProps,
            };

            return (
                <EditComponent
                    key={index}
                    guid={guid}
                    {...props}
                />
            );
        })
    }

    render() {
        return (
            <div>
               {this.loopRender()}
            </div>
        )
    }
}
