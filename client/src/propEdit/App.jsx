/**
 * @file App.jsx
 * @author shijh
 *
 * 编辑组件引入
 */
import React, { PureComponent } from 'react';
import { Tag } from 'antd';
import { is, fromJS } from 'immutable';
import PropTypes from 'prop-types';
import * as EditItem from './export';
import './propsEdit.scss';

/**
 * 获取单个组件的配置
 * @param arr [{component: xxx}, ...],
 * @param key key
 */
const getComponentConfig = (arr, key) => arr.find(item => item.component === key);

export default class EditAttr extends PureComponent {
    static propTypes = {
        editable: PropTypes.arrayOf(PropTypes.any),
        guid: PropTypes.string,
    }

    constructor(props) {
        super(props);

        this.state = {
            componentProps: {},
            activeId: null,
        };
    }

    // 判断数据是否变化
    componentWillReceiveProps(nextProps) {
        // if (!is(this.props.componentProps, nextProps.componentProps)) {
        //     this.setState({
        //         componentProps: nextProps.componentProps
        //     })
        // }
        //
        // if (!is(this.props.activeId, nextProps.activeId)) {
        //     this.setState({
        //         activeId: nextProps.activeId
        //     })
        // }

        if (!is(fromJS(this.props), fromJS(nextProps))) {
            this.setState({
                ...nextProps,
            })
        }
    }

    render() {
        const {
            guid,
            editable = [],
            config = {},
            topWrappedModule = null,
            componentProps = {}
        } = this.props;

        const {
            activeId,
        } = this.state;

        return (
            <div>
               {editable.map((item, index) => {
                   // 此处从 compponents/config.ts 返回的是 string | array
                   const components = typeof item.component === 'string' ? [item.component] : item.component;

                   // 此名称从 editable[x].name || target 上获取
                   const opName = item.name || item.target;

                   return (
                       <div
                        key={`editable-${index}`}
                       >
                           {opName &&
                               <div className="ec-editor-todo-target">
                                   <span>操作位置:</span>
                                   <Tag color="#171717">{opName}</Tag>
                               </div>
                           }

                           {components.map((componentKey, i) => {
                               // 对应的编辑组件
                               const EditComponent = EditItem[componentKey];
                               const componentConfig = getComponentConfig(editable, componentKey);

                               // 将 {component}/index.ts 的 config 中的可编辑项与需要传递到编辑组件的属性进行合并
                               const props = {
                                   activeId,
                                   ...item,
                                   ...(topWrappedModule && { topWrappedModule }),
                                   defaultValues: {
                                       ...config.defaultValues
                                   },
                                   children: this.props.children,
                                   componentProps,
                                   // 当前组件对应的配置
                                   componentConfig,
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
               })}
            </div>
        )
    }
}
