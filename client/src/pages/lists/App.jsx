/**
 * @file App.jsx
 * @author shijh
 *
 * 页面预览页面
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import Card from './Card';
import { listsPage } from '../../server';
import { TopMenu } from '../../components';
import './app.scss';

class List extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this.params = {
            pageSize: 20,
            page: 1
        }
    }

    componentDidMount() {
        this.getPageList({...this.params})
    }

    onShowSizeChange = (page, pageSize) => {
        this.params = {
            page,
            pageSize
        }
        this.getPageList({...this.params})
    }

    handleFetchList = () => {
        this.getPageList({...this.params})
    }

    getPageList(params) {
        listsPage(params).then((res) => {
            this.setState({
                data: res.data
            })
        })
    }

    render() {
        const { data = {} } = this.state;
        const { lists = [], pageSize, page, total } = data;
        const { history } = this.props;
        return (
            <div>
                <TopMenu.List history={history} />
                <div
                    className={'page-list-wrap'}
                >
                    {
                        lists.map((item) => {
                            return <Card
                                key={item._id}
                                data={item}
                                history={history}
                                onFetchList={this.handleFetchList}
                            />
                        })
                    }
                </div>
                <div
                    className={'page-list-pagin'}
                >
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        onChange={this.onShowSizeChange}
                        onShowSizeChange={this.onShowSizeChange}
                        pageSize={parseInt(pageSize, 10)}
                        current={parseInt(page, 10)}
                        total={total}
                    />
                </div>
            </div>
        )
    }
}

export default List;
