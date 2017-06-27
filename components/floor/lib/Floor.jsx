/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';

export const Floor = HigherOrderComponent => class extends Component {
    constructor(props) {
        super(props);

        this.hello = ::this.hello;
    }

    hello() {
        console.log('hello');
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
