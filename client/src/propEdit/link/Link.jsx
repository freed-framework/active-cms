/**
 * @file Link.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { Input, Select } from 'antd';
import { is, fromJS } from 'immutable';
import { editComponentByGuid } from '../../pages/editor/App';

const Option = Select.Option;

function parseUrl(url) {
    const hy = /^((hybrid):\/\/.*id=)(.*)$/ig;
    const res = hy.exec(url);
    const hy2 = /^((detail)\/index\.html\?id=)(.*)$/ig;
    const res2 = hy2.exec(url);
    const hy3 = /^((activityPage)\/index\.html\?id=)(.*)$/ig;
    const res3 = hy3.exec(url);

    if (res) {
        return res;
    }

    if (res2) {
        return res2;
    }

    if (res3) {
        return res3;
    }

    return ''
}

class ImgUrl extends PureComponent {
    constructor(props) {
        super(props);

        const { componentProps } = props;

        let url = [];
        if (!componentProps.url) {
            const getDef = this.getMappingDefault() || {};
            url = ['', getDef.value, getDef.name, '']
        } else {
            url = parseUrl(componentProps.url || '');
        }

        this.state = {
            // 跳转地址
            url: componentProps.url,

            // 跳转地址的前缀
            before: url[1],

            // 默认选中项
            defSelect: url[2],

            // 表单值
            value: url[3],

        }
    }

    componentWillReceiveProps(nextProps) {
        if (!is(fromJS(this.props.componentProps.url), fromJS(nextProps.componentProps.url))) {
            let url = [];

            if (!nextProps.componentProps.url) {
                const getDef = this.getMappingDefault() || {};
                url = ['', getDef.value, getDef.name, '']
            } else {
                url = parseUrl(nextProps.componentProps.url || '');
            }

            this.setState({
                // 跳转地址的前缀
                before: url[1],

                // 默认选中项
                defSelect: url[2],

                // 表单值
                value: url[3],

            })
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
            defSelect: val
        })
    }

    handleChangeUrl = (event) => {
        const attr = event.currentTarget.getAttribute('data-attr');
        const value = event.currentTarget.value;
        const before = this.state.before;

        const url = before + value;
console.log(url)
        editComponentByGuid(
            this.props.guid,
            ['componentProps', attr],
            url
        );
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
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

        const mapping = editModelMapping;

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
        const { defSelect } = this.state;

        if (!editModelMapping) {
            return null;
        }

        const mapping = editModelMapping;

        if (!mapping) {
            return null;
        }

        return (
            <Select
                onChange={this.handleChangeBefore}
                value={defSelect || def.name}
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
        const { value } = this.state;

        const mappingDefault = this.getMappingDefault();
        const placeholder = mappingDefault && mappingDefault.defaultValue || '请输入链接地址';

        return (
            <div className="ec-editor-basic-props ec-editor-props-link">
                <label htmlFor="">跳转链接</label>
                <Input
                    data-guid={guid}
                    data-attr="url"
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

ImgUrl.defaultProps = {
    componentProps: {
        url: '',
    }
}

export default ImgUrl;
