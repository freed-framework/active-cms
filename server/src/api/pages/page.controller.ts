import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param
} from '@nestjs/common';
import * as http from 'http';
import { HttpException } from '@nestjs/core';
import { PageService } from './page.service';
import Utils from '../../common/utils';
import CommonService from '../../common/common.service';

function getData(url, callback) {
    http.get(`http://localhost:4000/${url}.js`, (res) => {
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
        let pages = await this.service.pagingQuery(query, {title: {$regex: content, $options:'i'}});
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
        const { userId, pageId } = body;
        const result = await this.service.share({userId, pageId});
        res.status(HttpStatus.OK).json(result);
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

    @Get('/static/:id')
    async getStaticPage(@Response() res, @Param('id') id) {
        // let page = await this.service.getPage(id);
        // page = CommonService.commonResponse(Utils.parseContent(page));
        
        
        // 目标网站，嘿嘿，这个网站有很多实习职位
        // var pageUrl = 'http://shixi.info/';
        
        const html = await http.get('http://localhost:4000/', (res) => {
            var html = '';
            res.on('data', function(data) {
                html += data;
            });

            return res.on('end', function() {
                return html;
            });
        });

        const page = await html.replace(/<script src="(.*).js".*<\/script>/ig, ($0, $1) => {
            var result = $0;
            getData($1, (data) => {
                result = data
            })
            return result
            
        })
        console.log(a);
    }
}
