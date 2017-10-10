import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Select, Input, Row, Col, Icon } from 'antd';
import { editComponentByOption } from '../../pages/editor/App';

const Option = Select.Option;

class RadioChoose extends Component {
    static propTypes = {

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
            editComponentByOption({guid, attr: compKey, target, value: newState}, 'attr');
        })
    }

    render() {
        const { label = '', items } = this.props;
        const { data = {} } = this.state;

        return (
            <div>
                <div className="as-editor-basic-props as-editor-basic-props-radio">
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
