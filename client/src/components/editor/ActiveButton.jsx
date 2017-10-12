/**
 * @file ActiveButton.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Panel from '../panel/index';
import { activeComponent } from '../../pages/editor/App';

class ActiveButton extends PureComponent {
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
        const { guid } = this.props;

        return (
            <div
                className="ec-editor-flag"
                data-guid={guid}
                onClick={this.handleClick}
            >
                <Icon type="edit" />
            </div>
        )
    }
}

ActiveButton.propTypes = {
    guid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
}

ActiveButton.defaultProps = {
}

export default ActiveButton;
