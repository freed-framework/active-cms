import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, InputNumber } from 'antd';
import { is } from 'immutable';
import { editComponentByType } from '../../../pages/editor/App';
import utils from '../../../../components/util/util';

function parseItem(oldArr, len, item) {
    const result = oldArr;

    for (let i = 0; i < len; i++) {
        result.push({...item, guid: `ec-module-${utils.guid()}`});
    }

    return result;
}

function getList(num, oldArr) {
    const item = {
        name: 'grid/hotImage'
    }
    const oldLen = oldArr.length;

    let rows = [];

    if (oldLen > num) {
        rows = oldArr.splice(0, num);
    } else {
        rows = parseItem(oldArr, num - oldLen, item)
    }

    return rows;
}

export default class GoodsNumber extends Component {
    static propTypes = {
        guid: PropTypes.string,
        attr: PropTypes.objectOf(PropTypes.any),
        target: PropTypes.string,
        childs: PropTypes.objectOf(PropTypes.any)
    }

    constructor(props) {
        super(props);

        this.childs = props.childs;

        this.state = {
            number: props.childs.length
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!is(this.props.childs, nextProps.childs)) {
            this.childs = nextProps.childs;
        }
    }

    handleChange = (value) => {
        const { guid, attr, target } = this.props;

        const rows = getList(value, this.childs)

        editComponentByType({guid, attr, target, value: rows}, 'children');
    }

    render() {
        const { number } = this.state;

        return (
            <div>
               <Row>
                    <Col span={24}>
                        <span>行</span>
                        <InputNumber
                            min={1}
                            max={100}
                            defaultValue={number}
                            onChange={this.handleChange}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
