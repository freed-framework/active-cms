import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Row, Col, Input } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';
import './modal.scss';

class Modal extends PureComponent {
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
        const data = {
            [key]: e.target.value,
        };

        // 当改变 modal 数据的时候，自动展示出 modal
        const autoModalVisible = componentProps.hasModal && !componentProps.showExplain;
        if (autoModalVisible) {
            data.showExplain = true;
        }

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
                            data-key="hasModal"
                            onChange={this.handleChangeCheckbox}
                        >
                            使用弹出框
                        </Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox
                            defaultChecked={hasModal}
                            checked={isVisbile}
                            data-key="showExplain"
                            onChange={this.handleChangeCheckbox}
                        >
                            预览
                        </Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col>标题</Col>
                    <Col span={24}>
                        <Input
                            data-key="modalTitle"
                            onChange={this.handleChangeData}
                            value={modalTitle}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>内容</Col>
                    <Col span={24}>
                        <Input
                            type="textarea"
                            data-key="modalContent"
                            onChange={this.handleChangeData}
                            value={modalContent}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>按钮文字</Col>
                    <Col span={24}>
                        <Input
                            data-key="modalBtn"
                            onChange={this.handleChangeData}
                            value={modalBtn}
                        />
                    </Col>
                </Row>
                <Row>
                    <div className="ec-editor-basic-props ec-editor-basic-props-top">
                        <label htmlFor="">上</label>
                        <input
                            type="text"
                            data-key="modalTop"
                            onChange={this.handleChangeData}
                            value={modalTop}
                        />
                    </div>

                    <div className="ec-editor-basic-props ec-editor-basic-props-left">
                        <label htmlFor="">宽度</label>
                        <input
                            type="text"
                            data-key="modalWidth"
                            onChange={this.handleChangeData}
                            value={modalWidth}
                        />
                    </div>
                </Row>
            </div>
        )
    }
}

export default Modal;
