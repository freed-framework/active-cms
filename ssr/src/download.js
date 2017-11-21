import React from 'react';
import path from 'path';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import got from 'got';

import zip from 'zipfolder';


import { compileTemplate } from '../lib/utils/compile';
import Html from '../lib/publishPage/html';

const download = async (req, res, next) => {
    const { id } = req.query;
    const page = {}
    await got(`http://172.30.40.16:3000/api/page/query/${id}`).then(response => {
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
        const folderPath = path.join(__dirname, 'publish', page.name);
        const folderZipPath = folderPath + '.zip';
        let access = true;
        await fs.access(folderPath, (err) => {
            if (err) {
                access = false;
            }
        });
        if (access) {
            await zip.zipFolder({folderPath: folderPath});
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