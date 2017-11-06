
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as EditItem from './App';
import './propsEdit.scss';

export default class EditAttr extends PureComponent {
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
                    // TODO: 石进华你大爷哟，我没看懂哟
                    // const attrs = comps[k];
                    // const { style = {} } = attrs;
                    const _comps = comps[k];
                    const { style = {} } = attrs;

                    return _comps.map(attr => {
                        const Component = EditItem[attr];

                        return (
                            <div
                                key={`${key}-${attr}-${index}`}
                            >
                                <Component
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
                    const Component = EditItem[component];

                    return (
                        <div
                            key={`${key}-${attr}-${index}`}
                        >
                            <Component
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
