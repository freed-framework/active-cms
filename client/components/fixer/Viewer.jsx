/**
 * @file viewer.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { Fixer } from './lib/Fixer';

@Fixer
class Viewer extends Component {
    render() {
        return (
            <div className="as-fixer">
                Fixer
            </div>
        )
    }
}

export default Viewer;
