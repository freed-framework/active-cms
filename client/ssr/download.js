import * as React from 'react';
// import * as path from 'path';
import * as fs from 'fs';
import * as ReactDOMServer from 'react-dom/server';
import * as reactDOM from 'react-dom';

import { compileTemplate } from './utils/compile';
import Html from './publishPage/html';

const data = [{"guid":"a7731b7c-9ae6-4983-8ec0-417e4f23b239","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tab","floor","img","fix","float"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"padding":"","backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926094353408_22.jpg)","height":"725px"}}},"children":[{"guid":"d2e97c0c-1b6b-4455-9ab3-5ce109acd263","name":"fix","module":{"name":"fix","menus":["floor","hotMap"],"editable":{"style":{"layout":["basic"]},"distanceLeft":[{"label":"侧边距离","component":"attrs"}],"distanceTop":[{"label":"顶部距离","component":"attrs"}],"target":[{"label":"定位目标","component":"radio","data":[{"key":"body","label":"窗口"},{"key":"parent","label":"父元素"}]}],"horizontal":[{"label":"水平方向定位","component":"chooseData","items":[{"key":"left","label":"左"},{"key":"right","label":"右"}]}],"vertical":[{"label":"垂直方向定位","component":"chooseData","items":[{"key":"top","label":"上"},{"key":"bottom","label":"下"}]}]}},"attrs":{"style":{"layout":{"height":"150","width":"100%","backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926160800707_500.png)"}},"vertical":{"key":"bottom","value":0}},"children":[{"guid":"46c3f9b7-c1b1-47ad-bdd6-009d4d823ace","name":"floor","module":{"name":"floor","menus":["pre-image","tab","floor","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"width":"156","height":"150","backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926160824131_922.png)"}}}}]}]},{"guid":"8128c45e-2044-4a55-aaa8-560cab083c06","name":"floor","module":{"name":"floor","menus":["pre-image","tab","floor","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926094528831_125.jpg)","height":"614px"}}},"children":[{"guid":"d01a5953-765e-4f1b-9144-192d05b820f8","name":"floor","module":{"name":"floor","menus":["pre-image","tab","floor","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926095306436_191.jpg)","height":"614px","width":"1200px","margin":"0 auto"}}},"children":[{"guid":"bb764452-af31-4f2d-9650-60c9b3aa710e","name":"fix","module":{"name":"fix","menus":["floor","hotMap"],"editable":{"style":{"layout":["basic"]},"distanceLeft":[{"label":"侧边距离","component":"attrs"}],"distanceTop":[{"label":"顶部距离","component":"attrs"}],"target":[{"label":"定位目标","component":"radio","data":[{"key":"body","label":"窗口"},{"key":"parent","label":"父元素"}]}],"horizontal":[{"label":"水平方向定位","component":"chooseData","items":[{"key":"left","label":"左"},{"key":"right","label":"右"}]}],"vertical":[{"label":"垂直方向定位","component":"chooseData","items":[{"key":"top","label":"上"},{"key":"bottom","label":"下"}]}]}},"attrs":{"style":{"layout":{"width":"136","height":"596","backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926095353465_585.png)"}},"target":"parent","horizontal":{"key":"left","value":"-1300"}},"children":[{"guid":"f1153ccf-dd92-4b55-b6da-6bf5e66af9be","name":"hotMap","module":{"name":"hotMap","editable":{"style":{"layout":["basic","position"]},"href":[{"label":"连接","component":"attrs"}]}},"attrs":{"style":{"layout":{"width":"60","height":"52","border":"1px solid #333","top":510,"margin":"","left":30}},"href":"#123"}}]}]}]},{"guid":"d48dc166-e582-4647-8f64-d77e16a7fdb9","name":"floor","module":{"name":"floor","menus":["pre-image","tab","floor","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]}}},"attrs":{"style":{"layout":{"backgroundImage":"url(https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170926095235519_212.jpg)","height":"8559"}}}}]

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