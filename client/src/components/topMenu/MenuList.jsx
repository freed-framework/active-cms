import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Font from 'font';
import { Row, Col, Button, Icon, Input } from 'antd';
import { addComponent, saveData, viewer } from '../../pages/editor/App';

const Search = Input.Search;

export default class TopMenu extends Component {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
        onSearch: PropTypes.func,
    }

    handleAdd = () => {
        this.props.history.push('/new')
    }

    handleSearch = (value) => {
        this.props.onSearch(value)
    }

    render() {
        return (
            <div
                className="as-editor-banner as-editor-banner-list"
            >
                <Row>
                    <Col span={4} className="as-editor-banner-left">
                        <span>Static</span>
                    </Col>
                    <Col span={10} className="as-editor-banner-center">
                    </Col>
                    <Col span={10} className="as-editor-banner-right">
                        <Search
                            placeholder="搜索标题"
                            style={{ width: 200 }}
                            onSearch={this.handleSearch}
                        />
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
