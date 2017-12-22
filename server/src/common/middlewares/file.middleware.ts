
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
import logger from '../logger.utils';

const proxy = httpProxy.createProxyServer({});

@Middleware()
export class FileMiddleware implements NestMiddleware {
    resolve() {
        return async (req, res, next) => {
            // 代理到公司上传图片服务器
            proxy.web(req, res, { target: `${ENV.api}/commonUploadFile/uploadImageFiles?_=1`  }, (e) => {
                const { user } = req;

                logger.error("%s 上传图片失败， 时间： %s", user._id, new Date());

                next();
            })
        }
    }
}
