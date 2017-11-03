/**
 * @file folder.model.ts
 * @author shijh
 *
 * folder Schema
 */

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FolderScgema = new Schema({
    // 对应用户
    ower: { type: Schema.Types.ObjectId, ref: 'Users' },

    // 对应页面
    page: { type: Schema.Types.ObjectId, ref: 'Pages', default: null },

    // 文件夹名
    name: { type: String },

    // 创建时间
    createTime: { type: Date, default: Date.now },

    // 层级
    level: { type: Number, default: 0 },

    // 图片地址
    images: { type: Schema.Types.ObjectId, ref: 'Urls' },

    // 子文件夹
    childrens: [{ type: Schema.Types.ObjectId, ref: 'Folders' }]
})

export default mongoose.model('Folders', FolderScgema);
