/**
 * @file basicEdit.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { editComponentByType, editComponentByGuid } from '../../pages/editor/App';
import defaultStyleHoc from '../../common/hoc/defaultStyleHoc';
import BorderEdit from '../border';
import Background from '../background';

@defaultStyleHoc
class BasicEdit extends PureComponent {
    static propTypes = {
        target: PropTypes.string,
        guid: PropTypes.string,
    }

    static defaultProps = {
        componentProps: {},
        defaultValue: {},
    }

    constructor(props) {
        super(props);
        const { componentProps = {}, target } = props;
        const { style = {} } = componentProps;
        const propsStyle = style[target] || {};

        this.state = {
            width: propsStyle.width,
            height: propsStyle.height,
            margin: propsStyle.margin,
            padding: propsStyle.padding,
            border: propsStyle.border,
            background: propsStyle.background,
            backgroundColor: propsStyle.backgroundColor,
            backgroundImage: propsStyle.backgroundImage,
        }
    }

    onBackgroundChange = ({option, value}) => {
        const { guid, target } = this.props;

        // editComponentByType({guid, attr: option, target, value});

        const keys = target ?
            ['componentProps', 'style', target, option] :
            ['componentProps', 'style', option];

        editComponentByGuid(
            guid,
            keys,
            value,
        );
    }

    handleKeyUp = (event) => {
        // 要修改某个元素的对应关系, layout, main, ...
        const { target, guid } = this.props;
        const attr = event.currentTarget.getAttribute('data-attr');
        const value = event.currentTarget.value;

        const keys = target ?
            ['componentProps', 'style', target, attr] :
            ['componentProps', 'style', attr];

        if (event.keyCode === 13) {
            editComponentByGuid(
                guid,
                keys,
                value,
            );
        }
    }

    handleChange = (event) => {
        const attr = event.currentTarget.getAttribute('data-attr');
        const value = event.currentTarget.value;

        this.setState({
            [attr]: value,
        });
    }

    render() {
        const { target, guid, componentProps } = this.props;

        // 这里的componentProps 应该从 defaultValue merge
        const { style = {} } = componentProps;
        const propsStyle = style[target];
        const borderProps = {
            style: propsStyle,
            target,
            guid,
        }

        return (
            <div>
                <div>{target}</div>
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
