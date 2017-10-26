import {
    Controller, Get, Post,
    Response, Param, Body, Request,
    HttpStatus, UseFilters, UsePipes
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as uuid from 'node-uuid';
import * as passport from 'passport';
import { UsersService } from './user.service';
import * as Config from '../../config/local.env';
import CommonService from '../../common/common.service';
import { Exception } from '../../common/exception/error.exception';

@Controller('users')
export class UsersController {
    constructor(
        private service: UsersService
    ) { }

    @Get()
    async getAllUsers(@Request() req, @Response() res) {
        const { user } = req.session;
        const users = await this.service.getAllUsers();

        const filter = users.filter((item) => {
            if (item._id != user._id) {
                return item
            }
        })

        res.status(HttpStatus.OK).json(CommonService.commonResponse(filter));
    }

    @Get('/find')
    async getUser(@Request() req, @Response() res) {
        const { id } = req.query;
        const user = await this.service.getUser({_id: id})
        res.status(HttpStatus.OK).json(CommonService.commonResponse(user));
    }

    @Post('/login')
    async login(@Request() req, @Response() res, @Body() body) {
        const { user = {} } = req.session;
        const { password, userName } = body;

        passport.authenticate('local', (err, user, info) => {
            let token;
            if (err) {
                throw new HttpException('系统错误', 404)
            }
            if (user) {
                token = user.generateJwt();
                req.user = user;
                req.session.user = user;
                req.session.token = token;

                res.status(HttpStatus.OK).json(CommonService.loginOk({ token }));
            } else {
                res.status(HttpStatus.OK).json(CommonService.loginError({}));
            }
        })(req, res)
    }

    @Get('/logout')
    async logout(@Request() req, @Response() res) {
        req.session.token = null;
        req.session.user = null;

        res.status(HttpStatus.OK).json({
            message: '退出成功',
            code: 401,
            data: {}
        });
    }

    @Post()
    async addUser(@Request() req, @Response() res, @Body() body) {
        const { userName, password, ...params } = body;
        const user = await this.service.getUser({ userName });

        if (user) {
            throw new Exception('用户名已经存在', 500);
        }

        const msg = await this.service.addUser(body)
        res.status(HttpStatus.OK).json(CommonService.commonResponse(msg));
    }
}
