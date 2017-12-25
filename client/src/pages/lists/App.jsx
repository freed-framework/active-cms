/**
 * @file App.jsx
 * @author shijh
 *
 * 列表页面
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Pagination, BackTop, Input, Select, Radio } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import { getUser } from '../../actions/user';
import Card from './Card';
import { listsPageByTitle, shareList, listsPage } from '../../services';
import { TopMenu } from '../../components';
const Search = Input.Search;
const Option = Select.Option;

import './app.scss';

const socket = io(`${config.domain}`, {
    path: '/push'
});

const routes = {
    pulish: '/lists/publish',
    my: '/lists/my',
    share: '/lists/share'
}

@connect(
    state => ({
        user: state.toJS().user.data,
    }),
    dispatch => bindActionCreators({
        getUser
    }, dispatch)
)
class List extends PureComponent {
    static propTypes = {
        match: PropTypes.objectOf(PropTypes.any),
        history: PropTypes.objectOf(PropTypes.any),
        getUser: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            current: 'my'
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
        this.setCurrent();
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

    setCurrent = () => {
        const { match } = this.props;
        const { params } = match;
        const { type = '' } = params;

        switch (type) {
            case 'publish':
                this.setState({
                    current: 'pulish'
                })
                break;
            case 'my':
            case '':
                this.setState({
                    current: 'my'
                })
                break;
            case 'share':
                this.setState({
                    current: 'share'
                })
                break;
            default:
                break;
        }
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

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            current: value
        }, () => {
            this.props.history.push(routes[value])
        })
    }

    render() {
        const { data = {}, current } = this.state;
        const { lists = [], pageSize, page, total } = data;
        const { history, match } = this.props;
        const searchReg = new RegExp(`${this.params.content}`, 'gim');

        return (
            <div>
                <TopMenu.List history={history} match={match} onSearch={this.handleSearch} />
                <div className="page-list-handleRegion">
                    <Search
                        className="page-list-handleRegion-left"
                        style={current === 'share' ? { width: 200, 'display': 'none' } : { width: 200 }}
                        placeholder="搜索标题"
                        onSearch={this.handleSearch}
                    />
                    <Radio.Group className="page-list-handleRegion-right" value={current} onChange={this.handleChange}>
                        <Radio.Button value="my">我的页面</Radio.Button>
                        {/* <Radio.Button value="pulish">所有公开页面</Radio.Button> */}
                        <Radio.Button value="share">分享给我的页面</Radio.Button>
                    </Radio.Group>
                </div>
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
