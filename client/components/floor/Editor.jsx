/**
 * @file editor.js
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { Floor } from './lib/Floor';

@Floor
class Editor extends Component {
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

export default Editor;
