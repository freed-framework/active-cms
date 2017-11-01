import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param
} from '@nestjs/common';
import { FolderService } from './folder.service';
import CommonService from '../../common/common.service';
import { CreateFolderDto } from '../../dto/folder.dto';

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
        const { page, user, parent, ...props } = body;

        const parentFolder: any = await this.folderService.findById(parent);
        let { level = -1 } = parentFolder || {};

        const result: any = await this.folderService.add({...props, page, ower: user, level: ++level});

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
}