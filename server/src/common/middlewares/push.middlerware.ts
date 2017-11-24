/**
 * @file push.middleware.ts
 * @author shijh
 *
 * 推送
 */
import { HttpStatus, Middleware, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as httpProxy from 'http-proxy';
import ENV from '../../config/env';

const proxy = httpProxy.createProxyServer({});

const nodeENV = process.env.NODE_ENV;

@Middleware()
export class PushMiddleware implements NestMiddleware {
    resolve() {
        return async (req, res, next) => {
            // 代理到公司上传图片服务器
            proxy.web(req, res, { target: `http://localhost:12345/ssr/push`  }, (e) => {
                console.log(e);
                next();
            })
        }
    }
}