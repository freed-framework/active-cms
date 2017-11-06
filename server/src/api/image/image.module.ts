import {
    Module, MiddlewaresConsumer, RequestMethod,
} from '@nestjs/common';

import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { AuthMiddleware } from '../../common/middlewares/auth.middleware';
import { UploadMiddleware } from '../../common/middlewares/upload.middleware';
import { FileMiddleware } from '../../common/middlewares/file.middleware';

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
            .apply([UploadMiddleware, FileMiddleware])
            .forRoutes({
                path: '/*',
                method: RequestMethod.POST
            })
    }
}
