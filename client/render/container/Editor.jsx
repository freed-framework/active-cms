/**
 * @file Editor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.handleRemove = ::this.handleRemove;

    }

    handleRemove(event) {
        const guid = event.currentTarget.getAttribute('data-guid');

        this.props.onRemoveComponent(guid);
    }

    componentDidMount() {}

    render() {
        const { guid } = this.props;

        return (
            <div>
                <div>{guid}</div>
                <div
                    data-guid={guid}
                    onClick={this.handleRemove}
                >
                    Remove
                </div>
            </div>
        )
    }
}

Editor.propTypes = {
    cid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Editor;
