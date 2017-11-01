import {
    Module, MiddlewaresConsumer, RequestMethod,
} from '@nestjs/common';

import { UrlController } from './Url.controller';
import { UrlService } from './Url.service';
import { AuthMiddleware } from '../../common/middlewares/auth.middleware';

@Module({
    controllers: [
        UrlController
    ],
    components: [
        UrlService
    ]
})
export class UrlModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(UrlController)
    }
}
