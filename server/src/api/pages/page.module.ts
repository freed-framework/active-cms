import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { ForkModule, ShareModule } from '../';
import { AuthMiddleware } from '../../common/middlewares/auth.middleware';
import { DevelopmentMiddleware } from '../../common/middlewares/development.middleware';
import { LoginMiddleware } from '../../common/middlewares/login.middleware';

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
            .apply(AuthMiddleware)
            .forRoutes(PageController)
            .apply(LoginMiddleware)
            .forRoutes(PageController)
        }
}
