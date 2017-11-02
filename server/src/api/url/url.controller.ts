import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param
} from '@nestjs/common';
import { UrlService } from './url.service';
import CommonService from '../../common/common.service';

@Controller('url')
export class UrlController {
    constructor(private urlService: UrlService) {}

    @Post()
    async add(@Response() res, @Body() body) {
        const { folder, image } = body;
        const result: any = await this.urlService.findCreate(folder, image);

        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }

    @Get('/:id')
    async get(@Response() res, @Body() body, @Param('id') id) {
        const result: any = await this.urlService.one(id);

        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }
}