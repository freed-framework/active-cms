import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

export class Exception extends HttpException {
    constructor(messgae?: string, code?: number) {
        super(messgae || '异常', code || 500);
    }
}
