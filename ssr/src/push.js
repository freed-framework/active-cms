import Template from './template';
import UploadZip from './uploadZip';
import ENV from './env';

const nodeENV = process.env.NODE_ENV;

const download = (req, res, next) => {
    const { socket, body } = req;

    socket.emit(`push:progress:${body.id}`, {
        code: 200,
        progress: 1,
        message: "开始构建"
    })

    Template(body.id, socket, body).then(({folderZipPath, baseUrl, timeStmp}) => {
        UploadZip({folderZipPath, baseUrl, timeStmp, body})
        .then((result) =>{
            res.status(200).json(result);

            socket.emit(`push:progress:${body.id}`, {
                code: 200,
                progress: 100,
                message: "推送成功"
            })
        })
        .catch((e) => {
            res.status(500).json(e);

            socket.emit(`push:progress:${body.id}`, {
                code: 500,
                progress: 0,
                message: "推送失败"
            })
        })
    }).catch((e) => {
        res.status(500).json(e);

        socket.emit(`push:progress:${body.id}`, {
            code: 500,
            progress: 0,
            message: "推送失败"
        })
    })
}

export default download;