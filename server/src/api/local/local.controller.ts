import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param, UsePipes,
    UseInterceptors
} from '@nestjs/common';
import { LocalService } from './local.service';
import Utils from '../../common/utils';
import CommonService from '../../common/common.service';
import { Exception } from '../../common/exception/error.exception';

@Controller('local')
export class LocalController {
    constructor(private service: LocalService) {}

    @Get()
    async get(@Request() req, @Response() res, @Param() param) {
        const { query } = req;
        const { content = '', pageSize = 10, page = 1 } = query;

        res.status(HttpStatus.OK).json(await this.service.get({content, pageSize, page}));
    }

    @Post()
    async post(@Request() req, @Response() res, @Body() body) {
        const { user } = req;

        res.status(HttpStatus.OK).json(await this.service.post(body, user));
    }
}
