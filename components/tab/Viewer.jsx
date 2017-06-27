/**
 * @file viewer.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { Tab } from './lib/Tab';

@Tab
class Viewer extends Component {
    render() {
        return (
            <div className="as-floor">
                <span>TabTabTabTab</span>
            </div>
        )
    }
}

export default Viewer;
