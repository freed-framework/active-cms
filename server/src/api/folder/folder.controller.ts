import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param
} from '@nestjs/common';
import { FolderService } from './folder.service';
import CommonService from '../../common/common.service';

@Controller('folder')
export class FolderController {
    constructor(private folderService: FolderService) {}

    @Post()
    async add(@Response() res, @Body() body) {
        const {
            page = '59db14fa89b19208c094782b',
            user = '59dae48589b19208c0947821',
            parent,
            ...props
        } = body;

        const result: any = await this.folderService.add({...props, page, user});
console.log(parent)
        if (parent) {
            console.log(parent)
            const update = await this.folderService.update({
                folder: parent
            }, {
                $addToSet: { childrens: result._id }
            })
        }

        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }
}