/**
 * @file index.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import './index.scss';

const Floor = HigherOrderComponent => class extends Component {
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

@Floor
class editComponent extends Component {
    render() {
        return (
            <div className="as-floor">
                <span>Floor</span>
                <button
                    onClick={this.hello}
                >
                    Alert
                </button>

                {/* 编辑者模式 */}
                <div>{this.props.children}</div>
            </div>
        )
    }
}

@Floor
class viewComponent extends Component {
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
    editComponent,
    viewComponent,
};
