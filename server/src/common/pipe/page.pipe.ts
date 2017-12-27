import { HttpException } from '@nestjs/core';
import { PipeTransform, Pipe, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as LZString from 'lz-string';

@Pipe()
export class encodeCreatePipe implements PipeTransform<any> {
    async transform(value, metadata: ArgumentMetadata) {
        const { content = [] } = value;
        value.content = LZString.compressToBase64(JSON.stringify(content));

        return value;
    }
}

@Pipe()
export class encodeUpdatePipe implements PipeTransform<any> {
    async transform(value, metadata: ArgumentMetadata) {
        const { content = [] } = value.page;
        value.page.content = LZString.compressToBase64(JSON.stringify(content));

        return value;
    }
}

@Pipe()
export class decodeGetPipe implements PipeTransform<any> {
    async transform(value, metadata: ArgumentMetadata) {
        // const { content = [] } = value.page;
        // value.page.content = LZString.compressToBase64(JSON.stringify(content));
        return value;
    }
}
