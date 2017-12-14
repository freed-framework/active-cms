/**
 * 简易登录
 */

import React from 'react';
import { Modal, Input } from 'antd';
import { login } from '../../services';
import * as Cookies from 'js-cookie';

// 解决重复弹出问题
let isShow = false;

let submit = {
    name: null,
    password: null
}

function setCookie(name, value) {
    // const Days = 7;
    // const exp = new Date();
    // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    // document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`
}

export default () => {
    if (isShow) return null;
    isShow = true;
    return Modal.info({
        title: '登录',
        okText: '提交',
        content: (
            <div>
                <Input placeholder="用户名" onChange={(e) => { submit.name = e.target.value }} />
                <Input placeholder="密码" type="password" onChange={(e) => { submit.password = e.target.value }} />
            </div>
        ),
        onOk() {
            isShow = false;
            login(submit).then(res => {
                localStorage.setItem('access_token', res.data.access_token)
            })
        },
    })
}
