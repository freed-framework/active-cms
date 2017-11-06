import {
    Module, MiddlewaresConsumer, RequestMethod,
} from '@nestjs/common';

import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { AuthMiddleware } from '../../common/middlewares/auth.middleware';
import { UploadMiddleware } from '../../common/middlewares/upload.middleware';

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
            .forRoutes(ImageController)
            .apply(UploadMiddleware)
            .forRoutes({
                path: '/*',
                method: RequestMethod.POST
            })
    }
}
