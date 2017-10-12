/**
 * @file Wrap.jsx
 * @author denglingbo
 *
 * Des
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';

class Wrap extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isOver: false,
        }
    }

    handleEnter = (event) => {
        event.preventDefault();

        this.setState({
            isOver: true,
        })
    }

    handleLeave = () => {
        this.setState({
            isOver: false,
        })
    }

    render() {
        const isActive = this.props.isActive || this.state.isOver;

        const clsWrap = classNames('ec-editor-wrap', {
            'ec-editor-active': isActive,
        });

        return (
            <div
                className={clsWrap}
                onMouseOver={this.handleEnter}
                onMouseOut={this.handleLeave}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Wrap;
