/**
 * @file Url.model.ts
 * @author shijh
 *
 * Url Schema
 */

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    // folder 链接
    folder: { type: Schema.Types.ObjectId, ref: 'Folders' },

    // 图片地址
    urls: [{
        // 图片地址
        url: { type: String },

        // 图片宽度
        width: { type: Number, default: 0 },

        // 图片高度
        height: { type: Number, default: 0 },

        // 图片大小
        size: { type: Number, default: 0 },

        // 上传时间
        time: { type: Date, default: Date.now }
    }]
})

export default mongoose.model('Urls', ImageSchema);
