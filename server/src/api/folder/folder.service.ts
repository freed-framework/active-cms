/**
 * @file folder.service.ts
 * @author shijh
 *
 * folder service
 */

import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import FolderModel from './folder.model';
import { folderInterface } from '../../interfaces/folder.interface'

@Component()
export class FolderService {
    /**
     * 新增文件夹
     * @param {Object} data 文件夹信息 
     */
    async add(folder: folderInterface) {
        const model: any = new FolderModel(folder);

        const result: any = model.save((err, folder) => {

            if (err) {
                throw new HttpException('系统错误', 500);
            }

            return folder;
        })

        return result;
    }

    /**
     * 更新文件夹
     */
    async update(param: any, data: any) {
        return await FolderModel.update(param, data, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }

            return doc;
        })
    }
}
