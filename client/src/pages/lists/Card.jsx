import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Font from 'font';
import classnames from 'classnames';
import moment from 'moment';
import { Modal, Input, Select, message } from 'antd';

import { deletePage, forkPage, fetchAllUsers, sharePage, publishPage } from '../../server';

const confirm = Modal.confirm;

const Option = Select.Option;

export default class componentName extends Component {
    static propTypes = {
        data: PropTypes.objectOf(PropTypes.any),
        history: PropTypes.objectOf(PropTypes.any),
        onFetchList: PropTypes.func,
        current: PropTypes.string,
        reg: PropTypes.objectOf(PropTypes.any),
    }

    constructor(props) {
        super(props);
        this.users = [];
    }

    showConfirm = (callback, defaultValue) => {
        confirm({
            title: '请输入页面标题',
            content: <Input onChange={this.handleChange} defaultValue={defaultValue} />,
            onOk: callback,
            onCancel() {},
        });
    }

    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleEdit = () => {
        const { data = {} } = this.props;
        this.props.history.push(`/edit/${data._id}`);
    }

    handleView = () => {
        const { data = {} } = this.props;
        this.props.history.push(`/view/${data._id}`);
    }

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

    handleUserChange = (users) => {
        this.users = users;
    }

    handleShareOk = (users) => {
        const { data = {} } = this.props;
        const pageId = data._id;
        const shareData = this.users.map((item) => {
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

        sharePage({"users": shareData}).then((res) => {
            message.success('分享成功')
        })
    }

    handleShare = () => {
        fetchAllUsers().then((res) => {
            confirm({
                title: '请选择要分享的人',
                content: this.renderSelect(res.data),
                onOk: () => this.handleShareOk(res.data),
                onCancel() {},
            });
        })
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

    handleUpload = () => {
        const { data = {} } = this.props;
        confirm({
            title: '提示',
            content: `确认${data.publish ? '取消发布' : '发布页面'}？`,
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

    render() {
        const { data = {}, current, reg } = this.props;

        const isOwer = user._id === data.owerUser._id;

        return (
            <div
                className={classnames(
                    'page-list-card', {
                        'page-list-card-publish': data.publish,
                        'page-list-card-isFork': data.fork
                    })
                }
            >
                <div
                    className='page-list-card-imgWrap'
                >
                    <img
                        className={'page-list-card-img'}
                        src="http://pic.qiantucdn.com/58pic/17/07/56/86C58PICqiF.jpg"
                    />
                    {
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
                    }
                </div>
                <div className={'page-list-card-button'}>
                    <p 
                        className={'page-list-card-title'}
                    >
                        <span
                            className={'page-list-card-title-left'}
                            dangerouslySetInnerHTML={{
                                __html: data.title.replace(reg, ($0) => {
                                    return `<span class="page-list-card-search-text">${$0}</span>`
                                })
                            }}
                        />
                        <span className={'page-list-card-title-right'}>
                            {
                                data.fork
                                    ? moment(data.forkTime).locale('zh-cn').fromNow()
                                    : moment(data.createTime).locale('zh-cn').fromNow()
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
                            {
                                current !== 'publish' && isOwer &&
                                <li
                                    className="page-list-card-icon page-list-card-icon-hover"
                                    onClick={this.handleUpload}
                                >
                                    <Font type={data.publish ? 'clipboard-download' : 'clipboard-upload'} />
                                    <span className="page-list-card-text">{data.publish ? '撤回' : '发布'}</span>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
