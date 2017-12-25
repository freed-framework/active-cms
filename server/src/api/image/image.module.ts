import {
    Module, MiddlewaresConsumer, RequestMethod,
} from '@nestjs/common';

import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { UploadMiddleware } from '../../common/middlewares/upload.middleware';
import { FileMiddleware } from '../../common/middlewares/file.middleware';
import { JwtMiddleware } from '../auth/auth.middleware';

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
            .apply(FileMiddleware)
            .forRoutes({
                path: '/image',
                method: RequestMethod.POST
            })
            .apply(JwtMiddleware)
            .forRoutes(ImageController)

    }
}
