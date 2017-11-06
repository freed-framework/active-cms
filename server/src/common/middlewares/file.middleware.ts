
/**
 * @file file.middleware.ts
 * @author shijh
 *
 * 上传middleware
 */
import { HttpStatus, Middleware, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({});

@Middleware()
export class FileMiddleware implements NestMiddleware {
    resolve() {
        return async (req, res, next) => {
            // 代理到公司上传图片服务器
            proxy.web(req, res, { target: 'http://127.0.0.1' }, (e) => {
                next()
            })
        }
    }
}