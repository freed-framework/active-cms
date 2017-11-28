import path from 'path';
import fs from 'fs';
import zip from 'zipfolder';

const cpy = require('cpy');
import ENV from './env';

const nodeENV = process.env.NODE_ENV;
const isMobile = true;

const publicPath = /(\/ssrPath\/)/ig;

const Template = (id, socket, body) => {
  return new Promise((resolve, reject) => {
    const { pageType } = body;
    const timeStmp = `${id}${new Date() * 1}`;
    const baseUrl = path.join(__dirname, '../render', timeStmp);
    const folderZipPath = baseUrl + '.zip';

    socket.emit(`push:progress:${id}`, {
      code: 200,
      progress: 10,
      message: "开始打包"
    })
    
    if (!fs.existsSync(baseUrl)) {
        fs.mkdirSync(baseUrl);
    }

    socket.emit(`push:progress:${id}`, {
      code: 200,
      progress: 12,
      message: "开始复制页面"
    })

    cpy([`../client/pkg-${pageType}/*`], baseUrl).then(() => {

      socket.emit(`push:progress:${id}`, {
        code: 200,
        progress: 30,
        message: "复制完成"
      })

      // 修改html中地址
      const htmlString = fs.readFileSync(baseUrl + '/index.html', "utf-8");  
      const newHtmlString = htmlString.replace(publicPath, `${ENV.publicPath}${timeStmp}/`);
      fs.writeFileSync(baseUrl + '/index.html', newHtmlString);

      // 修改vendor中地址
      const svendorString = fs.readFileSync(baseUrl + '/vendor.js', "utf-8");  
      const newVendorString = svendorString.replace(publicPath, `${ENV.publicPath}${timeStmp}/`);
      fs.writeFileSync(baseUrl + '/vendor.js', newVendorString);

      // 修改index.js 中模板数据
      const scriptString = fs.readFileSync(baseUrl + '/index.js', "utf-8");
      const newScriptString = scriptString.replace(/{data:\[\],pageType:\"mobile\"}/ig, function() {
        return `{data: ${JSON.stringify(body.content)},pageType: "mobile"}`
      });

      fs.writeFileSync(baseUrl + '/index.js', newScriptString);
      zip.zipFolder({ folderPath: baseUrl }, () => {
        resolve({folderZipPath, baseUrl, timeStmp});
      });
    });
  })

}

export default Template;