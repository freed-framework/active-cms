import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Row, Col, InputNumber, Input } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';
import './modal.scss';

class Modal extends Component {
    static propTypes = {
        guid: PropTypes.string,
        componentProps: PropTypes.objectOf(PropTypes.any),

    }

    constructor(props) {
        super(props);

        const {
            componentProps = {}
        } = this.props;
        const {
            showModal = false, modalBtn, modalContent, modalTop,
            modalWidth, modalTitle
        } = componentProps;

        this.state = {
            showModal,
            modalBtn,
            modalContent,
            modalTop,
            modalWidth,
            modalTitle
        }
    }

    /**
     * 切换选中
     */
    handleCheck = () => {
        this.setState({
            showModal: !this.state.showModal
        }, () => {
            editComponentByGuid(
                this.props.guid,
                ['componentProps', 'showModal'],
                this.state.showModal
            );
        })
    }

    /**
     * 修改title
     */
    handleTitle = (e) => {
        const { value } = e.target;
        this.setState({
            modalTitle: value
        }, () => {
            editComponentByGuid(
                this.props.guid,
                ['componentProps', 'modalTitle'],
                value
            );
        })
    }

    /**
     * 修改内容
     */
    handleContent = (e) => {
        const { value } = e.target;
        this.setState({
            modalContent: value
        }, () => {
            editComponentByGuid(
                this.props.guid,
                ['componentProps', 'modalContent'],
                value
            );
        })
    }

    /**
     * 切换按钮文字
     */
    handleBtn = (e) => {
        const { value } = e.target;
        this.setState({
            modalBtn: value
        }, () => {
            editComponentByGuid(
                this.props.guid,
                ['componentProps', 'modalBtn'],
                value
            );
        })
    }

    /**
     * 修改到顶部的距离
     */
    handleTop = (e) => {
        const { value } = e.target;
        this.setState({
            modalTop: value
        }, () => {
            editComponentByGuid(
                this.props.guid,
                ['componentProps', 'modalTop'],
                value
            );
        })
    }

    /**
     * 修改弹窗宽度
     */
    handleWidth = (e) => {
        const { value } = e.target;
        this.setState({
            modalWidth: value
        }, () => {
            editComponentByGuid(
                this.props.guid,
                ['componentProps', 'modalWidth'],
                value
            );
        })
    }

    render() {
        const {
            showModal,
            modalBtn,
            modalContent,
            modalTop,
            modalWidth,
            modalTitle
        } = this.state;

        return (
            <div className="ec-editor-basic-props ec-editor-props-modal">
                <label htmlFor="">弹出框设置</label>
                <Checkbox
                    checked={showModal}
                    onChange={this.handleCheck}
                >
                    显示弹出框
                </Checkbox>
                <Row>
                    <Col>标题</Col>
                    <Col span={24}>
                        <Input
                            onChange={this.handleTitle}
                            value={modalTitle}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>内容</Col>
                    <Col span={24}>
                        <Input
                            type="textarea"
                            onChange={this.handleContent}
                            value={modalContent}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>按钮文字</Col>
                    <Col span={24}>
                        <Input
                            onChange={this.handleBtn}
                            value={modalBtn}
                        />
                    </Col>
                </Row>
                <Row>
                    <div className="ec-editor-basic-props ec-editor-basic-props-top">
                        <label htmlFor="">上</label>
                        <input
                            type="text"
                            data-attr="top"
                            onChange={this.handleTop}
                            value={modalTop}
                        />
                    </div>

                    <div className="ec-editor-basic-props ec-editor-basic-props-left">
                        <label htmlFor="">宽度</label>
                        <input
                            type="text"
                            data-attr="left"
                            onChange={this.handleWidth}
                            value={modalWidth}
                        />
                    </div>
                </Row>
            </div>
        )
    }
}

export default Modal;
