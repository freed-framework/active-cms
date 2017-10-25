import {
    Controller, UsePipes, UseGuards, Param,
    Get, Post, Body, Res, Req, HttpStatus,
    UseFilters, ReflectMetadata, UseInterceptors
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { CreateCatDto } from '../../dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Exception } from '../../common/exception/error.exception';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { ValidationPipe } from '../../common/pipe/validation.pipe';
import { ParseIntPipe } from '../../common/pipe/parse-int.pipe';
import { RolesGuard } from '../../common/guard/roles.guard';
import { Roles } from '../../common/decorator/roles.decorator';
import { LoggingInterceptor } from '../../common/interceptor/logging.interceptor';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())
// @UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    async findAll() {
        throw new Exception('未知错误', 503);
        // return this.catsService.findAll();
    }

    @Get(':id')
    async getOne(@Param('id', new ParseIntPipe()) id) {
        console.log(typeof id)
    }

    @Post()
    // @UsePipes(new ValidationPipe())
    @Roles('admin')
    async create(@Body() createCatDto: CreateCatDto) {
        // this.catsService.create(createCatDto)
        throw new Exception('未知错误');
    }
}
