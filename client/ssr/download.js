import * as React from 'react';
// import * as path from 'path';
import * as fs from 'fs';
import * as ReactDOMServer from 'react-dom/server';
import * as reactDOM from 'react-dom';

import { compileTemplate } from './utils/compile';
import Html from './publishPage/html';

const data = [{"name":"floor","guid":"ddddds11-1ead-43ae-b6de-e6debb958b08","style":{"layout":{"width":""}}},{"name":"floor","guid":"237d6d2c-1034-4f76-a5c8-6678b9a3cb78","style":{"layout":{"height":60}},"children":[{"guid":"b9002719-7183-4ce1-9d92-02bec84956cb","name":"tab","module":{"id":1,"name":"tab","file":"tab","menus":[],"editable":{"layout":["basic"],"title":["basic"],"main":["basic"]}}},{"guid":"24bba79f-2be4-4f25-a054-b8212d933474","name":"tab","module":{"id":1,"name":"tab","file":"tab","menus":[],"editable":{"layout":["basic"],"title":["basic"],"main":["basic"]}}},{"guid":"05ea8760-daed-4236-87cc-c73d7e8a7f8b","name":"tab","module":{"id":1,"name":"tab","file":"tab","menus":[],"editable":{"layout":["basic"],"title":["basic"],"main":["basic"]}}},{"guid":"18b41975-4239-4b02-a452-0604437a79fc","name":"tab","module":{"id":1,"name":"tab","file":"tab","menus":[],"editable":{"layout":["basic"],"title":["basic"],"main":["basic"]}}}]},{"guid":"0d295cbd-8ecc-4e43-bbf1-57d1a257aa75","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tab"],"editable":{"layout":["basic"]}}},{"guid":"91635c5b-7d17-4e60-b377-69849a78f08a","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tab"],"editable":{"layout":["basic"]}}},{"guid":"59666a86-a98b-4c63-a8fc-9b177f2129ac","name":"fixer","module":{"id":2,"name":"fixer","file":"fixer","menus":[]}}]

const page = {
    data,
    name: '四节合色'
}

const download = async (req, res, next) => {
    try {
        const data = await compileTemplate(page);
        const props = {};
        props.script = data.fileContent.toString();
        props.style = data.styleContent.toString();
        const htmlString = ReactDOMServer.renderToStaticMarkup(<Html  {...props} />);
        const destHtml = data.outputPath + '/index.html';
        await fs.writeFile(destHtml, htmlString);
        res.status(200).send({
            retcode: 0
        });
    } catch (err) {
        next(err);
        console.log(err)
    }
}

export default download;