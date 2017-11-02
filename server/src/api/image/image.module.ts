import {
    Module, MiddlewaresConsumer, RequestMethod,
} from '@nestjs/common';

import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { AuthMiddleware } from '../../common/middlewares/auth.middleware';

@Module({
    controllers: [
        ImageController
    ],
    components: [
        ImageService
    ]
})
export class ImageModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(UrlController)
    }
}
