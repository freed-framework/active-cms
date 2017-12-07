/**
 * @file Lazyer.js
 * @author denglingbo
 *
 * Des
 */

import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import propTypes from 'prop-types';

const Lazyer = WarppedComponent => class extends PureComponent {
    static propTypes = {
        item: propTypes.any,
        loader: propTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            mod: null,
        }
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (!Immutable.is(nextProps, this.props)) {
            this.load(nextProps);
        }
    }

    load(props) {
        // API
        this.setState({
            mod: null
        });

        if (this.props.loader) {
            this.props.loader(props.item)
                .then(module => {
                    if (module) {
                        this.setState({
                            mod: {
                                module,
                                ...props,
                            }
                        });
                    }
                });
        }
    }

    render() {
        return (
            <WarppedComponent
                {...this.props}
                {...this.state.mod}
            >
                {this.props.children}
            </WarppedComponent>
        )
    }
}

export default Lazyer;
