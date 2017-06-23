/**
 * @file ComponentWrapper.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ComponentWrapper extends Component {
    constructor(props) {
        super(props);

        this.handleRemove = ::this.handleRemove;

    }

    handleRemove(event) {
        const guid = event.currentTarget.getAttribute('data-guid');

        this.props.onRemoveComponent(guid);
    }

    render() {
        const { children, guid } = this.props;

        return (
            <div>
                <div>{children}</div>
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

ComponentWrapper.propTypes = {
    cid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
}

export default ComponentWrapper;
