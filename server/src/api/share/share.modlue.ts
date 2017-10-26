import {
    Module, MiddlewaresConsumer, RequestMethod,
} from '@nestjs/common';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';
import { AuthMiddleware } from '../../common/middlewares/auth.middleware';

@Module({
    controllers: [
        ShareController
    ],
    components: [
        ShareService
    ]
})
export class ShareModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(ShareController)
    }
}
