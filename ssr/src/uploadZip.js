import fs from 'fs';
import request from 'request';
import rimraf from 'rimraf';
import ENV from './env';

const UploadZip = ({folderZipPath, baseUrl, timeStmp, body}) => {
  return new Promise((resolve, reject) => {

   /**
     * id {string} 页面id
     * uploadUserId {string} 上传用户
     * description {string} 描述
     * effectTime {Date} 生效时间
     * invalidTime {Date} 有效时间
     * activityName {sting} 活动名称
     */
    const {
        id, uploadUserId, content, title, zipId,
        ...field
    } = body;

    const formData = {
      uploadUserId: uploadUserId,
      ...field,
      file: {
          value: fs.createReadStream(folderZipPath),
          options: {
              filename: `${timeStmp}.zip`
          }
      }
    };

    zipId && (formData.id = zipId)

    request.post({ url: `${ENV.api}/commonUploadFile/uploadZip`, formData: formData }, (err, httpResponse, res) => {
        res = JSON.parse(res) || {};

        if (err) {
            reject(err);
            return;
        }

        rimraf(baseUrl, {}, () => { });
        rimraf(folderZipPath, {}, () => { });

        resolve(res);
    });
  })
}

export default UploadZip