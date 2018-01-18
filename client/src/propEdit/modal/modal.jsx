import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Row, Col, Input } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';
import './modal.scss';

const CheckboxGroup = Checkbox.Group;

class Modal extends PureComponent {
    static propTypes = {
        guid: PropTypes.string,
        componentProps: PropTypes.objectOf(PropTypes.any),
    }

    // constructor(props) {
    //     super(props);
    //
    //     const {
    //         componentProps = {}
    //     } = this.props;
    //     const {
    //         hasModal = false, modalBtn, modalContent, modalTop,
    //         modalWidth, modalTitle
    //     } = componentProps;
    //
    //     this.state = {
    //         // isVisible: false,
    //         // hasModal,
    //         // modalBtn,
    //         // modalContent,
    //         // modalTop,
    //         // modalWidth,
    //         // modalTitle
    //     }
    // }

    handlePreviewCheck = (e) => {
        editComponentByGuid(
            this.props.guid,
            ['componentProps', 'showExplain'],
            e.target.checked
        );
    }

    /**
     * 切换选中
     */
    handleCheck = (e) => {
        console.log(e.target.checked)
        // this.setState({
        //     hasModal: !this.state.hasModal
        // }, () => {
        //     editComponentByGuid(
        //         this.props.guid,
        //         ['componentProps', 'hasModal'],
        //         this.state.hasModal
        //     );
        // });

        // this.setState({
        //     isVisible: !this.state.isVisible
        // });

        editComponentByGuid(
            this.props.guid,
            ['componentProps', 'hasModal'],
            e.target.checked
        );
    }

    /**
     * 修改title
     */
    handleTitle = (e) => {
        console.log(e)
        editComponentByGuid(
            this.props.guid,
            ['componentProps'],
            {
                modalTitle: e.target.value,
                showExplain: true,
            }
        );
    }

    /**
     * 修改内容
     */
    handleContent = (e) => {
        const { value } = e.target;

        editComponentByGuid(
            this.props.guid,
            ['componentProps', 'modalContent'],
            value
        );
        // this.setState({
        //     modalContent: value
        // }, () => {
        //     editComponentByGuid(
        //         this.props.guid,
        //         ['componentProps', 'modalContent'],
        //         value
        //     );
        // })
    }

    /**
     * 切换按钮文字
     */
    handleBtn = (e) => {
        const { value } = e.target;

        editComponentByGuid(
            this.props.guid,
            ['componentProps', 'modalBtn'],
            value
        );
        // this.setState({
        //     modalBtn: value
        // }, () => {
        //     editComponentByGuid(
        //         this.props.guid,
        //         ['componentProps', 'modalBtn'],
        //         value
        //     );
        // })
    }

    /**
     * 修改到顶部的距离
     */
    handleTop = (e) => {
        const { value } = e.target;

        editComponentByGuid(
            this.props.guid,
            ['componentProps', 'modalTop'],
            value
        );
        // this.setState({
        //     modalTop: value
        // }, () => {
        //     editComponentByGuid(
        //         this.props.guid,
        //         ['componentProps', 'modalTop'],
        //         value
        //     );
        // })
    }

    /**
     * 修改弹窗宽度
     */
    handleWidth = (e) => {
        const { value } = e.target;

        editComponentByGuid(
            this.props.guid,
            ['componentProps', 'modalWidth'],
            value
        );
        // this.setState({
        //     modalWidth: value
        // }, () => {
        //     editComponentByGuid(
        //         this.props.guid,
        //         ['componentProps', 'modalWidth'],
        //         value
        //     );
        // })
    }

    onChange = (v) => {
        console.log(v)
    }

    render() {
        const { componentProps = {} } = this.props;
        const {
            hasModal,
            modalBtn,
            modalContent,
            modalTop,
            modalWidth,
            modalTitle,
            showExplain,
        } = componentProps;

        // 如果使用弹出框并且展示
        const isVisbile = showExplain && hasModal;

        return (
            <div className="ec-editor-basic-props ec-editor-props-modal">
                <label htmlFor="">弹出框设置</label>
                <Row>
                    <Col span={12}>
                        <Checkbox
                            checked={hasModal}
                            onChange={this.handleCheck}
                        >
                            使用弹出框
                        </Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox
                            defaultChecked={hasModal}
                            checked={isVisbile}
                            onChange={this.handlePreviewCheck}
                        >
                            预览
                        </Checkbox>
                    </Col>
                </Row>
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
