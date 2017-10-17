/**
 * @file App.jsx
 * @author shijh
 *
 * 拾色器组件
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SketchPicker, PhotoshopPicker } from 'react-color';
import { Popover, Input, Icon } from 'antd';

import * as Styled from './picker.style';

/**
 * 格式化rgba字符转
 * @param {string} color 颜色rgba字符串 
 * @return {Object|undefined} result {r: x, g: x, b: x, a: x} | undefined
 */
function parseRGBA(color = '') {
    let result;
    color.replace(/^rgba\((.*)\)$/ig, ($0, $1) => {
        const rgba = $1.split(',');
        result = {r: rgba[0], g: rgba[1], b: rgba[2], a: rgba[3]}
    });
    return result;
}

class ColorPicker extends Component {
    static propTypes = {
        color: PropTypes.string,
        onChangeComplete: PropTypes.func.isRequired,
        onClear: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            color: parseRGBA(props.color),
            showColor: props.color,
        }
    }

    onChangeComplete = (color) => {
        const { rgb } = color;
        const { r, g, b, a } = rgb;
        const showColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        this.setState({
            color: rgb,
            showColor,
        }, () => {
            this.props.onChangeComplete(showColor);
        })
    }

    handleClear = () => {
        const { onClear } = this.props;
        this.setState({
            color: '',
            showColor: '',
        }, () => {
            onClear && onClear();
        })
    }

    render() {
        const { showColor } = this.state;
        return (
            <Popover
                content={
                    <SketchPicker
                        color={this.state.color}
                        onChangeComplete={this.onChangeComplete}
                    />
                }
                trigger={['click']}
            >
                <Styled.ColorInputWrap>
                    <Input
                        value={showColor}
                        suffix={<Icon type="close-circle-o" onClick={this.handleClear} />}
                    />
                </Styled.ColorInputWrap>
            </Popover>
        )
    }
}

export default ColorPicker;
