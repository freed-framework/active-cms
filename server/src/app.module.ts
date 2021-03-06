import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { DevelopmentMiddleware } from './common/middlewares/development.middleware';
import { PublishMiddleware } from './common/middlewares/publish.middleware';
import { PushMiddleware } from './common/middlewares/push.middlerware';

import { UsersModule } from './api/user/user.module';
import { PageModule } from './api/pages/page.module';
import { ForkModule } from './api/fork/fork.module';
import { FolderModule } from './api/folder/folder.module';
import { UrlModule } from './api/url/url.module';
import { ImageModule } from './api/image/image.module';
import { LocalModule } from './api/local/local.module';
import AuthModule from './api/auth/auth.module';


@Module({
    modules: [
        UsersModule,
        PageModule,
        ForkModule,
        FolderModule,
        UrlModule,
        ImageModule,
        AuthModule,
        LocalModule
    ]
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        // consumer.apply(PassportMiddleware).forRoutes({path: '/*', method: RequestMethod.ALL})
        consumer
            .apply([DevelopmentMiddleware, LoggerMiddleware])
            .forRoutes({path: '/*', method: RequestMethod.ALL})
    }
}