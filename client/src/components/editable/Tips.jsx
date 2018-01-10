/**
 * @file Tips.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import classNames from 'classnames';

const Tips = (props) => {
    const { rect, isVisible, name } = props;
    const styles = isVisible ? rect : {};

    return (
        <div
            className={classNames('editable-tips', {
                'editable-tips-hide': !isVisible
            })}
            style={{
                ...styles
            }}
        >
            {name &&
                <div className="editable-tips-name">{name}</div>
            }
        </div>
    );
}

export default Tips;
