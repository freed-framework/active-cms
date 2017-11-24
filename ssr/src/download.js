import React from 'react';
import path from 'path';
import fs from 'fs';
import http from 'http';
import ReactDOMServer from 'react-dom/server';
import got from 'got';
import needle from 'needle';
import zip from 'zipfolder';
import request from 'request';
import rimraf from 'rimraf';
import ENV from './env';
const io = require('socket.io')(5555, {
    path: '/push',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

const nodeENV = process.env.NODE_ENV;

import { compileTemplate } from '../lib/utils/compile';
import Html from '../lib/publishPage/html';

io.on('connection', (socket) => {
    socket.emit('connection', '链接成功');
});

function sendProgress(id, message, progress , data) {
    io.emit(`push:progress:${id}`, {code: 200, message, progress, data});
}

function sendProgressFail(id, message, progress, data) {
    io.emit(`push:progress:${id}`, {code: 500, message, progress, data});
}

const download = async (req, res, next) => {
    /**
     * id {string} 页面id
     * uploadUserId {string} 上传用户
     * description {string} 描述
     * effectTime {Date} 生效时间
     * invalidTime {Date} 有效时间
     * activityName {sting} 活动名称
     */
    const {
        id, uploadUserId, content, title,
        ...field
    } = req.body;
    sendProgress(id, "开始构建", 1);

    const page = {data: content, name: title};
    const timeStmp = `${id}${new Date() * 1}`;

    try {
        const data = await compileTemplate(page, timeStmp ,id ,sendProgress);
        sendProgress(id, "构建完成", 60);
        const props = {};
        props.script = data.fileContent.toString();
        props.style = data.styleContent.toString();
        const htmlString = ReactDOMServer.renderToStaticMarkup(<Html  {...props} />);
        const destHtml = data.outputPath + '/index.html';
        fs.writeFileSync(destHtml, htmlString);
        const folderPath = path.join(__dirname, '../render', timeStmp);
        const folderZipPath = folderPath + '.zip';
        let access = true;
        await fs.access(folderPath, (err) => {
            if (err) {
                access = false;
            }
        });
        if (access) {
            sendProgress(id, "打包中", 70);
            await zip.zipFolder({ folderPath: folderPath });
            sendProgress("打包完成", 80);
            // res.download(folderZipPath);

            var formData = {
                uploadUserId: uploadUserId,
                ...field,
                file: {
                    value: fs.createReadStream(folderZipPath),
                    options: {
                        filename: `${timeStmp}.zip`
                    }
                }
            };
            sendProgress(id, "推送zip", 85);
            request.post({ url: `${ENV.domain}/api/publish/zip`, formData: formData }, (err, httpResponse, body) => {
                body = JSON.parse(body) || {};
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                rimraf(folderPath, {}, () => { });
                rimraf(folderZipPath, {}, () => { });
                sendProgress(id, "推送成功", 100, body);
                res.status(200).send(body)
            });
        }
        else {
            sendProgressFail(id, "推送失败", 0);
            res.status(404).send({
                retcode: 404,
                msg: 'zip 压缩包不存在'
            });
        }
    } catch (err) {
        sendProgressFail(id, "推送失败", 0);
        next(err);
    }
}

export default download;