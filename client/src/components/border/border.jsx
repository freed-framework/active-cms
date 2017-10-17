/**
 * 编辑border属性
 *
 * @file border.jsx
 * @author shijh
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, InputNumber, Popover } from 'antd';
import { ChromePicker } from 'react-color';
import { editComponentByType } from '../../pages/editor/App';

const Option = Select.Option;

export default class BorderEdit extends Component {
    static propTypes = {
        guid: PropTypes.string,
        target: PropTypes.string,
        borderWidth: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
        borderColor: PropTypes.string,
        borderStyle: PropTypes.string,
    }

    constructor(props) {
        super(props);

        const { borderWidth, borderStyle, borderColor } = props;

        this.state = {
            wid: borderWidth || 0,
            sty: borderStyle || '',
            col: borderColor || 'transparent'
        }
    }

    onChangeComplete = (color) => {
        const { guid, target } = this.props;
        const { hex } = color;

        this.setState({
            col: hex
        }, () => {
            editComponentByType({guid, attr: 'borderColor', target, value: hex})
        })
    }

    handleChange = (value) => {
        const { guid, target } = this.props;

        this.setState({
            sty: value
        }, () => {
            editComponentByType({guid, attr: 'borderStyle', target, value})
        })
    }

    handleWidthChange = (value) => {
        const { guid, target } = this.props;

        this.setState({
            wid: value
        }, () => {
            editComponentByType({guid, attr: 'borderWidth', target, value})
        })
    }

    render() {
        const { sty, col } = this.state;

        return (
            <div className="ec-edit-border">
                <InputNumber
                    placeholder="宽度"
                    min={0}
                    onChange={this.handleWidthChange}
                />
                <Select
                    style={{width: '60px', 'margin': '0 6px'}}
                    onChange={this.handleChange}
                    value={sty}
                >
                    <Option
                        key="solid"
                        value="solid"
                        className="ec-edit-border-style-solid"
                    >
                        实线
                    </Option>
                    <Option
                        key="double"
                        value="double"
                        className="ec-edit-border-style-double"
                    >
                        双线
                    </Option>
                    <Option
                        key="dashed"
                        value="dashed"
                        className="ec-edit-border-style-dashed"
                    >
                        虚线
                    </Option>
                    <Option
                        key="dotted"
                        value="dotted"
                        className="ec-edit-border-style-dotted"
                    >
                        点状
                    </Option>
                </Select>
                <Popover
                    content={
                        <ChromePicker
                            color={this.state.col}
                            onChangeComplete={this.onChangeComplete}
                        />
                    }
                    trigger={['click']}
                >
                    <span
                        className="ec-edit-border-color"
                        style={{backgroundColor: col}}
                    />
                </Popover>
                
            </div>
        )
    }
}
