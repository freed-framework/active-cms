/**
 * @file App.jsx
 * @author shijh
 *
 * 背景色选择组件
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Popover, Input, Row, Col, Select } from 'antd';
import * as FileUpload from 'react-fileupload';

import ColorPicker from '../colorPicker';
import { editComponentByGuid } from '../../pages/editor/App';

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

class Background extends PureComponent {
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
        const { guid, backgroundColor, onChange } = this.props;
        editComponentByGuid(
            guid,
            ['componentProps', 'style', 'layout', 'backgroundColor'],
            value
        );
        this.setState({
            backgroundColor: value,
        });
    }

    handleClear = () => {
        const { option } = this.state;
        const { guid, backgroundColor, onChange } = this.props;
        editComponentByGuid(
            guid,
            ['componentProps', 'style', 'layout', 'backgroundColor'],
            ''
        );
        this.setState({
            backgroundColor: '',
        });
    }

    renderOption = () => {
        const {
            option, backgroundColor, backgroundImage
        } = this.state;
        const { guid, componentProps = {} } = this.props;

        /*set properties*/
        const options = {
            baseUrl: `${config.api}/commonUploadFile/uploadImageFiles`,
            chooseAndUpload: true,
            dataType: 'multipart/form-data',
            fileFieldName: 'file',
            uploadSuccess: (props) => {
                const { data } = props;
                const url = `${data[0].imageDomain}/${data[0].suffixUrl}`;

                this.setState({
                    backgroundImage: url,
                });

                editComponentByGuid(
                    guid,
                    ['componentProps', 'style', 'layout', 'backgroundImage'],
                    `url(${url})`
                );
            }
        }

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
                    <FileUpload options={options}>
                        <Input
                            ref="chooseAndUpload"
                            placeholder="点击上传图片"
                            defaultValue={backgroundImage}
                            value={backgroundImage}
                        />
                    </FileUpload>
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
                            dropdownClassName="dropdown-class"
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
