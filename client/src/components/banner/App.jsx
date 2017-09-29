import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon } from 'antd';
import { addComponent, saveData } from '../../pages/editor/App';

class Banner extends Component {
    static propTypes = {

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
                                <br/>
                                <span>楼层</span>
                            </li>
                            <li className="as-editor-component-list">
                                <Icon type="user" /><br/>
                                <span>楼层</span>
                            </li>
                            <li className="as-editor-component-list">
                                <Icon type="user" /><br/>
                                <span>楼层</span>
                            </li>
                        </ul>
                    </Col>
                    <Col span={6} className="as-editor-banner-right">
                        <Button
                            className="as-editor-btn"
                            size="small"
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

export default Banner;
