import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Font from 'font';
import classnames from 'classnames';
import moment from 'moment';

import { deletePage } from '../../server';

export default class componentName extends Component {
    static propTypes = {
        data: PropTypes.objectOf(PropTypes.any),
        history: PropTypes.objectOf(PropTypes.any),
        onFetchList: PropTypes.func, 
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
        deletePage(data._id).then(() => {
            this.props.onFetchList()
        })
    }

    render() {
        const { data = {} } = this.props;
        return (
            <div
                className={classnames(
                    'page-list-card', {
                        'page-list-card-publish': data.publish,
                        'page-list-card-isFork': data.fork
                    })
                }
            >
                <div>
                    <img
                        className={'page-list-card-img'}
                        src="http://img06.tooopen.com/images/20170913/tooopen_sl_224452948149.jpg"
                    />
                </div>
                <div className={'page-list-card-button'}>
                    <p 
                        className={'page-list-card-title'}
                    >
                        <span className={'page-list-card-title-left'}>
                            { data.title }
                        </span>
                        <span className={'page-list-card-title-right'}>
                            { moment(data.createTime).locale('zh-cn').fromNow() }
                        </span>
                    </p>
                    <div>
                        <ul className="page-list-card-button-wrap">
                            <li className="page-list-card-icon">
                                <Font type="streetsign" />
                                <span className="page-list-card-text">{data.forkNum}</span>
                            </li>
                            <li
                                className="page-list-card-icon page-list-card-icon-hover"
                                onClick={this.handleEdit}
                            >
                                <Font type="clipboard-edit" />
                                <span className="page-list-card-text">编辑</span>
                            </li>
                            <li
                                className="page-list-card-icon page-list-card-icon-hover"
                                onClick={this.handleView}
                            >
                                <Font type="eye" />
                                <span className="page-list-card-text">预览</span>
                            </li>
                            <li
                                className="page-list-card-icon page-list-card-icon-hover"
                                onClick={this.handleDelete}
                            >
                                <Font type="trash-can" />
                                <span className="page-list-card-text">删除</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
