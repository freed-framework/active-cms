/**
 * @file Card.jsx
 * @author shijh
 *
 * 卡片组件
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Font from 'font';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import { Modal, Input, Select, message, Progress, Spin } from 'antd';
import { Observable } from 'rxjs';

import { deletePage, forkPage, fetchAllUsers, sharePage, publishPage, push } from '../../services';
import { getUser } from '../../actions/user';

const confirm = Modal.confirm;

const Option = Select.Option;

function formNowFun(time) {
    return moment(time).locale('zh-cn').fromNow()
}


@connect(
    state => ({
        user: state.toJS().user.data,
    }),
    dispatch => bindActionCreators({
        getUser
    }, dispatch)
)
export default class componentName extends PureComponent {
    static propTypes = {
        data: PropTypes.objectOf(PropTypes.any).isRequired,
        history: PropTypes.objectOf(PropTypes.any),
        onFetchList: PropTypes.func,
        current: PropTypes.string,
        reg: PropTypes.objectOf(PropTypes.any),
        socket: PropTypes.objectOf(PropTypes.any),
        user: PropTypes.objectOf(PropTypes.any)
    }

    constructor(props) {
        super(props);
        this.users = [];

        const { forkTime = '', createTime = '', fork } = props.data;
        const oldTime = fork ? forkTime : createTime;

        this.state = {
            formNow: formNowFun(oldTime),
            progress: 0,
            isPushing: false
        }
    }

    componentDidMount() {
        const { socket } = this.props;
        const { forkTime = '', createTime = '', fork, _id } = this.props.data;
        const oldTime = fork ? forkTime : createTime;

        this.timer = Observable.interval(1000).subscribe(() => {
            this.setState({
                formNow: formNowFun(oldTime)
            })
        })

        socket.on(`push:progress:${_id}`, (res) => {
            const { progress, code } = res;
            this.setState({
                progress,
                isPushing: !(code === 500 || progress === 100)
            }, () => {
                if (code === 500) {
                    message.success('推送失败');
                }
                if (progress === 100) {
                    message.success('推送成功');
                }
            })
        })

        socket.on('disconnect', () => {
            if (!this.state.isPushing) return;
            this.setState({
                progress: 0,
                isPushing: false
            }, () => {
                message.success('推送失败');
            })
        });
    }

    componentWillUnmount() {
        // 取消事件监听
        this.timer.unsubscribe();
    }

    /**
     * 显示确认弹出框
     *
     * @param {Function} callback 回调函数
     * @param {string} defaultValue 默认数据
     */
    showConfirm = (callback, defaultValue) => {
        confirm({
            title: '请输入页面标题',
            content: <Input onChange={this.handleChange} defaultValue={defaultValue} />,
            onOk: callback,
            onCancel() {},
        });
    }

    /**
     * title值改变
     *
     * @param {Element} e react事件对象
     */
    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    /**
     * 跳转到编辑页面
     */
    handleEdit = () => {
        const { data = {} } = this.props;
        this.props.history.push(`/${data.pageType}/edit/${data._id}`);
    }

    /**
     * 跳转到预览页面
     */
    handleView = () => {
        const { data = {} } = this.props;
        window.open(`/view/${data._id}`);
    }

    /**
     * 删除确认
     */
    handleDelete = () => {
        const { data = {} } = this.props;
        confirm({
            title: '提示',
            content: '确认删除？',
            onOk: () => {
                deletePage(data._id)
                    .then(() => {
                        this.props.onFetchList()
                    })
                    .catch(() => {
                        message.error('删除页面失败')
                    })
            },
            onCancel() {},
        });
    }

    /**
     * fork页面
     */
    handleFork = () => {
        const { data = {} } = this.props;
        this.showConfirm(() => {
            const { title } = this.state;
            forkPage({
                id: data._id,
                title
            }).then(() => {
                this.props.onFetchList()
            })
        }, data.title);
    }

    /**
     * 人员选择
     */
    handleUserChange = (users) => {
        this.users = users;
    }

    /**
     * 分享页面
     */
    handleShareOk = (users) => {
        const { data = {} } = this.props;
        const pageId = data._id;
        const shareData = this.users.map(item => {
            for (let i = 0; i < users.length; i++) {
                if (item === users[i].userDspName) {
                    return {
                        pageId,
                        userId: users[i]._id
                    };
                }
            }
        })
        if (!shareData.length) {
            message.error('请选择用户');
            return false;
        }

        sharePage({ users: shareData }).then(() => {
            message.success('分享成功')
        })
    }

    /**
     * 确认分享弹出框
     */
    handleShare = () => {
        fetchAllUsers().then(res => {
            confirm({
                title: '请选择要分享的人',
                content: this.renderSelect(res.data),
                onOk: () => this.handleShareOk(res.data),
                onCancel() {},
            });
        })
    }

    /**
     * 发布/取消发布页面
     */
    handleUpload = () => {
        const { data = {} } = this.props;
        confirm({
            title: `确认${data.publish ? '取消发布' : '发布页面'}？`,
            content: `${data.publish ? '取消发布其他人将不可见（被分享的人除外）!' : '发布后所有人都可以看到你的页面！'}`,
            onOk: () => {
                publishPage({id: data._id, type: !data.publish })
                    .then(() => {
                        this.props.onFetchList()
                    })
                    .catch(() => {
                        message.error(`${data.publish ? '取消发布' : '发布页面'}失败`)
                    })
            },
            onCancel() {},
        });
    }

    renderSelect = (users) => {
        return (
            <Select
                showSearch
                mode="multiple"
                placeholder="请选择需要分享的人"
                onChange={this.handleUserChange}
                style={{ width: '100%' }}
            >
                {
                    users.map((item) => {
                        return (
                            <Option key={item.userDspName} item={item}>{item.userDspName}</Option>
                        )
                    })
                }
            </Select>
        )
    }

    handlePush = () => {
        const { data = {}, socket, user } = this.props;
        confirm({
            title: '确认推送页面？',
            content: '',
            onOk: () => {
                this.setState({
                    isPushing: true
                })
                push({
                    id: data._id,
                    zipId: data.pushId,
                    activityName: data.title
                }).then(() => {
                    this.props.onFetchList()
                })
                .catch(() => {
                })
            },
            onCancel() {},
        });
    }

    render() {
        const { data = {}, current, reg, user } = this.props;
        const { formNow, progress, isPushing } = this.state;
        const isOwer = user._id === data.owerUser._id;

        return (
            <div
                className={classnames(
                    'page-list-card', {
                        'page-list-card-publish': data.publish,
                        'page-list-card-isFork': data.fork,
                        'page-list-card-pushed': data.pushId
                    })
                }
                key={data._id}
            >
                <div
                    className='page-list-card-imgWrap'
                >
                    <img
                        className={'page-list-card-img'}
                        src="http://pic.qiantucdn.com/58pic/17/07/56/86C58PICqiF.jpg"
                    />

                    <div
                        className={
                            classnames('page-list-card-pendant', {
                                'page-list-card-pendant-fork': data.fork
                            })
                        }
                    >
                        <span className={'page-list-card-user'}>{`作者：${user.userDspName}`}</span>
                        <span className={'page-list-card-type'}>{data.fork ? '非' : '原'}</span>
                    </div>
                </div>
                <div className={'page-list-card-button'}>
                    <p
                        className={'page-list-card-title'}
                    >
                        <span
                            className={'page-list-card-title-left'}
                            title={data.title}
                            onClick={this.handleView}
                            dangerouslySetInnerHTML={{
                                __html: data.title.replace(reg, ($0) => {
                                    return `<span class="page-list-card-search-text">${$0}</span>`
                                })
                            }}
                        />
                        <span>{data.pushId || '未发布'}</span>
                        <span className={'page-list-card-title-right'}>
                            {
                                formNow
                            }
                        </span>
                    </p>
                    <div>
                        <ul className="page-list-card-button-wrap">
                            <li
                                className="page-list-card-icon page-list-card-icon-hover"
                                onClick={this.handleFork}
                            >
                                <Font type="streetsign" />
                                <span className="page-list-card-text">{data.forkNum}</span>
                            </li>
                            {
                                isOwer &&
                                <li
                                    className="page-list-card-icon page-list-card-icon-hover"
                                    onClick={this.handleEdit}
                                >
                                    <Font type="clipboard-edit" />
                                    <span className="page-list-card-text">编辑</span>
                                </li>
                            }
                            <li
                                className="page-list-card-icon page-list-card-icon-hover"
                                onClick={this.handleView}
                            >
                                <Font type="eye" />
                                <span className="page-list-card-text">预览</span>
                            </li>
                            {
                                isOwer &&
                                <li
                                    className="page-list-card-icon page-list-card-icon-hover"
                                    onClick={this.handleDelete}
                                >
                                    <Font type="trash-can" />
                                    <span className="page-list-card-text">删除</span>
                                </li>
                            }
                            {
                                isOwer &&
                                <li
                                    className="page-list-card-icon page-list-card-icon-hover"
                                    onClick={this.handleShare}
                                >
                                    <Font type="move" />
                                    <span className="page-list-card-text">分享</span>
                                </li>
                            }
                            {/* {
                                current !== 'publish' && isOwer &&
                                <li
                                    className="page-list-card-icon page-list-card-icon-hover"
                                    onClick={this.handleUpload}
                                >
                                    <Font type={data.publish ? 'clipboard-download' : 'clipboard-upload'} />
                                    <span className="page-list-card-text">{data.publish ? '撤回' : '公开'}</span>
                                </li>
                            } */}
                            {
                                current !== 'publish' && isOwer &&
                                <li
                                    className="page-list-card-icon page-list-card-icon-hover"
                                    onClick={this.handlePush}
                                >
                                    {
                                        isPushing
                                        ? <Spin size="small" />
                                        : <Font type={'clipboard-upload'} />
                                    }
                                    <span className="page-list-card-text">{
                                        !isPushing
                                        ? '发布'
                                        : '发布中...'
                                    }</span>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                {
                    progress !== 0 && progress !== 100
                    ? <div className="page-list-card-progress">
                        <Progress percent={progress} strokeWidth={5} status="active" showInfo={false} />
                    </div>
                    : null
                }
            </div>
        )
    }
}
