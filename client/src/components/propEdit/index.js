
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as EditItem from './App';
import './propsEdit.scss';

export default class EditAttr extends Component {
    static propTypes = {
        attrs: PropTypes.objectOf(PropTypes.any),
        editable: PropTypes.objectOf(PropTypes.any),
        guid: PropTypes.string,
        childs: PropTypes.arrayOf(PropTypes.any),
    }

    loopRender = () => {
        const { editable, attrs = {}, guid, childs } = this.props;

        return Object.keys(editable).map((key, index) => {
            const comps = editable[key];

            if (key === 'component') {
                const Component = EditItem[comps];

                return (
                    <Component
                        key={index}
                        guid={guid}
                        {...this.props}
                    />
                )
            }

            if (key === 'style') {
                return Object.keys(comps).map((k, i) => {
                    const attrs = comps[k];
                    const { style = {} } = attrs;

                    return attrs.map(attr => {
                        const Item = EditItem[attr];

                        return (
                            <div
                                key={`${key}-${attr}-${index}`}
                            >
                                <Item
                                    compKey={attr}
                                    guid={guid}
                                    target={k}
                                    style={style[k]}
                                />
                            </div>
                        )
                    })
                })
            } else {
                return comps.map(attr => {
                    const { label = '', component = '', data = [], ...props } = attr;
                    const Item = EditItem[component];

                    return (
                        <div
                            key={`${key}-${attr}-${index}`}
                        >
                            <Item
                                {...props}
                                label={label}
                                compKey={component}
                                guid={guid}
                                target={key}
                                data={data}
                                attrs={attrs}
                                // src={attrs.src}
                                childs={childs}
                            />
                        </div>
                    )
                })
            }
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
