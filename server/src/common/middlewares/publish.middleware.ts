
/**
 * @file publish.middleware.ts
 * @author shijh
 *
 * 发布zip
 */
import { HttpStatus, Middleware, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as httpProxy from 'http-proxy';
import ENV from '../../config/env';

const proxy = httpProxy.createProxyServer({});

@Middleware()
export class PublishMiddleware implements NestMiddleware {
    resolve() {
        return async (req, res, next) => {
            // 代理到公司上传图片服务器
            proxy.web(req, res, { target: `${ENV.api}/commonUploadFile/uploadZip?_=1`  }, (e) => {
                next();
            })
        }
    }
}
