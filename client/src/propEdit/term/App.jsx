/**
 * @file App
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import moment from 'moment';
import { DatePicker, Row, Col } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';
import './app.scss';

const { RangePicker } = DatePicker;
const format = 'YYYY-MM-DD HH:mm';

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

    render() {
        const { componentProps = {} } = this.props;
        const range = componentProps.termDates;
        let defaultValue = [];
        if (range) {
            defaultValue = [
                moment(new Date(range[0])),
                moment(new Date(range[1]))
            ];
        }

        return (
            <div className="ec-editor-props">
                <Row>
                    <Col span={24}>
                        <label>生效设置</label>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <RangePicker
                        allowClear
                        defaultValue={defaultValue}
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
