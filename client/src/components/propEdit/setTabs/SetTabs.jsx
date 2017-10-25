/**
 * @file App
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { editComponent } from '../../../pages/editor/App';

const getItems = (arr) => {
    return arr.map(k => ({
        key: k,
        title: 'Title',
        content: 'Content',
    }))
}

const setItem = (arr, key) => {

}

class SetTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arr: getItems(['key1', 'key2']),

            value: 1,
        }
    }

    handleChangeNum = (event) => {
        const value = event.currentTarget.value;

        this.setState({
            value,
        })
    }

    handleChangeContent = (event) => {
        const key = event.currentTarget.getAttribute('tabs-key');
        const v = event.currentTarget.value;

        console.log(key);

        // this.setState
    }

    render() {
        console.log(this.props)
        const { arr, value } = this.state;
        const { guid } = this.props;

        return (
            <div>
                <input
                    data-guid={guid}
                    value={value}
                    onChange={this.handleChangeNum}
                />
            </div>
        );
    }
}

export default SetTabs;
