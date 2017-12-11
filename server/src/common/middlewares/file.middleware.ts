
/**
 * @file file.middleware.ts
 * @author shijh
 *
 * 上传middleware
 */
import { HttpStatus, Middleware, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as httpProxy from 'http-proxy';
import ENV from '../../config/env';

const proxy = httpProxy.createProxyServer({});

const nodeENV = process.env.NODE_ENV;

@Middleware()
export class FileMiddleware implements NestMiddleware {
    resolve() {
        return async (req, res, next) => {
            console.log(13122222222222222222222222222222222222222222222)
            // 代理到公司上传图片服务器
            proxy.web(req, res, { target: `${ENV.api[nodeENV]}/commonUploadFile/uploadImageFiles?_=1`  }, (e) => {
                console.log(e);
                next();
            })
        }
    }
}
