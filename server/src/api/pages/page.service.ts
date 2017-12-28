import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as _ from 'lodash';
import * as request from 'request';
import * as fs from 'fs';
import * as path from 'path';
import { resolve } from 'url';
import PageModel from './page.model';
import CommonService from '../../common/common.service';
import { ForkService, ShareService } from '../';
import ENV from '../../config/env';
import Utils from '../../common/utils';
import logger from '../../common/logger.utils';

const forkService = new ForkService();
const shareService = new ShareService();


/**
 * base64 to buffer
 */
function decodeBase64Image(dataString) {
    let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response: any = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

@Component()
export class PageService {
    /**
     * 获取某个页面
     * @param id {ObjectId} 页面id
     */
    async getPage(id, ig = {}) {
        const result = await PageModel.findById(id, ig, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return result;
    }

    /**
     * 删除页面id
     * @param id {ObjectId} 页面id
     */
    async removePage(id) {
        return await Promise.all([
            PageModel.remove({_id: id}, (err) => {
                if (err) {
                    throw new HttpException('系统错误', 500);
                }
                return {};
            }),
            shareService.delete({page: id})
        ]).then((param) => {
            return {}
        })
    }

    /**
     * 分级查询
     * @param param 分页查询（通过title模糊查询）
     */
    async pagingQuery(param, query) {
        const {
            page = 1, pageSize = 10, populate = '',
            title = '', sortParams = { updateTime: -1 }
        } = param;

        const start = (page - 1) * pageSize;

        const result = await Promise.all([
            PageModel.count(query).exec((err, count) => {
                return count;
            }),
            PageModel
                .find(query, {content: 0, __v: 0})
                .skip(start)
                .limit(pageSize * 1)
                .populate('forkId', {password: 0})
                .populate('createUser', {password: 0})
                .populate('owerUser', {password: 0})
                .sort(sortParams)
                .exec((err, doc) => {
                    return doc;
                }
            )
        ])
        return {
            lists: result[1],
            total: result[0],
            pageSize,
            page
        };
    }

    /**
     * fork 页面
     * @param id pageId
     */
    async updateFork(userId, pageId, title) {
        const page: any = await PageModel.findById(pageId, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc
        });

        const {
            _id, forkId, owerUser, forkTime,
            fork, createUser, createTime, content,
            pageType
        } = page;

       const pageDta = await this.addPage({
            owerUser: userId,
            parentId: pageId,
            forkNum: 0,
            fork: true,
            createUser,
            pageType,
            title,
            body: {
                content: content ? content : {},
            },
            createTime,
        })

        let result: any = {
            _id: forkId
        };

        if (forkId) {
            await forkService.update(
                { page: pageId },
                {
                    $addToSet: { forkUser: { userId, newPage: pageDta.data.id }
                },
            })
        } else {
            result = await forkService.add({
                page: pageId,
                forkUser: [{ userId, newPage: pageDta.data.id }]
            })
        }
        await PageModel.findByIdAndUpdate(pageId, {$inc: {forkNum: 1}, forkId: result._id});
        return pageDta;
    }

    /**
     * 通过id跟新页面
     * @param id {ObectId} 页面id
     * @param page {Object} 页面数据
     */
    async updatePage(id, page) {
        const { ...props } = page;

        const result = await PageModel.findByIdAndUpdate(id, props, (err, doc: any) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }

            return doc;
        })
        return CommonService.commonResponse(result);
    }

    /**
     * 更新页面
     * @param id {ObjectId} 页面id
     * @param param {Object} 需要修改的值
     */
    async update(id, param) {
        const { ...props } = param;

        const result = await PageModel.findByIdAndUpdate(id, props, (err, doc: any) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }

            return doc;
        })
        return result;
    }

    /**
     * 分享页面给指定用户
     * @param param {Onject} 分享参数
     */
    async share(param) {
        const { userId, pageId } = param;
        const result = await shareService.add({
            user: userId,
            page: pageId
        })
        return CommonService.commonResponse(result);
    }

    /**
     * 新增页面
     * @param {Object} page 页面信息
     */
    async addPage(page) {
        const { body, ...param } = page;
        const { content, ...props } = body;
        const parse = content;
        const result: any = await PageModel.create({
            ...param,
            ...props,
            content: parse
        }, (err, doc: any) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }

            return doc;
        })

        return  CommonService.commonResponse({id: result._id});
    }

    /**
     * 修改title
     * @param {string} id 页面id
     * @param {string} title 新title信息
     */
    async changeTitle(id, title) {
        const result: any = await PageModel.findByIdAndUpdate(id, {$set: {title: title}}, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })

        return CommonService.commonResponse(result);
    }

    /**
     * 写入id
     * @param {string} id 页面id
     * @param {number} pushId 推送id
     */
    async pushId(id, pushId) {
        const result: any = await PageModel.findByIdAndUpdate(id, {$set: {pushId: pushId}}, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })

        return CommonService.commonResponse(result);
    }

    /**
     * 推送页面
     * @param body {Object} http body
     */
    async push(body, userId) {
        const {
            id,
            ...field
        } = body;

        const page: any = await this.getPage(id);
        let newPage: any = Utils.parseContent(page);

        return new Promise((resolve, reject) => {
            // `${ENV.domain}/ssr/push`
            request({
                url: `${ENV.domain}/ssr/push`,
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: {
                    ...field,
                    id,
                    uploadUserId: userId,
                    content: newPage.content,
                    title: newPage.title,
                    pageType: newPage.pageType
                }
            }, (err, response, res) => {
                if (err) {
                    logger.error("%s 推送页面失败， 时间： %s", userId, new Date())

                    throw new HttpException('系统错误', 500);
                }
                const { data } = res;
                const re: any = this.pushId(id, data);

                resolve({code: 200, message: "请求成功", data });
            });
        })
    }

    /**
     * 删除推送（内部接口）
     * @param id {string} 推送的id
     */
    async pushDelete(id) {
        return new Promise((resolve, reject) => {
            request(`${ENV.api}/commonUploadFile/deleteZipById?id=${id}`, (err, response, body) => {
                if (err) {
                    logger.error("删除页面失败， 页面id： %s， 时间： %s", id, new Date())

                    reject(err);
                }

                PageModel.update({pushId: id}, {pushId: 0}, (err, doc) => {
                    if (err) {
                        reject(err);
                    }

                    resolve({code: 200, message: "删除成功", data: {}});
                })
            });
        })
    }
}
