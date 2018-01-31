import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Row, Col, Input } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';
import './modal.scss';

class Modal extends PureComponent {
    constructor(props) {
        super(props);
        const { componentProps = {} } = this.props;

        this.state = {
            ...componentProps,
        };
    }

    static propTypes = {
        guid: PropTypes.string,
        componentProps: PropTypes.objectOf(PropTypes.any),
    }

    /**
     * checkbox
     * @param e
     */
    handleChangeCheckbox = (e) => {
        const key = e.target['data-key'];

        editComponentByGuid(
            this.props.guid,
            ['componentProps', key],
            e.target.checked
        );
    }

    /**
     * input
     * @param e
     */
    handleChangeData = (e) => {
        const { componentProps = {} } = this.props;
        const key = e.target.getAttribute('data-key');

        this.setState({
            [key]: e.target.value,
        });
    }

    handleSubmitData = (e) => {
        const data = {
            ...this.state
        };

        editComponentByGuid(
            this.props.guid,
            ['componentProps'],
            data
        );
    }

    render() {
        const { componentProps = {} } = this.props;
        const {
            hasModal,
            showExplain,
        } = componentProps;

        const {
            modalBtn,
            modalTitle,
            modalContent,
            modalTop,
            modalWidth,
        } = this.state;

        // 如果使用弹出框并且展示
        const isVisbile = showExplain && hasModal;

        return (
            <div className="ec-editor-basic-props ec-editor-props-modal">
                <label htmlFor="">弹出框设置</label>
                <Row>
                    <Col span={12}>
                        <Checkbox
                            checked={hasModal}
                            data-key="hasModal"
                            onChange={this.handleChangeCheckbox}
                        >
                            使用弹出框
                        </Checkbox>
                    </Col>
                    {hasModal &&
                        <Col span={12}>
                            <Checkbox
                                defaultChecked={isVisbile}
                                checked={isVisbile}
                                data-key="showExplain"
                                onChange={this.handleChangeCheckbox}
                            >
                                显示弹出框
                            </Checkbox>
                        </Col>
                    }
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="ec-editor-basic-props">
                            <label htmlFor="">标题</label>
                            <Input
                                data-key="modalTitle"
                                onChange={this.handleChangeData}
                                onPressEnter={this.handleSubmitData}
                                value={modalTitle}
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="ec-editor-basic-props">
                            <label htmlFor="">按钮文字</label>
                            <Input
                                data-key="modalBtn"
                                onChange={this.handleChangeData}
                                onPressEnter={this.handleSubmitData}
                                value={modalBtn}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="ec-editor-basic-props ec-editor-basic-props-top">
                            <label htmlFor="">上</label>
                            <Input
                                type="text"
                                data-key="modalTop"
                                onChange={this.handleChangeData}
                                onPressEnter={this.handleSubmitData}
                                value={modalTop}
                            />
                        </div>
                    </Col>

                    <Col span={12}>
                        <div className="ec-editor-basic-props ec-editor-basic-props-left">
                            <label htmlFor="">宽度</label>
                            <Input
                                type="text"
                                data-key="modalWidth"
                                onChange={this.handleChangeData}
                                onPressEnter={this.handleSubmitData}
                                value={modalWidth}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>内容</Col>
                    <Col span={24}>
                        <Input
                            type="textarea"
                            data-key="modalContent"
                            onChange={this.handleChangeData}
                            onPressEnter={this.handleSubmitData}
                            onBlur={this.handleSubmitData}
                            value={modalContent}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Modal;
