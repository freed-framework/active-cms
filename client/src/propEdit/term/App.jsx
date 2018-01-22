/**
 * @file App
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';
import './app.scss';

const { RangePicker } = DatePicker;

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
        return (
            <RangePicker
                allowClear
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['开始时间', '结束时间']}
                onChange={this.handleChangeDate}
            />
        )
    }
}

export default App;
