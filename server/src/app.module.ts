import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { CatsModule } from './api/cats/cats.module';
import { UsersModule } from './api/user/user.module';
import { PageModule } from './api/pages/page.module';
import { ForkModule } from './api/fork/fork.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { DevelopmentMiddleware } from './common/middlewares/development.middleware';
import { CatsController } from './api/cats/cats.controller';

@Module({
    modules: [
        CatsModule,
        UsersModule,
        PageModule,
        ForkModule
    ]
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        // consumer.apply(DevelopmentMiddleware).forRoutes('/page', RequestMethod.ALL);
    }
}