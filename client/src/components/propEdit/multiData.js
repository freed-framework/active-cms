/**
 * @file chooseData.js
 * @author shijh
 *
 * 选择数据设置
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Input, Row, Col, Icon } from 'antd';
import { editComponentByType } from '../../pages/editor/App';

const Option = Select.Option;

class RadioChoose extends Component {
    static propTypes = {
        target: PropTypes.string,
        guid: PropTypes.string,
        compKey: PropTypes.string,
        attribute: PropTypes.objectOf(PropTypes.any),
        items: PropTypes.objectOf(PropTypes.any),
        label: PropTypes.string,
    }

    constructor(props) {
        super(props);
        const { attribute = {}, compKey, items } = props;
        this.state = {
            data: attribute[compKey] || {
                key: items[0].key,
                value: 0
            }
        }
    }

    handleChange = (param) => {
        const { target, guid, compKey } = this.props;
        const newState = param;

        this.setState({
            data: newState
        }, () => {
            editComponentByType({guid, attr: compKey, target, value: newState}, 'attr');
        })
    }

    render() {
        const { label = '', items } = this.props;
        const { data = {} } = this.state;

        return (
            <div>
                <div className="ec-editor-basic-props ec-editor-basic-props-radio">
                    <Row>
                        <Col span={8}>
                            <label htmlFor="">{label}</label>
                        </Col>
                        <Col span={8}>
                            <Select
                                style={{ width: 80 }}
                                defaultValue={data['key'] || items[0].key}
                                onChange={(key) => this.handleChange({key, value: data.value})}
                            >
                                {
                                    items.map(i => {
                                        return <Option key={i.key} value={i.key}>{i.label}</Option>
                                    })
                                }
                            </Select>
                        </Col>
                        <Col span={8}>
                            <Input
                                onChange={(e) => this.handleChange({key: data.key, value: e.target.value})}
                                defaultValue={data['value']}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default RadioChoose;
