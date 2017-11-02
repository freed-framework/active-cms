/**
 * @file user.model.ts
 * @author shijh
 *
 * 用户Schema
 */

import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    // 用户名
    userName: { type: String, unique: true, required: true },

    // 密码
    password: { type: String },

    // 密码hash
    salt: { type: String },

    // 显示名
    userDspName: String,

    // 性别0：女，1：男
    sex: { type: Number, default: 1 },

    // 生日
    birthday: {type: Date, default: Date.now},

    // 文件夹
    folder: { type: Schema.Types.ObjectId, ref: 'Folders' },

    // 手机号
    phone: Number,

    // 邮箱
    email: { type: String, required: true },

    // 是否可用, 默认可用
    activity: {type: Boolean, default: true},

    // ？
    userType: {type: String},

    // ?
    style: {type: String}
}, {
    versionKey: false
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    console.log(this.salt)
    //1000代表迭代次数 64代表长度
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password === hash;
};

UserSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: expiry.getTime() / 1000
    }, process.env.JWT_SECRET);
};

export default mongoose.model('Users', UserSchema);
