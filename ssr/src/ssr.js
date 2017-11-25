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

const cpy = require('cpy');



const nodeENV = process.env.NODE_ENV;

import { compileTemplate } from '../lib/utils/compile';
import Html from '../lib/publishPage/html';

function sendProgress(io, id, message, progress , data) {
    io.emit(`push:progress:${id}`, {code: 200, message, progress, data});
}

function sendProgressFail(io, id, message, progress, data) {
    io.emit(`push:progress:${id}`, {code: 500, message, progress, data});
}

const download = async (req, res, next) => {
    const { socket } = req;
    /**
     * id {string} 页面id
     * uploadUserId {string} 上传用户
     * description {string} 描述
     * effectTime {Date} 生效时间
     * invalidTime {Date} 有效时间
     * activityName {sting} 活动名称
     */
    // const {
    //     id, uploadUserId, content, title,
    //     ...field
    // } = req.body;
    // sendProgress(socket, id, "开始构建", 1);

    // const page = {data: content, name: title};
    const timeStmp = `${new Date() * 1}`;
    const baseUrl = path.join(__dirname, '../render', timeStmp);
    const folderZipPath = baseUrl + '.zip';
    
    if (!fs.existsSync(baseUrl)) {
        fs.mkdirSync(baseUrl);
    }
    cpy(['../client/dist-ssr/*' ], baseUrl).then(() => {
      const htmlString = fs.readFileSync(baseUrl + '/index.html', "utf-8");  
      const newHtmlString = htmlString.replace(/(\/ssrPath\/)/ig, 'http://localhost/');
      fs.writeFileSync(baseUrl + '/index.html', newHtmlString);

      const scriptString = fs.readFileSync(baseUrl + '/index.js', "utf-8");  
      const newScriptString = scriptString.replace(/{data:\[\],pageType:\"mobile\"}/ig, function() {
        return "{data: [{name: 'shijh'}],pageType: 'pc'}"
      });
      fs.writeFileSync(baseUrl + '/index.js', newScriptString);
      zip.zipFolder({ folderPath: baseUrl });

    });
    next();
}

export default download;