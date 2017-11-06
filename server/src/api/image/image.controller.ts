import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param
} from '@nestjs/common';

import * as fs from 'fs';
import * as Path from 'path';
import * as process from 'process';
import { ImageService } from './image.service';
import CommonService from '../../common/common.service';

const cwd = process.cwd();

/**
 * 上传图片
 * @param file 图片对象
 */
function upload(file) {
    return new Promise((resolve, reject) => {
        const { size, name, type, path, originalFilename } = file;
        const dstPath = './images/' + originalFilename;
        
        const readStream = fs.createReadStream(path);
        const writeStream = fs.createWriteStream(dstPath);

        readStream.pipe(writeStream);

        readStream.on('end', () => {
            const { headers, ...surplus } = file;

            fs.unlinkSync(path);

            resolve({...surplus, path: Path.resolve(cwd, dstPath)});
        })

        readStream.on('error', (err) => {
            reject(err);
        })
    })
}

/**
 * 批量上传数组
 * @param files 图片数组
 */
function parse(files) {
    return new Promise((resolve, reject) => {
        const paths = [];
        const fileKeys = Object.keys(files);
        const len = fileKeys.length;

        fileKeys.map((i, index) => {
            const item = files[i];

            Object.keys(item).map((j) => {
                const file = item[j];

                upload(file).then((re) => {
                    paths.push(re);

                    if (len === index + 1) {
                        resolve(paths)
                    }
                })
            })
        });
    })
}

@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) { }

    @Post()
    async add(@Request() req, @Response() res) {
        const { files } = req;

        parse(files).then((re: any) => {
            res.status(HttpStatus.OK).json({
                code: 200,
                message: '上传成功',
                data: re
            })
        })
    }

    @Post('/upload')
    async upload(@Request() req, @Response() res) {

    }
}