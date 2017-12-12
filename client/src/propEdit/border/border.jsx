/**
 * 编辑border属性
 *
 * @file border.jsx
 * @author shijh
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select, InputNumber, Popover } from 'antd';
import { ChromePicker } from 'react-color';
import { editComponentByType, editComponentByGuid } from '../../pages/editor/App';

const Option = Select.Option;

export default class BorderEdit extends PureComponent {
    static propTypes = {
        guid: PropTypes.string,
        target: PropTypes.string,
        style: PropTypes.objectOf(PropTypes.any),
    }

    static defaultProps = {
        style: {},
    }

    constructor(props) {
        super(props);

        const { borderWidth, borderStyle, borderColor } = props.style;

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
            // editComponentByType({guid, attr: 'borderColor', target, value: hex});
            editComponentByGuid(
                guid,
                ['componentProps', 'style', target, 'borderColor'],
                hex
            )
        })
    }

    handleChange = (value) => {
        const { guid, target } = this.props;

        this.setState({
            sty: value
        }, () => {
            // editComponentByType({guid, attr: 'borderStyle', target, value})
            editComponentByGuid(
                guid,
                ['componentProps', 'style', target, 'borderStyle'],
                value
            )
        })
    }

    handleWidthChange = (value) => {
        const { guid, target } = this.props;

        this.setState({
            wid: value
        }, () => {
            // editComponentByType({guid, attr: 'borderWidth', target, value})
            editComponentByGuid(
                guid,
                ['componentProps', 'style', target, 'borderWidth'],
                value
            )
        })
    }

    render() {
        const { sty, col, wid } = this.state;

        return (
            <div className="ec-edit-border">
                <InputNumber
                    placeholder="宽度"
                    min={0}
                    defaultValue={wid}
                    onChange={this.handleWidthChange}
                />
                <Select
                    style={{width: '60px'}}
                    onChange={this.handleChange}
                    value={sty}
                    dropdownClassName="dropdown-class"
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
