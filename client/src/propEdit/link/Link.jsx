/**
 * @file Link.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { is, fromJS } from 'immutable';
import { Input, Select, message } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';

const Option = Select.Option;

const urlMapping = {
    // 顶层组件为 list 的话，url 使用 detail 作为默认值
    'mobile/list': ['detail'],
}

/**
 * 针对于编辑模式的配置, 与 topWrappedModule 对应
 */
const urlBefore = [
    {
        name: 'http',
        value: 'http://',
        defaultValue: '请输入链接',
    },
    {
        name: 'https',
        value: 'https://',
        defaultValue: '请输入链接',
    },
    {
        name: 'detail',
        value: 'detail/index.html?id=',
        defaultValue: '请输入id',
        ch: '详情'
    },
    {
        name: 'hybrid',
        value: 'hybrid://100/detail?id=',
        defaultValue: '请输入id',
        ch: '应用'
    },
    {
        name: 'activityPage',
        value: 'activityPage/index.html?id=',
        defaultValue: '请输入id',
        ch: '活动'
    },
    {
        name: 'others',
        value: '',
        defaultValue: '请输入跳转地址',
        ch: '其他'
    },
];

/**
 * 查找默认选项
 * @param key topWrappedModule
 * @return null, undefined, Object
 */
const getDefault = (key) => {
    const arr = urlMapping[key];
    let def = null;

    if (arr) {
        def = urlBefore.find(item => arr.indexOf(item.name) !== -1);
    }

    return def;
}

const matchers = [
    // hybrid
    /^((hybrid):\/\/.*id=)(.*)$/ig,
    // detail
    /^((detail)\/index\.html\?id=)(.*)$/ig,
    // activityPage
    /^((activityPage)\/index\.html\?id=)(.*)$/ig,
    // http
    /^((https?):\/\/)(.+)$/ig,
];

/**
 * 将 url 字符串根据相应的规则修改为数组
 * @param url
 * @return {Array}
 */
function parseUrl(url = '') {
    let expr = null;
    matchers.forEach(v => {
        const match = new RegExp(v).exec(url);

        if (match) {
            expr = match;
        }
    });

    return expr === null ? [] : expr;
}

/**
 * 获取要更新的 state 数据
 * @return {*}
 */
const getUpdateSettings = (url, key) => {
    const getDef = getDefault(key) || {};

    // url 没有任何值
    if (!url) {
        return {
            before: getDef.value,
            value: '',
            placeholder: getDef.defaultValue,
        }
    }

    const urlArr = parseUrl(url);
    const name = urlArr[2] || 'others';
    const finder = urlBefore.find(item => item.name === name);

    return {
        // 跳转地址的前缀
        before: urlArr[1] || '',

        // 默认选中项
        name,

        // 表单值
        value: urlArr[3] || '',

        placeholder: finder && finder.defaultValue ? finder.defaultValue : '',
    }
}

class Link extends PureComponent {
    constructor(props) {
        super(props);

        const { componentProps, topWrappedModule } = props;
        const values = getUpdateSettings(componentProps.url, topWrappedModule);

        this.state = {
            value: values.value,
        }

        this.settings = {
            ...values,
        }
    }

    handleChangeBefore = (val) => {
        this.settings.before = val;

        this.handleChangeUrl();
    }

    handleChangeUrl = () => {
        const { value } = this.state;
        const { before } = this.settings;

        if (before === undefined) {
            message.error('请选择链接前缀');
            return;
        }

        const url = this.settings.before + value;

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
    getUrlBefore() {
        const { before } = this.settings;

        return (
            <Select
                onChange={this.handleChangeBefore}
                value={before}
                style={{ width: 90 }}
            >
                {urlBefore.map(item => (
                    <Option key={item.name} value={item.value}>{item.name}</Option>
                ))}
            </Select>
        )
    }

    render() {
        const { guid, topWrappedModule, componentProps } = this.props;
        const { value } = this.state;
        const { placeholder } = this.settings;

        return (
            <div className="ec-editor-basic-props ec-editor-props-link">
                <label htmlFor="">跳转链接</label>
                <Input
                    data-guid={guid}
                    placeholder={placeholder}
                    value={value}
                    addonBefore={
                        this.getUrlBefore()
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
