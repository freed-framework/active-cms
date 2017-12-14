import {
    Module, MiddlewaresConsumer, RequestMethod,
} from '@nestjs/common';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';
import { JwtMiddleware } from '../auth/auth.middleware';

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
            .apply(JwtMiddleware)
            .forRoutes(ShareController)
    }
}
