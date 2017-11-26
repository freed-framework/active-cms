import request from 'request';
import rimraf from 'rimraf';
import Progress from './socket';

const UploadZip = ({folderZipPath, baseUrl, timeStmp, body}) => {
  /**
     * id {string} 页面id
     * uploadUserId {string} 上传用户
     * description {string} 描述
     * effectTime {Date} 生效时间
     * invalidTime {Date} 有效时间
     * activityName {sting} 活动名称
     */
  const {
      id, uploadUserId, content, title,
      ...field
  } = body;

  return new Promise((resolve, reject) => {
    const formData = {
      uploadUserId,
      ...field,
      file: {
          value: fs.createReadStream(folderZipPath),
          options: {
              filename: `${timeStmp}.zip`
          }
      }
    };
  
    request.post({ url: `${ENV.domain}/api/publish/zip`, formData: formData }, (err, httpResponse, res) => {
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