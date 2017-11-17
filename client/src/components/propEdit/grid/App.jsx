import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import { Row, Col, InputNumber } from 'antd';
import utils from '../../../../components/util/util';
import { editComponentByType } from '../../../pages/editor/App';

/**
 * 格式化元素局
 *
 * @param {Array} childs 元数据数组
 */
function getDefaultDate(childs) {
    const result = { row: 0, col: 0, childrens: [], history: [] };

    result.row = childs.length;
    result.history = childs;

    if (result.row > 0) {
        result.col = childs[0].children.length;
    }

    for (let i = 0; i < childs.length; i++) {
        const children = childs[i].children;
        for (let j = 0; j < children.length; j++ ) {
            result.childrens.push(children[j]);
        }
    }

    return result;
}

/**
 * 
 * @param {Array} arr 元数组
 * @param {mubner | string} len 目标长度 
 * @param {Object} item 目标格式对象
 */
function getNewItem(arr, len, item) {
    const result = [];

    for (let i = 0; i < len; i++) {
        result.push({...item, guid: `ec-module-${utils.guid()}`});
    }

    return arr.concat(result);
}

/**
 * 获取列元素，扁平化
 *
 * @param {number | string} row 
 * @param {number | string} col 
 * @param {Array} oldArr 
 */
function getNewArray(row, col, oldArr) {
    const item = {
        name: 'grid/hotImage'
    }
    const oldLen = oldArr.length;
    const newLen = row * col;
    let newArr = [];

    if (oldLen > newLen) {
        newArr = oldArr.slice(0, newLen);
    }
    else {
        newArr = getNewItem(oldArr, newLen - oldLen, item)
    }

    return newArr;
}

/**
 * 获取行数据
 *
 * @param {sring | number} newRow 新行数
 * @param {sring | number} oldRow 旧行数
 * @param {Array} oldArr 元数组
 */
function getNewRows(newRow, oldRow, oldArr) {
    const item = {
        name: 'grid/row',
        children: []
    };
    let newArr = [];

    if (oldRow > newRow) {
        newArr = oldArr.slice(0, newRow);
    }
    else {
        newArr = getNewItem(oldArr, newRow - oldRow, item)
    }

    return newArr;
}

/**
 * 格式化行内元素
 *
 * @param {sring | number} rows 
 * @param {Array} childs
 * @param {sring | number} col 
 */
function getNewData(rows, childs, col) {
    const result = JSON.parse(JSON.stringify(rows));

    for (let i = 0; i < rows.length; i++) {
        const colArr = childs.slice(i * col, (i + 1) * col);

        result[i].children = colArr;
    }

    return result;
}

export default class Grid extends PureComponent {
    static propTypes = {
        label: PropTypes.string,
        childs: PropTypes.arrayOf(PropTypes.any),
    }

    constructor(props) {
        super(props);

        this.oldData = getDefaultDate(props.childs)

        this.state = {
            ...this.oldData
        }
    }

    componentWillReceiveProps(nextProps) {
        // 每次修改了元数据跟新
        if (!is(this.props.childs, nextProps.childs)) {
            this.oldData = getDefaultDate(nextProps.childs)
        }
    }

    handleChange1 = (value) => {
        this.setState({
            row: value
        }, () => {
            this.parseGrid();
        })
    }

    handleChange2 = (value) => {
        this.setState({
            col: value
        }, () => {
            this.parseGrid();
        })
    }

    parseGrid = () => {
        const { row, col } = this.state;
        const { childrens, history } = this.oldData;
        const { guid, attr, target } = this.props;

        let rows = [];

        // 所有列元素
        const newChildrens = getNewArray(row, col, childrens);

        // 新行元素
        const newRows = getNewRows(row, this.oldData.row, history);

        // 构建出新数据
        rows = getNewData(newRows, newChildrens, col);

        editComponentByType({guid, attr, target, value: rows}, 'children');
    }

    render() {
        const { label = '', childs } = this.props;
        const { row, col } = this.state;

        return (
            <div>
                <div>{label}</div>
                <Row>
                    <Col span={12}>
                        <span>行</span>
                        <InputNumber
                            min={1}
                            max={10}
                            defaultValue={row}
                            onChange={this.handleChange1}
                        />
                    </Col>
                    <Col span={12}>
                        <span>列</span>
                        <InputNumber
                            min={1}
                            max={10}
                            defaultValue={col}
                            onChange={this.handleChange2}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
