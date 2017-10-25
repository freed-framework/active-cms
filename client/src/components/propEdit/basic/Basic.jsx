/**
 * @file basicEdit.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { editComponent, editComponentByType } from '../../../pages/editor/App';
import BorderEdit from '../border';

import Background from '../background';

class BasicEdit extends PureComponent {
    static propTypes = {
        target: PropTypes.string,
        guid: PropTypes.string,
        compKey: PropTypes.string,
        attribute: PropTypes.objectOf(PropTypes.any),
        items: PropTypes.objectOf(PropTypes.any),
        label: PropTypes.string,
    }

    constructor(props) {
        super(props);

        this.state = {
            width: props.style.width,
            height: props.style.height,
            margin: props.style.margin,
            padding: props.style.padding,
            border: props.style.border,
            background: props.style.background,
            backgroundColor: props.style.backgroundColor,
            backgroundImage: props.style.backgroundImage
        }
    }

    onBackgroundChange = ({option, value}) => {
        const { target, guid } = this.props;
        editComponentByType({guid, attr: option, target, value});
    }

    handleChange = (event) => {
        const attr = event.currentTarget.getAttribute('data-attr');

        this.setState({
            [attr]: event.currentTarget.value,
        });

        editComponent(event);
    }

    render() {
        const { target, guid } = this.props;

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
                                data-target={target}
                                data-attr="width"
                                onChange={this.handleChange}
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
                                data-target={target}
                                data-attr="height"
                                onChange={this.handleChange}
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
                                data-target={target}
                                data-attr="margin"
                                onChange={this.handleChange}
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
                                data-target={target}
                                data-attr="padding"
                                onChange={this.handleChange}
                                value={this.state.padding}
                            />
                        </div>
                    </Col>
                </Row>
                <div className="ec-editor-basic-props ec-editor-basic-props-border">
                    <label htmlFor="">边框</label>
                    <BorderEdit
                        {...this.props}
                    />
                    

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

BasicEdit.defaultProps = {
    style: {},
}

export default BasicEdit;
