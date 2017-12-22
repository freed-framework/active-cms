/**
 * @file Link.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { Input, Select } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';

const Option = Select.Option;

class ImgUrl extends PureComponent {
    constructor(props) {
        super(props);

        const { componentProps } = props;

        this.state = {
            // 跳转地址
            url: componentProps.url,

            // 跳转地址的前缀
            before: '',
        }
    }

    handleKeyUp = (event) => {
        if (event.keyCode !== 13) return false;
        const attr = event.currentTarget.getAttribute('data-attr');
        const value = event.currentTarget.value;

        this.setState({
            [attr]: value,
        });

        editComponentByGuid(
            this.props.guid,
            ['componentProps', attr],
            value
        );
    }

    handleChangeBefore = (val) => {
        this.setState({
            before: val,
        })
    }

    handleChangeUrl = (event) => {
        const attr = event.currentTarget.getAttribute('data-attr');
        const value = event.currentTarget.value;
        const before = this.state.before;
        const url = before + value;

        editComponentByGuid(
            this.props.guid,
            ['componentProps', attr],
            url
        );
    }

    /**
     * 获取 mapping 中的默认值
     * @return {*}
     */
    getMappingDefault() {
        const { topWrappedModule, editModelMapping } = this.props;

        if (!editModelMapping) {
            return null;
        }

        const mapping = editModelMapping[topWrappedModule];

        if (!mapping) {
            return null;
        }

        const def = mapping.filter(item => item.isDefault);

        return def.length === 1 ? def[0] : null;
    }

    /**
     * 获取输入款的前缀
     * @param def mapping 中的默认配置
     * @return {*}
     */
    getUrlBefore(def = {}) {
        const { topWrappedModule, editModelMapping } = this.props;

        if (!editModelMapping) {
            return null;
        }

        const mapping = editModelMapping[topWrappedModule];

        if (!mapping) {
            return null;
        }

        return (
            <Select
                onChange={this.handleChangeBefore}
                defaultValue={def.name}
                style={{ width: 90 }}
            >
                {mapping.map(item => (
                    <Option key={item.name} value={item.value}>{item.name}</Option>
                ))}
            </Select>
        )
    }

    render() {
        const { guid, componentProps = {} } = this.props;
        const mappingDefault = this.getMappingDefault();
        const placeholder = mappingDefault && mappingDefault.defaultValue || '请输入链接地址';

        return (
            <div className="ec-editor-basic-props ec-editor-props-link">
                <label htmlFor="">跳转链接</label>
                <Input
                    data-guid={guid}
                    data-attr="url"
                    placeholder={placeholder}
                    defaultValue={componentProps.url || ''}
                    addonBefore={
                        this.getUrlBefore(mappingDefault)
                    }
                    onPressEnter={this.handleChangeUrl}
                />
            </div>
        )
    }
}

ImgUrl.defaultProps = {
    componentProps: {
        url: '',
    }
}

export default ImgUrl;
