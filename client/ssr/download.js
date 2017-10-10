import * as React from 'react';
import * as path from 'path';
import * as fs from 'fs';
import * as ReactDOMServer from 'react-dom/server';
import * as got from 'got';

import * as zip from 'zipfolder';


import { compileTemplate } from './utils/compile';
import Html from './publishPage/html';

const download = async (req, res, next) => {
    const { id } = req.query;
    const page = {}
    await got(`http://www.iting.top/api/page/query/${id}`).then(response => {
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
        console.log(err)
    }
}

export default download;