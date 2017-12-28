import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param, UsePipes,
    UseInterceptors
} from '@nestjs/common';
import * as fs from 'fs';
import * as Path from 'path';
import * as adm_zip from 'adm-zip';
import * as cpy from 'cpy';
import * as zip from 'zipfolder';
import * as rimraf from 'rimraf';
import * as request from 'request';
import ENV from '../../config/env';
import { LocalService } from './local.service';
import Utils from '../../common/utils';
import CommonService from '../../common/common.service';
import { Exception } from '../../common/exception/error.exception';

function replacePublicPath(filename, distPath, timeStmp) {
    const str = fs.readFileSync(distPath + filename, "utf-8");
    const newStr = str.replace(/(\/ssrPath\/)/ig, `${ENV.publicPath}${timeStmp}/`);
    fs.writeFileSync(distPath + filename, newStr);
}

@Controller('local')
export class LocalController {
    constructor(private service: LocalService) { }

    @Get()
    async get( @Request() req, @Response() res, @Param() param) {
        const { query } = req;
        const { content = '', pageSize = 10, page = 1 } = query;

        res.status(HttpStatus.OK).json(await this.service.get({ content, pageSize, page }));
    }

    @Post()
    async post( @Request() req, @Response() res, @Body() body) {
        const { user } = req;

        res.status(HttpStatus.OK).json(await this.service.post(body, user));
    }

    @Post('/zip')
    async zip( @Request() req, @Response() res, @Body() body) {
        const { files, user } = req;
        const { title, zipId } = body;
        const { file } = files;
        const { size, name, type, path, originalFilename } = file;
        const timeStmp = `${user.id}${+new Date()}`;
        const basePath = Path.resolve(__dirname, '../../../zips');
        const distPath = `${basePath}/${timeStmp}`;

        const readStream = fs.createReadStream(path);
        const writeStream = fs.createWriteStream(`${distPath}.zip`);

        readStream.pipe(writeStream);

        readStream.on('end', () => {
            const unzip = new adm_zip(`${distPath}.zip`);
            if (!fs.existsSync(distPath)) {
                fs.mkdirSync(distPath);
            }
            unzip.extractAllTo(distPath, true);
            cpy(`${distPath}/dist/*`, distPath).then(() => {
                rimraf(`${distPath}/dist/*`, () => { });


                // 修改html中地址
                replacePublicPath('/index.html', distPath, timeStmp);

                // 修改js中地址
                replacePublicPath('/index.js', distPath, timeStmp);

                rimraf(`${distPath}.zip`, () => {
                    zip.zipFolder({ folderPath: distPath }).then(() => {
                        rimraf(distPath, () => { });
                        uploadZip({
                            uploadUserId: user._id,
                            zipId,
                            title,
                        }, `${distPath}.zip`, timeStmp).then((res) => {
                            rimraf(`${distPath}.zip`, () => { });
                            console.log(res);
                        }).catch((e) => {
                            console.log(e)
                            rimraf(`${distPath}.zip`, () => { });
                        })
                    })
                });

            })
        })

        readStream.on('error', (err) => {
            console.log(err)
        })
    }
}

function uploadZip(body, folderZipPath, timeStmp): any {
    return new Promise((resolve, reject) => {
        /**
         * id {string} 页面id
         * uploadUserId {string} 上传用户
         * description {string} 描述
         * effectTime {Date} 生效时间
         * invalidTime {Date} 有效时间
         * activityName {sting} 活动名称
         */
        const {
            uploadUserId, title, zipId,
            ...field
        } = body;
console.log(folderZipPath)
        const formData = {
            activityName: title,
            uploadUserId: `${uploadUserId}`,
            ...field,
            file: {
                value: fs.createReadStream(folderZipPath),
                options: {
                    filename: `${timeStmp}.zip`
                }
            }
        };

        zipId && (formData.id = zipId)

        request.post({ url: `${ENV.api}/commonUploadFile/uploadZip`, formData }, (err, httpResponse, res) => {

            if (err) {
                reject(err);
                return;
            }

            res = JSON.parse(res) || {};

            resolve(res);
        });
    })
}
