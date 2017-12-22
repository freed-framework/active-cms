/**
 * @file basicEdit.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { Row, Col, Select, Tooltip, Icon, Tag } from 'antd';
import PropTypes from 'prop-types';
import { editComponentByType, editComponentByGuid } from '../../pages/editor/App';
import defaultStyleHoc from '../../common/hoc/defaultStyleHoc';
import BorderEdit from '../border';
import Background from '../background';
import './basic.scss';

const Option = Select.Option;

@defaultStyleHoc
class BasicEdit extends PureComponent {
    static propTypes = {
        target: PropTypes.string,
        guid: PropTypes.string,
    }

    static defaultProps = {
        componentProps: {},
    }

    constructor(props) {
        super(props);
        const { componentProps = {}, target } = props;
        const { style = {} } = componentProps;
        const propsStyle = style[target] || {};
        const obj = {};

        Object.keys(propsStyle).forEach(k => {
            const v = propsStyle[k];

            if (v !== undefined) {
                obj[k] = v;
            }
        });

        this.state = obj;
    }

    /**
     * 背景颜色修改
     */
    onBackgroundChange = ({option, value}) => {
        const { guid, target } = this.props;

        const keys = target ?
            ['componentProps', 'style', target, option] :
            ['componentProps', 'style', option];

        editComponentByGuid(
            guid,
            keys,
            value,
        );
    }

    /**
     * 回车修改元数据
     */
    handleKeyUp = (event) => {
        if (event.keyCode !== 13) return;
        // 要修改某个元素的对应关系, layout, main, ...
        const { target, guid } = this.props;
        const attr = event.currentTarget.getAttribute('data-attr');
        const value = event.currentTarget.value;

        const keys = target ?
            ['componentProps', 'style', target, attr] :
            ['componentProps', 'style', attr];

        editComponentByGuid(
            guid,
            keys,
            value,
        );
    }

    /**
     * 回车修改input数据
     */
    handleChange = (event) => {
        const attr = event.currentTarget.getAttribute('data-attr');
        const value = event.currentTarget.value;

        this.setState({
            [attr]: value,
        });
    }

    /**
     * 修改定位类型
     * @param value
     */
    handleChangePositionType = (value) => {
        const { target, guid } = this.props;
        const keys = ['componentProps', 'style', target, 'position'];

        editComponentByGuid(
            guid,
            keys,
            value,
        );
    }

    handleChangeOverflow = (value) => {
        const { target, guid } = this.props;
        const keys = ['componentProps', 'style', target, 'overflow'];

        editComponentByGuid(
            guid,
            keys,
            value,
        );
    }

    render() {
        const { target, guid, componentProps } = this.props;
        // 这里的componentProps 应该从 defaultValue merge
        // const { style = {} } = componentProps;
        const propsStyle = this.state;
        const borderProps = {
            style: propsStyle,
            target,
            guid,
        };

        return (
            <div className="ec-editor-basic">
                <Row>
                    <Col span={12}>
                        <div className="ec-editor-basic-props ec-editor-basic-props-width">
                            <label htmlFor="">宽度</label>
                            <input
                                type="text"
                                data-guid={guid}
                                data-attr="width"
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp}
                                value={this.state.width}
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="ec-editor-basic-props ec-editor-basic-props-height">
                            <label htmlFor="">高度</label>
                            <input
                                type="text"
                                data-guid={guid}
                                data-attr="height"
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp}
                                value={this.state.height}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="ec-editor-basic-props ec-editor-basic-props-margin">
                            <label htmlFor="">外边距</label>
                            <input
                                type="text"
                                data-guid={guid}
                                data-attr="margin"
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp}
                                value={this.state.margin}
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="ec-editor-basic-props ec-editor-basic-props-padding">
                            <label htmlFor="">内边距</label>
                            <input
                                type="text"
                                data-guid={guid}
                                data-attr="padding"
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp}
                                value={this.state.padding}
                            />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <label htmlFor="">定位</label>
                            <Select
                                defaultValue={propsStyle.position || 'static'}
                                onChange={this.handleChangePositionType}
                            >
                                <Option value="static">默认方式</Option>
                                <Option value="relative">相对定位</Option>
                                <Option value="absolute">绝对定位</Option>
                                <Option value="fixed">浮动定位</Option>
                            </Select>
                            <Tooltip
                                placement="bottom"
                                title="使用'绝对定位'的时候，请将外层布局的定位设置为'相对定位'或其他并设置'高度'"
                            >
                                &nbsp;<Icon type="question-circle" />
                            </Tooltip>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="ec-editor-basic-props ec-editor-basic-props-top">
                            <label htmlFor="">上</label>
                            <input
                                type="text"
                                data-attr="top"
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp}
                                value={this.state.top}
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="ec-editor-basic-props ec-editor-basic-props-buttom">
                            <label htmlFor="">下</label>
                            <input
                                type="text"
                                data-attr="bottom"
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp}
                                value={this.state.bottom}
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="ec-editor-basic-props ec-editor-basic-props-left">
                            <label htmlFor="">左</label>
                            <input
                                type="text"
                                data-attr="left"
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp}
                                value={this.state.left}
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="ec-editor-basic-props ec-editor-basic-props-right">
                            <label htmlFor="">右</label>
                            <input
                                type="text"
                                data-attr="right"
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp}
                                value={this.state.right}
                            />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <label htmlFor="">溢出设置</label>
                            <Select
                                defaultValue={propsStyle.overflow || 'visible'}
                                onChange={this.handleChangeOverflow}
                            >
                                <Option value="visible">默认方式</Option>
                                <Option value="hidden">隐藏</Option>
                                <Option value="scroll">滚动</Option>
                                <Option value="auto">自动</Option>
                                <Option value="inherit">父元素继承</Option>
                            </Select>
                        </div>
                    </Col>
                </Row>
                <div className="ec-editor-basic-props ec-editor-basic-props-border">
                    <label htmlFor="">边框</label>
                    <BorderEdit { ...borderProps } />
                </div>

                <div className="ec-editor-basic-props ec-editor-basic-props-background">
                    <label
                        htmlFor=""
                    >
                        背景
                    </label>
                    <div
                        className="inline-block"
                    >
                        <Background
                            backgroundImage={this.state.backgroundImage}
                            backgroundColor={this.state.backgroundColor}
                            onChange={this.onBackgroundChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BasicEdit;
