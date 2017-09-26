import * as React from 'react';
// import * as path from 'path';
import * as fs from 'fs';
import * as ReactDOMServer from 'react-dom/server';
import * as reactDOM from 'react-dom';

import { compileTemplate } from './utils/compile';
import Html from './publishPage/html';

const data = [{"guid":"a7731b7c-9ae6-4983-8ec0-417e4f23b239","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tab","floor","img","fix","float"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"padding":"200xp"}}},"children":[{"guid":"12157442-127d-469d-9bd5-9b4a762eeb2b","name":"img","module":{"id":4,"name":"img","file":"img","editable":{"style":{"layout":["basic"]},"src":["attrs"]}},"attrs":{"src":"https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170821163422188_217.jpg"}}]},{"guid":"8b6fb289-8852-4909-b5f3-20d042789adf","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tab","floor","img","fix","float"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"width":"1200px","margin":"0 auto"}}},"children":[{"guid":"52a92814-6cb7-4815-b9de-f180164127b7","name":"img","module":{"id":4,"name":"img","file":"img","editable":{"style":{"layout":["basic"]},"src":["attrs"]}},"attrs":{"src":"https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170821163422188_217.jpg","style":{"layout":{"width":"100%","height":"100%"}}}},{"guid":"c1934f03-b05c-4d89-93be-91d0557037b4","name":"fix","module":{"id":5,"name":"fix","file":"fix","editable":{"style":{"layout":["basic","position"]}}},"attrs":{"style":{"layout":{"background":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170821173038930_831.png)","width":"190px","height":"538px","top":"100px","left":"160px"}}}},{"guid":"09d550f3-3059-4a3c-959e-ff7de0504b37","name":"float","module":{"id":6,"name":"float","file":"float","editable":{"style":{"layout":["basic","position"]}}},"attrs":{"style":{"layout":{"top":"0px","left":"0px"}}}}]}]

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