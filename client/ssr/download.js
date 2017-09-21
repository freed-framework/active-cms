import * as React from 'react';
// import * as path from 'path';
import * as fs from 'fs';
import * as ReactDOMServer from 'react-dom/server';
import * as reactDOM from 'react-dom';

import { compileTemplate } from './utils/compile';
import Html from './publishPage/html';

const data = [{"name":"floor","guid":"ddddds11-1ead-43ae-b6de-e6debb958b08","style":{"layout": {"height":100}}},{"name":"floor","guid":"237d6d2c-1034-4f76-a5c8-6678b9a3cb78","style":{"height":60}}];

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