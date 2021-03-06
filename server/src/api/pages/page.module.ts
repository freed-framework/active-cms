import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { ForkModule, ShareModule } from '../';
import { DevelopmentMiddleware } from '../../common/middlewares/development.middleware';
import { JwtMiddleware } from '../auth/auth.middleware';

@Module({
    controllers: [
        PageController
    ],
    components: [
        PageService
    ],
    modules: [
        ForkModule,
        ShareModule
    ]
})
export class PageModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(DevelopmentMiddleware)
            .forRoutes(PageController)
            .apply(JwtMiddleware)
            .forRoutes(PageController)
        }
}
