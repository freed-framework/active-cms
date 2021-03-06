/**
 * @file ActivePanel.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import { Icon } from 'antd';

const ActivePanel = (props) => {

    return (
        <div
            className="editable-active-panel"
        >
            <div className="editable-active-panel-bar">
                {props.history &&
                    <div
                        data-module="control"
                        className="editable-active-panel-buttons editable-active-goback"
                        onClick={props.onGoBack}
                    >
                        <Icon data-module="control" type="rollback" />
                    </div>
                }
            </div>
        </div>
    );
}

ActivePanel.defaultProps = {
    history: null,
    onGoBack: () => {}
}

export default ActivePanel;
