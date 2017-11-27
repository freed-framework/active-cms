import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Font from 'font';
import { Row, Col, Button, Icon } from 'antd';
import { addComponent, saveData, viewer } from '../../pages/editor/App';

class TopMenu extends Component {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
    }

    handleGoBack = () => {
        const { length, goBack, replace } = this.props.history;

        // 新打开页面length为2
        if (length <= 2) {
            replace('/lists/publish');
        } else {
            goBack();
        }
    }

    render() {
        return (
            <div
                className="ec-editor-menu"
            >
                <Button
                    className="ec-editor-btn"
                    size="small"
                    onClick={viewer}
                >
                    <Icon type="eye-o" />
                    <span>预览</span>
                </Button>
                <Button
                    className="ec-editor-btn"
                    size="small"
                    onClick={saveData}
                >
                    <Icon type="save" />
                    <span>保存</span>
                </Button>
                <Button
                    className="ec-editor-btn"
                    size="small"
                >
                    <Icon type="appstore-o" />
                    <span>发布</span>
                </Button>
                <Button
                    className="ec-editor-btn"
                    size="small"
                    onClick={this.handleGoBack}
                >
                    <Icon type="rollback" />
                    <span>返回</span>
                </Button>
                <Button
                    className="ec-editor-btn ec-editor-btn-red"
                    size="small"
                >
                    <Icon type="poweroff" />
                    <span>退出</span>
                </Button>
            </div>
        )
    }
}

export default TopMenu;
