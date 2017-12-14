import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { is } from 'immutable';
import Font from 'font';
import { Row, Col, Button, Icon } from 'antd';
import { addComponent, saveData, viewer, handlePush } from '../../pages/editor/App';
import back from '../../images/icon-svg/back.svg';

class TopMenu extends PureComponent {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
    }
    constructor(props) {
        super(props);

        this.state = {
            visible: props.visible,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!is(this.state.visible, nextProps.visible)) {
            this.setState({
                visible: nextProps.visible,
            });
        }
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
        const { visible } = this.state;
        const clsMenu = classNames('ec-editor-menu', {
            'ec-editor-menu-hide': !visible,
        });
        return (
            <div
                className={clsMenu}
            >
                <div className="triangle-left" />
                <Button
                    className="ec-editor-btn"
                    
                    size="small"
                    onClick={viewer}
                >
                    <Icon type="eye-o" />
                    <span>预览</span>
                </Button>
                <Button
                    className="ec-editor-btn guide-steps-handler"
                    data-guide={'{"step": 4, "tip": "此按钮为保存按钮", "delay": 600, "nextStep": 5}'}
                    size="small"
                    onClick={saveData}
                >
                    <Icon type="save" />
                    <span>保存</span>
                </Button>
                <Button
                    className="ec-editor-btn guide-steps-handler"
                    data-guide={'{"step": 7, "tip": "点击发布"}'}
                    size="small"
                    onClick={handlePush}
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
                    {/*<Font type="back" />*/}
                    {/*<img src={back} />*/}
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
