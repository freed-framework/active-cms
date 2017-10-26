/**
 * @file App
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { editComponentByGuid } from '../../../pages/editor/App';
import './setTabs.scss';

const getItem = (key) => ({
    key,
    title: 'Title',
    content: 'Content',
});

class SetTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            num: 1,
            arr: [getItem(0)],
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
        editComponentByGuid(this.props.guid, {
            target: null,
            attr: 'dataTrans',
            value: this.state.arr,
        })
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
                        -
                    </span>
                    <span>{num}</span>
                    <span
                        data-name="+"
                        onClick={this.handleChangeTabNumber}
                    >
                        +
                    </span>
                </div>

                {arr && arr.map((item, index) => (
                    <div className="ec-editor-set-tabs-items">
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
