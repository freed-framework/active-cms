
/**
 * @file upload.middleware.ts
 * @author shijh
 *
 * 上传middleware
 */
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import {
    Middleware, NestMiddleware
} from '@nestjs/common';

import * as multipart from 'connect-multiparty';

import CommonService from '../common.service';

const multipartMiddleware = multipart();

@Middleware()
export class UploadMiddleware implements NestMiddleware {
    resolve() {
        return multipartMiddleware;
    }
}
