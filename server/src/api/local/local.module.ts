import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { LocalController } from './local.controller';
import { LocalService } from './local.service';
import { DevelopmentMiddleware } from '../../common/middlewares/development.middleware';
import { JwtMiddleware } from '../auth/auth.middleware';
import { UploadMiddleware } from '../../common/middlewares/upload.middleware';

@Module({
    controllers: [
        LocalController
    ],
    components: [
        LocalService
    ]
})
export class LocalModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(DevelopmentMiddleware)
            .forRoutes(LocalController)
            .apply(JwtMiddleware)
            .forRoutes(LocalController)
            .apply(UploadMiddleware)
            .forRoutes({
                path: '/*',
                method: RequestMethod.POST
            })
        }
}
