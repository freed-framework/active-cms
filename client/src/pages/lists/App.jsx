/**
 * @file App.jsx
 * @author shijh
 *
 * 列表页面
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import Card from './Card';
import { listsPageByTitle, shareList, listsPage } from '../../server';
import { TopMenu } from '../../components';
import './app.scss';

class List extends Component {
    static propTypes = {
        match: PropTypes.objectOf(PropTypes.any),
        history: PropTypes.objectOf(PropTypes.any),
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
        this.getPageList({...this.params});
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

    getPageList = (param) => {
        const { match = {} } = this.props;
        const { params = {} } = match;
        const { type = '' } = params;
        let fetch = listsPageByTitle;
        if (type === 'share') {
            fetch = shareList;
        }
        else if (type === 'my') {
            fetch = listsPage;
        }
        fetch(param).then((res) => {
            this.setState({
                data: res.data
            })
        })
    }

    handleSearch = (value) => {
        const params = {
            page: 1,
            pageSize: this.params.pageSize,
            content: value
        }
        this.params = params;
        this.getPageList(this.params)
    }

    render() {
        const { data = {} } = this.state;
        const { lists = [], pageSize, page, total } = data;
        const { history } = this.props;
        return (
            <div>
                <TopMenu.List history={history} onSearch={this.handleSearch} />
                <div
                    className={'page-list-wrap'}
                >
                    {
                        lists.length === 0
                            ? <div className='page-list-empty'>暂无数据...</div>
                            : lists.map((item) => {
                                return <Card
                                    key={item._id}
                                    data={item.shareTime ? item.page : item}
                                    history={history}
                                    onFetchList={this.handleFetchList}
                                />
                            })
                    }
                </div>
                {
                    lists.length === 0 && page === '1'
                    ? null
                    : <div
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
                }
            </div>
        )
    }
}

export default List;
