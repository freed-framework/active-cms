import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, InputNumber } from 'antd';
import utils from '../../../../components/util/util';
import { editComponentByType } from '../../../pages/editor/App';

export default class Grid extends Component {
    static propTypes = {
        label: PropTypes.string,
        childs: PropTypes.arrayOf(PropTypes.any),
    }

    constructor(props) {
        super(props);

        this.state = {
            row: 1,
            col: 1
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
        const { guid, attr, target } = this.props;
        let rows = [];

        // for (let i = 0; i < row; i++) {
            let cols = [];

            for (let j = 0; j < col; j++) {
                cols.push({
                    guid: `ec-module-${utils.guid()}`,
                    name: 'hotImage'
                })
            }

            rows.push(cols);
        // }

        editComponentByType({guid, attr, target, value: cols}, 'children');
    }

    render() {
        const { label = '', childs } = this.props;

        return (
            <div>
                <div>{label}</div>
                <Row>
                    <Col span={12}>
                        <span>行</span>
                        <InputNumber
                            min={1}
                            onChange={this.handleChange1}
                        />
                    </Col>
                    <Col span={12}>
                        <span>列</span>
                        <InputNumber
                            min={1}
                            onChange={this.handleChange2}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
