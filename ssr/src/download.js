import React from 'react';
import path from 'path';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import got from 'got';

import zip from 'zipfolder';
import ENV from './env';

const nodeENV = process.env.NODE_ENV;

import { compileTemplate } from '../lib/utils/compile';
import Html from '../lib/publishPage/html';

const download = async (req, res, next) => {
    const { id } = req.query;
    const page = {}
    await got(`${ENV.domain}/api/page/query/${id}`).then(response => {
        const { content, title } = JSON.parse(response.body).data;
        page.data = content;
        page.name = title;
    })

    try {
        const data = await compileTemplate(page);
        const props = {};
        props.script = data.fileContent.toString();
        props.style = data.styleContent.toString();
        const htmlString = ReactDOMServer.renderToStaticMarkup(<Html  {...props} />);
        const destHtml = data.outputPath + '/index.html';
        fs.writeFileSync(destHtml, htmlString);
        const folderPath = path.join(__dirname, '../render', `${page.name}`);
        const folderZipPath = folderPath + '.zip';
        let access = true;
        await fs.access(folderPath, (err) => {
            if (err) {
                access = false;
            }
        });
        if (access) {
            console.log('zip......')
            await zip.zipFolder({folderPath: folderPath});
            console.log('download......')
            res.download(folderZipPath);
        }
        else {
            res.status(404).send({
                retcode: 404,
                msg: 'zip 压缩包不存在'
            });
        }
    } catch (err) {
        next(err);
    }
}

export default download;