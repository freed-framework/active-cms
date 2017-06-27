/**
 * @file editor.js
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { Fixer } from './lib/Fixer';

@Fixer
class Editor extends Component {
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

export default Editor;
