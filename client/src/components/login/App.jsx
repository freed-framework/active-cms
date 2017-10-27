/**
 * 简易登录
 */

import React from 'react';
import { Modal, Input } from 'antd';
import { login } from '../../services';
import * as Cookies from 'js-cookie';

let submit = {
    userName: null,
    password: null
}

function setCookie(name, value) {
    // const Days = 7;
    // const exp = new Date();
    // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    // document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`
}

export default () => {
    return Modal.info({
        title: '登录',
        content: (
            <div>
                <Input placeholder="用户名" onChange={(e) => { submit.userName = e.target.value }} />
                <Input placeholder="密码" type="password" onChange={(e) => { submit.password = e.target.value }} />
            </div>
        ),
        onOk() {
            login(submit).then(res => {
                console.log(res)
                setCookie('token', res.data.token)
            })
        },
    })
}
