/**
 * @file Tab.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import './tab.scss';

class Tab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { style } = this.props;

        return (
            <div
                className="ac-tab"
                style={{
                    ...(style && {...style.layout})
                }}
            >
                {this.props.children}
                <div
                    className="ac-tab-menu"
                    style={{
                        ...(style && {...style.title})
                    }}
                >
                    <div>tab 1</div>
                    <div>tab 2</div>
                </div>
                <div
                    className="ac-tab-main"
                    style={{
                        ...(style && {...style.main})
                    }}
                >
                    <div>content 1</div>
                    <div>content 2</div>
                </div>
            </div>
        );
    }
}

export default Tab;
