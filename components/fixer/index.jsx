/**
 * @file index.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import './index.scss';

const Fixer = HigherOrderComponent => class extends Component {
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

@Fixer
class editComponent extends Component {
    render() {
        return (
            <div className="as-fixer">
                Fixer

                {/* 编辑者模式 */}
                <div>{this.props.children}</div>
            </div>
        )
    }
}

@Fixer
class viewComponent extends Component {
    render() {
        return (
            <div className="as-fixer">
                Fixer
            </div>
        )
    }
}

export {
    editComponent,
    viewComponent,
};
