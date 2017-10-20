import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import { editComponent, editComponentByType } from '../../../pages/editor/App';

const RadioGroup = Radio.Group;

class RadioChoose extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        }
    }

    handleChange = (e) => {
        const { value } = e.target;
        const { target, guid, compKey } = this.props;
        editComponentByType({guid, attr: compKey, target, value}, 'attr');
    }

    render() {
        const { label = '', data } = this.props;
        return (
            <div>
                {/* <div>{target}</div> */}
                <div className="ec-editor-basic-props ec-editor-basic-props-radio">
                    <label htmlFor="">{label}</label>
                    <RadioGroup
                        name="radiogroup"
                        defaultValue={data[0].key}
                        onChange={this.handleChange}
                    >
                        {
                            data.map(item => {
                                return <Radio key={item.key} value={item.key}>{item.label}</Radio>
                            })
                        }
                    </RadioGroup>
                    {/* <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="src"
                        onChange={this.handleChange}
                        value={this.state.src}
                    /> */}
                </div>
            </div>
        )
    }
}

export default RadioChoose;
