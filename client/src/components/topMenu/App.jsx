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
                className="as-editor-banner"
            >
                <Row>
                    <Col span={4} className="as-editor-banner-left">
                        <span>Static</span>
                    </Col>
                    <Col span={14} className="as-editor-banner-center">
                        <ul className="as-editor-component">
                            <li
                                data-name="floor"
                                onClick={addComponent}
                                className="as-editor-component-list"
                            >
                                <Icon type="layout" />
                                <span>楼层</span>
                            </li>
                            <li
                                data-name="fix"
                                onClick={addComponent}
                                className="as-editor-component-list"
                            >
                                <Icon type="user" />
                                <span>悬停</span>
                            </li>
                            <li
                                data-name="tab"
                                onClick={addComponent}
                                className="as-editor-component-list"
                            >
                                <Icon type="user" />
                                <span>Tab</span>
                            </li>
                        </ul>
                    </Col>
                    <Col span={6} className="as-editor-banner-right">
                        <Button
                            className="as-editor-btn"
                            size="small"
                            onClick={viewer}
                        >
                            预览和设置
                        </Button>
                        <Button
                            className="as-editor-btn"
                            size="small"
                            onClick={saveData}
                        >
                            保存
                        </Button>
                        <Button
                            className="as-editor-btn"
                            size="small"
                        >
                            发布
                        </Button>
                        <Button
                            className="as-editor-btn"
                            size="small"
                            onClick={this.handleGoBack}
                        >
                            返回
                        </Button>
                        <Button
                            className="as-editor-btn as-editor-btn-red"
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
