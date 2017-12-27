import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as _ from 'lodash';
import * as request from 'request';
import * as fs from 'fs';
import * as path from 'path';
import { resolve } from 'url';
import LocalModel from './local.model';
import CommonService from '../../common/common.service';
import ENV from '../../config/env';
import Utils from '../../common/utils';
import { success } from '../../common/common.utils';
import logger from '../../common/logger.utils';

@Component()
export class LocalService {

    /**
     * 获取本地上传zip列表
     */
    async get(query) {
        const { content, pageSize, page } = query;
        const start = (page - 1) * pageSize;
        const param = {title: {$regex: content, $options: 'i'}};

        const result = await Promise.all([
            LocalModel.count(param).exec((err, count) => {
                return count;
            }),
            LocalModel
                .find(param)
                .skip(start)
                .limit(pageSize * 1)
                .populate('createUser', {password: 0})
                .populate('owerUser', {password: 0})
                .sort({ updateTime: -1 })
                .exec((err, doc) => {
                    return doc;
                }
            )
        ])

        return success({
            lists: result[1],
            total: result[0],
            pageSize,
            page
        })
    }

    /**
     * 新建本地活动页
     */
    async post(body, user) {
        const { title, pushId, pageType, thumbnail } = body;

        const result = await LocalModel.create({
            createUser: user._id,
            owerUser: user._id,
            title,
            pushId,
            pageType,
            thumbnail
        }, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }

            return doc;
        })

        return success(result)
    }
}
