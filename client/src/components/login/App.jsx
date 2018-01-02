/**
 * 简易登录
 */

import React from 'react';
import { Modal, Input } from 'antd';
import { login } from '../../services';

// 解决重复弹出问题
let isShow = false;

let submit = {
    name: null,
    password: null
}

export default (code) => {
    if (isShow) return null;
    isShow = true;

    return Modal.info({
        wrapClassName: 'login-modal',
        title: '登录',
        okText: '提交',
        content: (
            <div className="login-content">
                <Input
                    className="login-content-input login-content-user"
                    placeholder="用户名/邮箱"
                    onChange={(e) => { submit.name = e.target.value }}
                />
                <Input
                    className="login-content-input login-content-password"
                    placeholder="密码"
                    type="password"
                    onChange={(e) => { submit.password = e.target.value }}
                />
            </div>
        ),
        onOk() {
            isShow = false;
            login(submit).then(res => {
                localStorage.setItem('access_token', res.data.access_token);
                if (code !== 406) {
                    location.reload();
                }
            })
        },
    })
}

