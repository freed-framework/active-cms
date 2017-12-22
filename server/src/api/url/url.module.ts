import {
    Module, MiddlewaresConsumer, RequestMethod,
} from '@nestjs/common';

import { UrlController } from './url.controller';
import { UrlService } from './url.service';

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
        // consumer
        //     .apply(AuthMiddleware)
        //     .forRoutes(UrlController)
    }
}
