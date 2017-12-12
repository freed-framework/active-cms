/**
 * @file EditDataNumber.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import { is } from 'immutable';
import { editComponentByGuid } from '../../pages/editor/App';
import utils from '../../../components/util/util';

const getDefaultItem = () => ({
    id: utils.guid(),
});

const makeArray = (num) => {
    const arr = [];

    for(let i = 0; i < num; i ++) {
        arr.push(getDefaultItem())
    }

    return arr;
}

const assembleArray = (arr = [], toLen) => {
    const len = arr.length;

    if (toLen > len) {
        return arr.concat(makeArray(toLen - len));
    }

    else if (toLen < len) {
        arr.splice(len - 1, len - toLen);
        return arr;
    }

    return arr;
}

export default class EditDataNumber extends PureComponent {
    static propTypes = {
        guid: PropTypes.string,
        attr: PropTypes.objectOf(PropTypes.any),
        target: PropTypes.string,
    }

    constructor(props) {
        super(props);
        
        this.state = {
            number: 1,
        }

        this.arr = [];

        this.editComponent(this.state.number);
    }

    handleChange = (num) => {
        this.setState({
            number: num,
        });

        this.editComponent(num);
    }

    editComponent(num) {
        this.arr = assembleArray(Array.from(this.arr), num);

        editComponentByGuid(
            this.props.guid,
            ['componentProps', 'data'],
            this.arr
        )
    }

    render() {
        const { number } = this.state;

        return (
            <div>
                <span>数量</span>
                <InputNumber
                    min={1}
                    max={100}
                    defaultValue={number}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}
