import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param
} from '@nestjs/common';
import { ImageService } from './image.service';
import CommonService from '../../common/common.service';

@Controller('image')
export class UrlController {
    constructor(private imageService: ImageService) {}

}