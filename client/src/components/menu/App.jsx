/*
 * @file: App.jsx
 * @Author: shijh
 * @CreateDate: 2017-12-15 10:57:34
 * @Last Modified by: shijh
 * @Last Modified time: 2018-01-04 16:25:28
 *
 * 新建编辑页menu
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { is } from 'immutable';
import { withRouter } from 'react-router';
import Font from 'font';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon } from 'antd';
import { addComponent, saveData, viewer, handlePush } from '../../pages/editor/App';
import back from '../../images/icon-svg/back.svg';
import { getUser } from '../../actions/user';

@connect(
    state => ({
        user: state.toJS().user.data,
        page: state.toJS().page,
    }),
    dispatch => bindActionCreators({
        getUser
    }, dispatch)
)
class TopMenu extends PureComponent {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
    }
    constructor(props) {
        super(props);
        const { location } = props;

        this.state = {
            visible: props.visible,
            isEidt: location.pathname.indexOf('/edit/') > -1
        }
    }

    componentDidMount() {
        const { history } = this.props;
        this.unPage = history.listen(loc => {
            this.setState({
                isEidt: loc.pathname.indexOf('/edit/') > -1
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!is(this.state.visible, nextProps.visible)) {
            this.setState({
                visible: nextProps.visible,
            });
        }
    }

    componentWillUnmount() {
        this.unPage();
    }

    /**
     * 返回我的页面
     */
    handleGoBack = () => {
        const { length, goBack, replace } = this.props.history;

        // 新打开页面length为2
        // if (length <= 2) {
        replace('/lists/my');
        // } else {
        //     goBack();
        // }
    }

    /**
     * 退出登录
     */
    handleLogout = () => {
        localStorage.removeItem('access_token');
        this.props.getUser()
    }

    render() {
        const { visible, isEidt } = this.state;
        const clsMenu = classNames('ec-editor-menu', {
            'ec-editor-menu-hide': !visible,
        });
        return (
            <div
                className={clsMenu}
            >
                <div className="triangle-left" />
                {
                    isEidt &&
                    <Button
                        className="ec-editor-btn"

                        size="small"
                        onClick={viewer}
                    >
                        <Icon type="eye-o" />
                        <span>预览</span>
                    </Button>
                }
                <Button
                    className="ec-editor-btn guide-steps-handler"
                    data-guide={'{"step": 4, "tip": "此按钮为保存按钮", "delay": 600, "nextStep": 5}'}
                    size="small"
                    onClick={saveData}
                >
                    <Icon type="save" />
                    <span>保存</span>
                </Button>
                {
                    isEidt &&
                    <Button
                        className="ec-editor-btn guide-steps-handler"
                        data-guide={'{"step": 7, "tip": "点击发布"}'}
                        size="small"
                        onClick={handlePush}
                    >
                        <Icon type="appstore-o" />
                        <span>发布</span>
                    </Button>
                }
                <Button
                    className="ec-editor-btn"
                    size="small"
                    onClick={this.handleGoBack}
                >
                    <Icon type="rollback" />
                    {/*<Font type="back" />*/}
                    {/*<img src={back} />*/}
                    <span>返回</span>
                </Button>
                <Button
                    className="ec-editor-btn ec-editor-btn-red"
                    size="small"
                    onClick={this.handleLogout}
                >
                    <Icon type="poweroff" />
                    <span>退出</span>
                </Button>
            </div>
        )
    }
}

export default withRouter(TopMenu);
