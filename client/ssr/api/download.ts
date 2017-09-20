import React from 'react';
import ReactDOM from 'react-dom/server';
import { Router } from 'express';
// import Page from '../models/page';
// import Body from '../components/PublishPage/body';
// import Html from '../components/PublishPage/html';
// import mkdirp from 'mkdirp';
import path from 'path';
import fs from '../utils/fs';
import { compileTemplate } from '../utils/compile';
const router = new Router();

const findOnePage = (pageId) => new Promise((resolve, reject) => {
    resolve([{"name":"floor","guid":"ddddds11-1ead-43ae-b6de-e6debb958b08","style":{"layout": {"height":100}}},{"name":"floor","guid":"237d6d2c-1034-4f76-a5c8-6678b9a3cb78","style":{"height":60}}])
//   Page.findOne({_id: pageId}).then(page => {
//     resolve(page);
//   });
});

router.get('/', async (req, res, next) => {
  try {
    // const pageId = req.body.pageId;
    const pages = await findOnePage(123);
    console.log(pages)
    // const props = {
    // //   props: page.config.props
    // };

    for (let i in pages) {
      let component = pages[i];
      if (component.name && component.guid) {
        let filePath = path.join(__dirname, '../../publish', 'components', component.name, 'App.js');
        component.fileContent = await fs.readFile(filePath);
      }
    }

    // // todo felix
    // // props.body = ReactDOM.renderToStaticMarkup(<Body page={page} serverRendering={true} />);

    const data = await compileTemplate(pages);
    // // props.script = data.fileContent.toString();

    // // const htmlString = ReactDOM.renderToStaticMarkup(<Html  {...props} />);
    // // const destHtml = data.outputPath + '/index.html';
    // // await fs.writeFile(destHtml, htmlString);
    // res.status(200).send({
    //   retcode: 0
    // });
  } catch (err) {
    next(err);
  }
});

export default router;

