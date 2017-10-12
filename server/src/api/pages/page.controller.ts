import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param
} from '@nestjs/common';
import * as http from 'http';
import { HttpException } from '@nestjs/core';
const fs = require('fs');
const download = require('download');
import { PageService } from './page.service';
import Utils from '../../common/utils';
import CommonService from '../../common/common.service';
// import * as RenderPage from '../../../../client/server/page';

function getData(url, callback) {
    http.get(`http://localhost:4000/${url}`, (res) => {
        var result = ''
        res.on('data', function(data) {
            result += data;
        });
        res.on('end', (data) => {
            callback && callback(`<script>${result}</script>`);
        })
    })
}

@Controller('page')
export class PageController {
    constructor(private service: PageService) {}

    @Get('/query/:id')
    async getPage(@Response() res, @Param('id') id) {
        let page = await this.service.getPage(id);
        page = CommonService.commonResponse(Utils.parseContent(page));
        res.status(HttpStatus.OK).json(page);
    }

    @Get('/remove/:id')
    async removePage(@Request() req, @Response() res, @Param('id') id) {
        const page = await this.service.getPage(id);
        const { user } = req.session;
        if (!page || user._id != page.owerUser) {
            res.status(HttpStatus.OK).json({
                code: 500,
                message: '删除页面失败',
                data: {}
            });
        } else {
            let result = await this.service.removePage(id);
            result = CommonService.commonResponse(result);
            res.status(HttpStatus.OK).json(result);
        }
    }

    @Get('/queryByTitle')
    async pagingQuery(@Request() req, @Response() res) {
        const { query } = req;
        const { content = '' } = query;
        let pages = await this.service.pagingQuery(query, {title: {$regex: content, $options: 'i'}, publish: true});
        res.status(HttpStatus.OK).json(CommonService.commonResponse(pages));
    }

    @Get('/lists')
    async queryLists(@Request() req, @Response() res) {
        const { query } = req;
        const { user } = req.session;
        let result = await this.service.pagingQuery(query, {owerUser: user._id})
        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }

    @Get('/shareLists')
    async shareLists(@Request() req, @Response() res) {
        const { query } = req;
        const { user } = req.session;
        let result = await this.service.pagingQuery(query, {owerUser: user._id})
        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }

    @Post('/share')
    async share(@Response() res, @Body() body) {
        const { users } = body;
        users.forEach(element => {
            const { userId, pageId } = element;
            this.service.share({userId, pageId});
        });
        res.status(HttpStatus.OK).json({code: 200, message: '分享成功', data: []});
    }

    @Post('/publish')
    async publish(@Request() req, @Response() res, @Body() body) {
        const { id, tyep = true } = body;
        const { user } = req.session;
        const page = await this.service.getPage(id, {content: 0});
        if (user._id !== page.owerUser) {
            res.status(HttpStatus.OK).json({
                code: 500,
                message: '操作错误',
                data: {}
            });
        } else {
            const result = await this.service.update(id, {publish: tyep});
            res.status(HttpStatus.OK).json(CommonService.commonResponse({}));
        }
    }

    @Post('/update/fork')
    async updateFork(@Request() req, @Response() res, @Body() body) {
        const { id, title } = body;
        const { user } = req.session;
        const result = await this.service.updateFork(user._id, id, title);
        res.status(HttpStatus.OK).json(result);
    }

    @Post('/update')
    async updatePage(@Response() res, @Body() body) {
        const { id, page } = body;
        const result = await this.service.updatePage(id, page);
        res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async addPage(@Request() req, @Response() res, @Body() body) {
        const { user } = req.session;
        const result = await this.service.addPage({
            body,
            createUser: user._id,
            owerUser: user._id
        });
        res.status(HttpStatus.OK).json(result);
    }

    // @Get('/static/:id')
    // async getStaticPage(@Response() res, @Param('id') id) {
    //     console.log(RenderPage())
    //     // download('http://localhost:4000/').then(data => {
    //     //     res.set({
    //     //         "Content-type":"application/octet-stream",
    //     //         "Content-Disposition":"attachment;filename=" + encodeURI(`${id}.html`)
    //     //     });
    //     //     res.write(data, "binary");
    //     //     res.end();
    //     // });
    // }
}
