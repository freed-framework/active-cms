/**
 * @file editor.js
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { Tab } from './lib/Tab';

@Tab
class Editor extends Component {
    render() {
        return (
            <div className="as-floor">
                <span>Tab</span>

                {/* 编辑者模式 */}
                <div>{this.props.children}</div>
            </div>
        )
    }
}

export default Editor;
