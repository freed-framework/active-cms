/**
 * @file Tips.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import classNames from 'classnames';

const Tips = (props) => {
    const { rect = {}, isVisible } = props;
    const styles = isVisible ? rect : {};

    return (
        <div
            className={classNames('editable-tips', {
                'editable-tips-hide': !isVisible
            })}
            style={{
                ...styles
            }}
        />
    );
}

export default Tips;
