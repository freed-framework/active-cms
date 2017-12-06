/**
 * @file App.jsx
 * @author shijh
 *
 * 列表页面
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Pagination, BackTop } from 'antd';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import ENV from '../../../../conf/env';

import Card from './Card';
import { listsPageByTitle, shareList, listsPage } from '../../services';
import { TopMenu } from '../../components';
import './app.scss';

window.user = {
    "_id": "59dae48589b19208c0947821",
    "userName": "22qwe7",
    "password": "12qwaszx",
    "userDspName": "huazaierli2",
    "phone": 18381333613,
    "email": "755836844@qq.com",
    "activity": true,
    "birthday": "2017-10-09T02:52:53.330Z",
    "sex": 1
}

// `${ENV.domain}`
const socket = io(`${ENV.domain}`, {
    path: '/push'
});

class List extends PureComponent {
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
        const { history } = this.props;

        this.unPage = history.listen(loc => {
            loc.pathname.replace(/\/lists\/(.*)/g, ($0, $1) => {
                this.getPageList({...this.params}, $1);
            })
        })

        this.getPageList({...this.params});
    }

    componentWillUnmount() {
        this.unPage();
    }

    onShowSizeChange = (page, pageSize) => {
        this.params = {
            page,
            pageSize
        }
        this.getPageList({...this.params})
    }

    getPageList = (param, page) => {
        const type = page || this.props.match.params.type;
        let fetch = listsPage;

        if (type === 'share') {
            fetch = shareList;
        } else if (type === 'publish') {
            fetch = listsPageByTitle;
        }

        this.setState({
            current: type || 'my'
        })

        fetch(param).then((res) => {
            this.setState({
                data: res.data
            })
        })
    }

    handleFetchList = () => {
        this.getPageList({...this.params})
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
        const { data = {}, current } = this.state;
        const { lists = [], pageSize, page, total } = data;
        const { history, match } = this.props;
        const searchReg = new RegExp(`${this.params.content}`, 'gim');

        return (
            <div>
                <TopMenu.List history={history} match={match} onSearch={this.handleSearch} />
                <div
                    className={'page-list-wrap'}
                >
                    {
                        lists.length === 0
                            ? <div className='page-list-empty'>暂无数据...</div>
                            : lists.map((item) => {
                                return <Card
                                    current={current}
                                    key={item._id}
                                    reg={searchReg}
                                    data={item.shareTime ? item.page : item}
                                    history={history}
                                    onFetchList={this.handleFetchList}
                                    socket={socket}
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
                <BackTop />
            </div>
        )
    }
}

export default withRouter(List);
