import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Font from 'font';
import { Row, Col, Button, Icon } from 'antd';
import { addComponent, saveData, viewer } from '../../pages/editor/App';

export default class TopMenu extends Component {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
    }

    handleAdd = () => {
        this.props.history.push('/new')
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
                    </Col>
                    <Col span={6} className="as-editor-banner-right">
                        <Button
                            className="as-editor-btn"
                            size="small"
                            onClick={this.handleAdd}
                        >
                            新建
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
