import * as passport from "passport";
import { Middleware, NestMiddleware, ExpressMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction } from 'express';
import { fail, notFound, expired } from '../../common/common.utils';
import logger from '../../common/logger.utils';

@Middleware()
export class JwtMiddleware implements NestMiddleware {

    public resolve() {
        let message
        return async (req, res, next) => {
            return await passport.authenticate('jwt', { session: false }, (err, user, info) => {
                if (err) {
                    next(new HttpException(err, 401))
                } else if (typeof info != 'undefined') {
                    switch (info.message) {
                        case 'No auth token':
                        case 'invalid signature':
                        case 'jwt malformed':
                            message = notFound({}, "认证失败")
                            break
                        case 'jwt expired':
                            message = expired({}, "登录过期");
                            break
                    }
                    res.status(HttpStatus.OK).json(message);
                } else {
                    req.user = user
                    next()
                }
            })(req, res, next)
        }
    }
}


@Middleware()
export class LogInMiddleware implements NestMiddleware {
    public resolve() {
        return async (req, res, next) => {
            return await passport.authenticate('local', { session: false }, (err, user, info) => {
                if (typeof info != 'undefined') {
                    next(new HttpException(info.message, 401));
                } else if (err) {
                    res.status(HttpStatus.OK).json(fail({}, err))
                } else {
                    req.user = user;

                    logger.info("%s 登录成功， 用户id： %s， 时间： %s", user.userDspName, user._id, new Date())

                    next();
                }
            })(req, res, next)
        }
    }
}