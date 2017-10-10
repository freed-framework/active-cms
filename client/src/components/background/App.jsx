/**
 * @file App.jsx
 * @author shijh
 *
 * 背景色选择组件
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popover, Input, Row, Col, Select } from 'antd';

import ColorPicker from '../colorPicker';

import * as Styled from './background.style';

const Option = Select.Option;

/**
 * 格式化image字符转
 * @param {string} color 颜色rgba字符串 
 * @return {Object|undefined} result {r: x, g: x, b: x, a: x} | undefined
 */
function parseImage(image = '') {
    let result;
    image.replace(/^url\((.*)\)$/ig, ($0, $1) => {
        result = $1;
    });
    return result;
}

class Background extends Component {
    static propTypes = {
        backgroundColor: PropTypes.string,
        backgroundImage: PropTypes.string,
        onChange: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            option: 'backgroundColor',
            backgroundColor: props.backgroundColor,
            backgroundImage: parseImage(props.backgroundImage)
        }
    }

    onSelectChange = (option) => {
        this.setState({
            option
        })
    }

    handleChange = (value) => {
        const { option } = this.state;
        const { onChange } = this.props;
        this.setState({
            [option]: value
        }, () => {
            onChange && onChange({option, value})
        })
    }

    handleClear = () => {
        const { option } = this.state;
        const { onChange } = this.props;
        this.setState({
            [option]: ''
        }, () => {
            onChange && onChange({option, value: ''})
        })
    }

    renderOption = () => {
        const {
            option, backgroundColor, backgroundImage
        } = this.state;

        switch (option) {
            case 'backgroundColor':
                return (
                    <ColorPicker
                        color={backgroundColor}
                        onChangeComplete={
                            (color) => this.handleChange(color)
                        }
                        onClear={
                            this.handleClear
                        }
                    />
                )
            case 'backgroundImage':
                return (
                    <Input
                        placeholder="请填写图片连接"
                        defaultValue={backgroundImage}
                        onChange={(e) => this.handleChange(`url(${e.target.value})`)}
                    />
                )
            default:
                return null;    
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <Select
                            defaultValue={
                                this.state.option
                            }
                            style={{ width: 80 }}
                            onChange={this.onSelectChange}
                        >
                            <Option key="backgroundColor" value="backgroundColor">背景色</Option>
                            <Option key="backgroundImage" value="backgroundImage">背景图片</Option>
                        </Select>
                    </Col>
                    <Col span={16}>
                        {
                            this.renderOption()
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Background;


{/* <Popover
                content={
                    <Styled.propInner>
                        <Row>
                            <Col span={8}>
                                <span>背景色：</span>
                            </Col>
                            <Col span={16}>
                                <ColorPicker onChangeComplete={() => {}}/>
                            </Col>
                        </Row>
                    </Styled.propInner>
                }
            >
                <Styled.InputWrap>
                    <Input />
                </Styled.InputWrap>
            </Popover> */}