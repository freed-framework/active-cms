/**
 * @file Tab.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';

export const Tab = HigherOrderComponent => class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HigherOrderComponent
                {...this.props}
                {...this.state}
            />
        )
    }
}
