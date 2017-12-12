/**
 * @file App
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';
import './setTabs.scss';

/**
 * 获取每一个 Tab 的展示数据
 * @param key
 * @param options
 */
const getItem = (key, options = { title: 'Title', content: 'Content' }) => ({
    key: key.toString(),
    title: options.title,
    content: options.content,
});

/**
 * 获取编辑框的默认显示
 * @param data
 * @return {Array}
 */
const getDefaultByData = (data) => {
    const arr = [];

    data.forEach(d => {
        arr.push(getItem(d.key, d))
    });

    return arr;
}

class SetTabs extends PureComponent {
    static defaultProps = {
        dataTrans: {
            data: [],
        }
    }

    constructor(props) {
        super(props);

        const arr = getDefaultByData(props.dataTrans.data);

        this.state = {
            num: arr.length,
            arr,
        }
    }

    /**
     * 修改 TabPane 的数量
     * @param event
     */
    handleChangeTabNumber = (event) => {
        const type = event.currentTarget.getAttribute('data-name');
        const arr = Array.from(this.state.arr);

        // 增加数量
        if (type === '+') {
            arr.push(getItem(arr.length));
        }

        // 减少数量
        else if (type === '-') {
            arr.pop();
        }

        this.setState({
            num: arr.length,
            arr,
        }, () => this.editMitt());
    }

    /**
     * 修改 Tab
     * @param event
     */
    handleChangeTabValue = (event) => {
        const target = event.currentTarget;
        const i = target.getAttribute('data-index');
        const name = target.name;
        const v = target.value;
        const arr = Array.from(this.state.arr);

        arr[i][name] = v;

        this.setState({
            arr,
        }, () => this.editMitt());
    }

    editMitt() {
        editComponentByGuid(
            this.props.guid,
            ['dataTrans', 'data'],
            this.state.arr,
        )
    }

    render() {
        const { arr, num } = this.state;

        return (
            <div className="ec-editor-set-tabs">
                <div>
                    <span
                        data-name="-"
                        onClick={this.handleChangeTabNumber}
                    >
                        <Icon type="minus-square" />
                    </span>
                    <span>{num}</span>
                    <span
                        data-name="+"
                        onClick={this.handleChangeTabNumber}
                    >
                        <Icon type="plus-square" />
                    </span>
                </div>

                {arr && arr.map((item, index) => (
                    <div
                        key={index}
                        className="ec-editor-set-tabs-items"
                    >
                        <input
                            data-index={index}
                            type="text"
                            name="title"
                            value={item.title}
                            onChange={this.handleChangeTabValue}
                        />
                        <input
                            data-index={index}
                            type="text"
                            name="content"
                            value={item.content}
                            onChange={this.handleChangeTabValue}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default SetTabs;
