/**
 * @file Editor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Panel from '../panel/Panel';

class Editor extends PureComponent {
    componentDidMount() {
        const { guid, menus } = this.props;
        Panel.add({
            guid,
            menus,
        });
    }

    handleClick = (event) => {
        event.stopPropagation();

        const guid = event.currentTarget.getAttribute('data-guid');

        if (guid) {
            Panel.active(guid);
        }
    }

    render() {
        return (
            <div
                className="as-controller"
                data-guid={this.props.guid}
                onClick={this.handleClick}
            >
                {this.props.children}
            </div>
        )
    }
}

Editor.propTypes = {
    guid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    menus: PropTypes.arrayOf(PropTypes.string),
}

Editor.defaultProps = {
    menus: [],
}

export default Editor;
