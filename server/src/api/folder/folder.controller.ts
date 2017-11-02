import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param
} from '@nestjs/common';
import { FolderService } from './folder.service';
import CommonService from '../../common/common.service';
import { CreateFolderDto } from '../../dto/folder.dto';
import { UrlService } from '../url/url.service';

const urlService = new UrlService();

@Controller('folder')
export class FolderController {
    constructor(private folderService: FolderService) {}

    @Get('/list/:id')
    async get(@Request() req, @Response() res, @Param() param) {
        const { id } = param;
        const result: any = await this.folderService.get(id);

        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }

    @Post()
    async add(@Request() req, @Response() res, @Body() body: CreateFolderDto) {
        const { page, parent, ...props } = body;
        const { user } = req.session;
        console.log(user)

        const parentFolder: any = await this.folderService.findById(parent);
        let { level = -1 } = parentFolder || {};

        const result: any = await this.folderService.add({...props, page, ower: user._id, level: ++level});

        if (result && parent) {
            const update = await this.folderService.update({
                _id: parent
            }, {
                $addToSet: { childrens: result._id }
            })
        }

        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }

    @Get('/:id')
    async findById(@Request() req, @Response() res, @Param('id') id) {
        const result: any = await this.folderService.findById(id);

        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }

    @Post('/image')
    async addImage(@Response() res, @Body() body) {
        const { folder, image } = body;
        const result: any = await urlService.findCreate(folder, image);

        const update = await this.folderService.update({
            _id: result.folder
        }, {
            images: result.url
        })

        res.status(HttpStatus.OK).json(CommonService.commonResponse(update));
    }
}