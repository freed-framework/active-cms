/**
 * @file Editor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Panel from '../panel';
import { activeComponent } from '../../../editor/App';

class Editor extends PureComponent {
    componentDidMount() {
        Panel.add({
            ...this.props
        });
    }

    /**
     * 展示激活的组件编辑器
     * @param event
     */
    handleClick = (event) => {
        event.stopPropagation();

        const guid = event.currentTarget.getAttribute('data-guid');

        if (guid) {
            Panel.active(guid);
            activeComponent(guid);
        }
    }

    render() {
        const { className, guid, children } = this.props;

        return (
            <div
                className={`as-editor ${className}`}
                data-guid={guid}
                onClick={this.handleClick}
            >
                <div className="as-editor-flag"><Icon type="edit" /></div>
                <div>{children}</div>
            </div>
        )
    }
}

Editor.propTypes = {
    guid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

Editor.defaultProps = {
}

export default Editor;
