/**
 * @file App
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import moment from 'moment';
import { DatePicker, Row, Col, Icon } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';
import './app.scss';

const { RangePicker } = DatePicker;
const format = 'YYYY-MM-DD HH:mm';

const DateFront = (props) => {
    const type = props.type;

    switch (type) {
        case 1: 
            return <Icon type="check-circle-o" />;
        case 0: 
            return <Icon type="close-circle" />;
        default:
            return null;
    }
}

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.start = null;
        this.end = null;
    }

    handleChangeDate = (dates) => {
        const data = dates.length === 0 ? null : [
            +new Date(dates[0]),
            +new Date(dates[1])
        ];

        editComponentByGuid(
            this.props.guid,
            ['componentProps', 'termDates'],
            data,
        )
    }

    getRange() {
        const { componentProps = {} } = this.props;
        const range = componentProps.termDates;

        let defaultValue = [];
        // -1: 未设置
        // 0: 已经过期
        // 1: 未过期
        let rangeType = -1;

        if (range) {
            const s = new Date(range[0]);
            const e = new Date(range[1]);
            const n = +new Date();

            defaultValue = [moment(s), moment(e)];
            
            rangeType = n >= +s && n <= +e ? 1 : 0;
        }

        return {
            type: rangeType,
            date: defaultValue,
        }
    }

    render() {
        const rangeInfo = this.getRange();

        return (
            <div className="ec-editor-props ec-editor-range-type">
                <Row>
                    <Col span={24}>
                        <label>
                            生效设置 <DateFront type={rangeInfo.type} />
                        </label>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <RangePicker
                        allowClear
                        defaultValue={rangeInfo.date}
                        showTime={{
                            format: 'HH:mm'
                        }}
                        format={format}
                        placeholder={['开始时间', '结束时间']}
                        onChange={this.handleChangeDate}
                    />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default App;
