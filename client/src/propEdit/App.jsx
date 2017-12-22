/**
 * @file App.jsx
 * @author shijh
 *
 * 编辑组件引入
 */
import React, { PureComponent } from 'react';
import { Tag } from 'antd';
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
            // 此处从 compponents/config.ts 返回的是 string | array
            const components = typeof item.component === 'string' ?
                                [item.component] :
                                item.component;

            return (
                <div
                    key={`editable-${index}`}
                >
                    <div className="ec-editor-todo-target">
                        <span>操作位置:</span>
                        <Tag color="#171717">{item.name || item.target}</Tag>
                    </div>
                    {components.map((componentKey, i) => {
                        // 对应的编辑组件
                        const EditComponent = EditItem[componentKey];

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
                                key={`${componentKey}-${index}-${i}`}
                                guid={guid}
                                {...props}
                            />
                        );
                    })}
                </div>
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
