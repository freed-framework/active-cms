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
                className="ec-editor-banner"
            >
                <Row>
                    <Col span={4} className="ec-editor-banner-left">
                        <span>Static</span>
                    </Col>
                    <Col span={20} className="ec-editor-banner-right">
                        <Button
                            className="ec-editor-btn"
                            size="small"
                            onClick={viewer}
                        >
                            预览
                        </Button>
                        <Button
                            className="ec-editor-btn"
                            size="small"
                            onClick={saveData}
                        >
                            保存
                        </Button>
                        <Button
                            className="ec-editor-btn"
                            size="small"
                        >
                            发布
                        </Button>
                        <Button
                            className="ec-editor-btn"
                            size="small"
                            onClick={this.handleGoBack}
                        >
                            返回
                        </Button>
                        <Button
                            className="ec-editor-btn ec-editor-btn-red"
                            size="small"
                        >
                            退出
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TopMenu;
