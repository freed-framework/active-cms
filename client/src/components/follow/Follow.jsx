/**
 * @file Follow
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FollowHoc from './FollowHoc';

@FollowHoc
class Follow extends PureComponent {
    render() {
        const { style, className, top } = this.props;

        return (
            <div
                style={Object.assign({
                    position: 'fixed',
                    top,
                }, style)}
                className={className}
            >
                {this.props.children}
            </div>
        );
    }
}

Follow.propTypes = {
    style: PropTypes.objectOf(PropTypes.any),
    offsetTop: PropTypes.number,
    className: PropTypes.string,
}

Follow.defaultProps = {
    style: {},
    offsetTop: 0,
    className: '',
}

export default Follow;
