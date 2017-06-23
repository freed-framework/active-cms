/**
 * @file index.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import './index.scss';

class component extends Component {
    constructor(props) {
        super(props);

        this.hello = ::this.hello;
    }

    hello() {
        console.log('hello');
    }

    render() {
        return (
            <div className="as-floor">
                <span>Floor</span>
                <button
                    onClick={this.hello}
                >
                    Alert
                </button>
            </div>
        )
    }
}

export {
    component,
};
