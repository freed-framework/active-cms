/**
 * @file Url.service.ts
 * @author shijh
 *
 * Url service
 */

import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import UrlModel from './url.model';
import { urlInterface } from '../../interfaces/url.interface'

@Component()
export class UrlService {
    /**
     * 新建图片地址存储地址
     */
    async add(url: String) {
        return await UrlModel.create({folder: url}, (err, url) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }

            return url;
        })

    }

    /**
     * 查询指定地址
     */
    async one(id: String) {
        return await UrlModel.findOne({folder: id}, (err, url) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }

            return url;
        });
    }

    /**
     * 更新地址
     */
    async update(param: any, data: any) {
        return await UrlModel.update(param, data, (err, url) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }

            return url;
        })
    }

    /**
     * 查询并创建文件夹
     *
     * @param folder 文件夹id
     * @param image 图片内容
     */
    async findCreate(folder: String, image: any) {
        let url: any = await this.one(folder);

        if (!url) {
            url = await this.add(folder);
        }

        await this.update({
            folder
        }, {
            $addToSet: { urls: image }
        });

        return {folder, url: url._id};
    }
}
