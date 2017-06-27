/**
 * @file viewer.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { Floor } from './lib/Floor';

@Floor
class Viewer extends Component {
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

export default Viewer;
