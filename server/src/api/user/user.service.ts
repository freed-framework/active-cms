import { Component } from "@nestjs/common";
import { HttpException } from '@nestjs/core';
import * as _ from 'lodash';
import UsersModel from './user.model';
import { FolderService } from '../folder/folder.service';

const folderService = new FolderService()

@Component()
export class UsersService {
    /**
     * 通过id获取指定用户
     */
    async one(id) {
        const result = await UsersModel.findById(id, {password: 0, salt: 0, folder: 0}, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })

        return result;
    }

    /**
     * 通过用户名或者邮箱获取用户
     *
     * @param name 用户名或者邮箱
     */
    async findByName(name) {
        const result = await await UsersModel.findOne({}).or([{ email: name }, { userName: name }]).exec();



        return result;
    }

    /**
     * 查询全部用户
     */
    async getAllUsers() {
        const result = await UsersModel.find({}, {password: 0}, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return result;
    }

    /**
     * 查询指定id
     * @param {string} id 用户id
     */
    async getUser(param) {
        const result = await UsersModel.findOne(param, {password: 0}, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return result;
    }

    /**
     * 登录接口
     * @param param {Object} 登录参数
     */
    async login(param) {
        const { userName, password } = param;
        let token = '';

        await UsersModel.findOne({userName}, (err, doc: any) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            const auth: boolean = doc.validPassword(password);
            if (!auth) {
                throw new HttpException('用户名或密码错误', 500);
            }
            token = doc.generateJwt();
        })

        return token;
    }

    /**
     * 新增用户
     * @param {Object} user 新增用户信息
     */
    async addUser(user) {
        const model: any = new UsersModel(user);
        model.setPassword(user.password);

        const result: any = model.save((err, user: any) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }

            const folder: any = folderService.initFolder(user._id, user.userName).then((res) => {
                user.folder = res._id;
                user.save();
            });

            return user;
        })

        const token = model.generateJwt();

        return {token};
    }
}
