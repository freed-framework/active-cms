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

    @Get()
    async get(@Request() req, @Response() res) {
        const { id = '59f7dbf8d94b863f861d92be' } = req.query;
        const result: any = await this.folderService.get(id);

        res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async add(@Request() req, @Response() res, @Body() body: CreateFolderDto) {

        const {
            page = '59db14fa89b19208c094782b',
            user = '59dae48589b19208c0947821',
            parent = '59f7df1c6e95544a527ea40c',
            ...props
        } = body;

        const parentFolder: any = await this.folderService.findById(parent);
        let { level = 0 } = parentFolder;
        console.log(parentFolder)

        const result: any = await this.folderService.add({...props, page, user, level: ++level, parent: "59f81214dadbcc92b247849c"});

        // parentFolder.update({$addToSet: { childrens: result._id }})

        if (result) {
            const update = await this.folderService.update({
                folder: parent
            }, {
                $addToSet: { childrens: result._id }
            })
        }

        res.status(HttpStatus.OK).json(result);
    }
}