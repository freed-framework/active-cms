
/**
 * @file login.middleware.ts
 * @author shijh
 *
 * 认证middleware
 */
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import {
    Middleware, NestMiddleware
} from '@nestjs/common';
import CommonService from '../common.service';

@Middleware()
export class LoginMiddleware implements NestMiddleware {
    resolve() {
        return async (req, res, next) => {
            const { token } = req.session;
            // console.log(req.session, '----------------------')
            // console.log(req.headers.token)
            if (true) {
                next()
            }
            else {
                res.status(HttpStatus.OK).json({
                    code: 401,
                    message: '用户未登录'
                })
            }
        }
    }
}