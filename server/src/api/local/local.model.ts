/**
 * @file page.model.ts
 * @author shijh
 *
 * 页面Schema
 */

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LocalSchema = new Schema({
    // 创建人id
    createUser: { type: Schema.Types.ObjectId, ref: 'Users' },
    // 所属人id
    owerUser: { type: Schema.Types.ObjectId, ref: 'Users' },
    // 页面title
    title: { type: String, default: '静态页面' },
    // 创建时间
    createTime: { type: Date, default: Date.now },
    // 更新时间
    updateTime: { type: Date, default: Date.now },
    // 发布id
    pushId: { type: Number, default: 0 },
    // 页面类型pc/mobile
    pageType: { type: String, required: true },
    // 缩略图片地址
    thumbnail: { type: String, default: '' },
    // zip包名
    timeStmp: { type: String}
}, {
    versionKey: false
});

export default mongoose.model('Locals', LocalSchema);
