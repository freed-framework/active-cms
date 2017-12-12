/**
 * @file PlaceHolder.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './app.scss';

class PlaceHolder extends PureComponent {
    static propTypes = {
        iconType: PropTypes.string,
        name: PropTypes.string,
    }

    static defaultProps = {
        iconType: '',
        name: 'PlaceHolder',
    }

    render() {
        const { iconType, name } = this.props;

        return (
            <div className="editor-placeholder">
                {iconType !== '' &&
                    <span className={`placeholder-icon placeholder-${iconType}`} />
                }
                <div className="editor-placeholder-text">{name}</div>
            </div>
        )
    }
}

export default PlaceHolder;
