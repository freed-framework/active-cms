import path from 'path';
import fs from 'fs';
import zip from 'zipfolder';

const cpy = require('cpy');
import ENV from './env';

const nodeENV = process.env.NODE_ENV;

const publicPath = /(\/ssrPath\/)/ig;

const Template = (id, socket) => {
  return new Promise((resolve, reject) => {
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

    cpy(['../client/dist-ssr/*'], baseUrl).then(() => {

      socket.emit(`push:progress:${id}`, {
        code: 200,
        progress: 30,
        message: "复制完成"
      })

      // 修改html中地址
      const htmlString = fs.readFileSync(baseUrl + '/index.html', "utf-8");  
      const newHtmlString = htmlString.replace(publicPath, 'http://localhost/');
      fs.writeFileSync(baseUrl + '/index.html', newHtmlString);

      // 修改vendor中地址
      const svendorString = fs.readFileSync(baseUrl + '/vendor.js', "utf-8");  
      const newVendorString = svendorString.replace(publicPath, 'http://localhost/');
      fs.writeFileSync(baseUrl + '/vendor.js', newVendorString);

      // 修改index.js 中模板数据
      const scriptString = fs.readFileSync(baseUrl + '/index.js', "utf-8");  
      const newScriptString = scriptString.replace(/{data:\[\],pageType:\"mobile\"}/ig, function() {
        return '{data: [{"guid":"ec-module-addbed91-6089-4d04-8224-4fc09138f71d","name":"mobile/layer","displayName":"哈哈哈","children":[{"guid":"ec-module-1bcbcd12-aeb2-450d-83be-83a2bb4c2b02","name":"mobile/img","componentProps":{"src":"http://xcscapp.yatang.com.cn/images/beijing/beijing_03.jpg"}}],"componentProps":{"style":{"layout":{"padding":"10"}}}},{"guid":"ec-module-a40cabe9-20f5-4354-a973-390679b86191","name":"mobile/list","children":[{"guid":"ec-module-ce995704-f115-4a9f-b124-92d2c6f8e000","name":"mobile/img","componentProps":{"src":"http://sit.image.com/group2/M00/00/2B/rB4KPFoEI5WAKGgLAAGdIG6Shk4161.png"}},{"guid":"ec-module-77d41d96-4112-421d-99e6-931549b9b1ca","name":"mobile/img","componentProps":{"src":"http://sit.image.com/group1/M00/01/86/rB4KPVoEI5WAKwK4AAFKFa1-IG4764.png"}},{"guid":"ec-module-31d15a74-f736-4bbc-bd6d-013be5a253df","name":"mobile/img","componentProps":{"src":"http://xcscapp.yatang.com.cn/images/beijing/beijing_05.jpg","url":"http://wwww.baidu.com"}},{"guid":"ec-module-61de5d61-ddbb-435b-ab8c-29dcec15cdf7","name":"mobile/img","componentProps":{"src":"http://sit.image.com/group2/M00/00/2B/rB4KPVoEI5WANPP6AAFLLXPxl1Y065.png"}}],"componentProps":{"cols":2,"style":{"layout":{"padding":"10","backgroundColor":"rgba(106, 94, 170, 1)"}},"extendsProps":{"style":{"layout":{"padding":"10"}}}}}],pageType: "pc"}'
      });

      fs.writeFileSync(baseUrl + '/index.js', newScriptString);
      zip.zipFolder({ folderPath: baseUrl });

      resolve({folderZipPath, baseUrl, timeStmp});
    });
  })

}

export default Template;
