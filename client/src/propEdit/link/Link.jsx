/**
 * @file Link.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { is, fromJS } from 'immutable';
import { Input, Select } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';

const Option = Select.Option;

function parseUrl(url = '') {
    const hy = /^((hybrid):\/\/.*id=)(.*)$/ig;
    const res = hy.exec(url);
    const hy2 = /^((detail)\/index\.html\?id=)(.*)$/ig;
    const res2 = hy2.exec(url);
    const hy3 = /^((activityPage)\/index\.html\?id=)(.*)$/ig;
    const res3 = hy3.exec(url);
    const hy4 = /^((https?):\/\/)(.+)$/ig;
    const res4 = hy4.exec(url);

    if (res) {
        return res;
    }

    if (res2) {
        return res2;
    }

    if (res3) {
        return res3;
    }

    if (res4) {
        return res4;
    }

    return [];
}

/**
 * 获取 mapping 中的默认值
 * @return {*}
 */
const getMappingDefault = (editModelMapping) => {
    if (!editModelMapping) {
        return null;
    }

    // Object or undefined
    return editModelMapping.find(item => item.isDefault);
}

/**
 * 获取要更新的 state 数据
 * @return {*}
 */
const getUpdateState = (url, editModelMapping) => {
    const urlArr = parseUrl(url);
    const getDef = getMappingDefault(editModelMapping) || {};

    return {
        // 跳转地址的前缀
        before: urlArr[1] || getDef.value,

        // 默认选中项
        defSelect: urlArr[2] || getDef.name,

        // 表单值
        value: urlArr[3] || '',
    }
}

class Link extends PureComponent {
    constructor(props) {
        super(props);

        const { componentProps, editModelMapping } = props;
        const values = getUpdateState(componentProps.url, editModelMapping);

        this.state = {
            ...values,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.componentProps.url !== nextProps.componentProps.url) {
            const values = getUpdateState(nextProps.componentProps.url, nextProps.editModelMapping);

            this.setState({
                ...values,
            })
        }
    }

    handleChangeBefore = (val) => {
        this.setState({
            before: val,
            defSelect: val
        }, () => this.handleChangeUrl());
    }

    handleChangeUrl = () => {
        const { value, before } = this.state;

        if (!before) {
            console.info('Set before pls.');
            return;
        }

        const url = before + value;

        editComponentByGuid(
            this.props.guid,
            ['componentProps', 'url'],
            url
        );
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    /**
     * 获取输入款的前缀
     * @param def mapping 中的默认配置
     * @return {*}
     */
    getUrlBefore(def = {}) {
        const { editModelMapping } = this.props;
        const { defSelect } = this.state;

        if (!editModelMapping) {
            return null;
        }

        return (
            <Select
                onChange={this.handleChangeBefore}
                value={defSelect || def.name}
                style={{ width: 90 }}
            >
                {editModelMapping.map(item => (
                    <Option key={item.name} value={item.value}>{item.name}</Option>
                ))}
            </Select>
        )
    }

    render() {
        const { guid, editModelMapping } = this.props;
        const { value } = this.state;
        const mappingDefault = getMappingDefault(editModelMapping);
        const placeholder = mappingDefault && mappingDefault.defaultValue || '请输入链接地址';

        return (
            <div className="ec-editor-basic-props ec-editor-props-link">
                <label htmlFor="">跳转链接</label>
                <Input
                    data-guid={guid}
                    placeholder={placeholder}
                    value={value}
                    addonBefore={
                        this.getUrlBefore(mappingDefault)
                    }
                    onChange={this.handleChange}
                    onPressEnter={this.handleChangeUrl}
                />
            </div>
        )
    }
}

Link.defaultProps = {
    componentProps: {
        url: '',
    }
}

export default Link;
