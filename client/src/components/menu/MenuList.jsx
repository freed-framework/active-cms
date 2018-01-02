/*
 * @file: MenuList.jsx
 * @Author: shijh
 * @CreateDate: 2017-12-15 10:57:06
 * @Last Modified by: shijh
 * @Last Modified time: 2018-01-02 11:53:35
 *
 * 列表页menu
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import Particle from '../../components/particle';
import { getUser } from '../../actions/user';

@connect(
    state => ({
        user: state.toJS().user.data,
    }),
    dispatch => bindActionCreators({
        getUser
    }, dispatch)
)
export default class TopMenu extends PureComponent {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
        getUser: PropTypes.func,
        uploadZip: PropTypes.func
    }

    handleAdd = () => {
        this.props.history.push('/mobile/new')
    }

    /**
     * 退出登录
     */
    handleLogout = () => {
        localStorage.removeItem('access_token');
        this.props.getUser()
    }

    /**
     * 上传页面
     */
    handleUpload = () => {
        this.props.uploadZip({
            isEdit: false,
            uploadModal: true
        });
    }

    render() {
        return (
            <div
                className="ec-editor-banner ec-banner-list"
            >
                <Row>
                    <Col span={4} className="ec-editor-banner-left">
                        <Particle
                            imgUrl={require('../../images/wuget-logo-white.png')}
                            width={140}
                            height={50}
                        />
                    </Col>
                    <Col span={8} className="ec-editor-banner-center" />
                    <Col span={12} className="ec-editor-banner-right">
                        <Button
                            className="ec-editor-btn"
                            onClick={this.handleAdd}
                        >
                            新建
                        </Button>
                        <Button
                            className="ec-editor-btn"
                            onClick={this.handleUpload}
                        >
                            上传
                        </Button>
                        <Button
                            className="ec-editor-btn ec-editor-btn-red"
                            onClick={this.handleLogout}
                        >
                            退出
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
