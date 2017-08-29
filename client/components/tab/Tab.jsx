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
        return (
            <div className="ac-tab">
                <div className="ac-tab-menu">
                    <div>tab 1</div>
                    <div>tab 2</div>
                </div>
                <div>
                    <div>content 1</div>
                    <div>content 2</div>
                </div>
            </div>
        );
    }
}

export default Tab;
