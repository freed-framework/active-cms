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

const urlMapping = {
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

const matchers = {
    hybrid: /^((hybrid):\/\/.*id=)(.*)$/ig,
    detail: /^((detail)\/index\.html\?id=)(.*)$/ig,
    activityPage: /^((activityPage)\/index\.html\?id=)(.*)$/ig,
    http: /^((https?):\/\/)(.+)$/ig,
};

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
 * 获取要更新的 state 数据
 * @return {*}
 */
const getUpdateState = (url, key) => {
    // url 没有任何值
    if (!url) {
        const getDef = getDefault(key) || {};

        return {
            before: getDef.name,
            value: '',
        }
    }

    const urlArr = parseUrl(url);

    return {
        // 跳转地址的前缀
        before: urlArr[1] || 'others',

        // 默认选中项
        // defSelect: urlArr[2] || getDef.name,

        // 表单值
        value: urlArr[3] || '',
    }
}

class Link extends PureComponent {
    constructor(props) {
        super(props);

        const { componentProps, topWrappedModule } = props;
        const values = getUpdateState(componentProps.url, topWrappedModule);

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
                <Option key="others" value="">Others</Option>
            </Select>
        )
    }

    render() {
        const { guid } = this.props;
        const placeholder = '请输入链接地址';

        return (
            <div className="ec-editor-basic-props ec-editor-props-link">
                <label htmlFor="">跳转链接</label>
                <Input
                    data-guid={guid}
                    placeholder={placeholder}
                    value={this.state.value}
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
