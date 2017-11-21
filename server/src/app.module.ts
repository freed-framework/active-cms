import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { DevelopmentMiddleware } from './common/middlewares/development.middleware';
import { CatsController } from './api/cats/cats.controller';
import { PublishMiddleware } from './common/middlewares/publish.middleware';

import { CatsModule } from './api/cats/cats.module';
import { UsersModule } from './api/user/user.module';
import { PageModule } from './api/pages/page.module';
import { ForkModule } from './api/fork/fork.module';
import { FolderModule } from './api/folder/folder.module';
import { UrlModule } from './api/url/url.module';
import { ImageModule } from './api/image/image.module';

@Module({
    modules: [
        CatsModule,
        UsersModule,
        PageModule,
        ForkModule,
        FolderModule,
        UrlModule,
        ImageModule
    ]
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        // consumer.apply(PassportMiddleware).forRoutes({path: '/*', method: RequestMethod.ALL})
        consumer
            .apply(DevelopmentMiddleware)
            .forRoutes({path: '/*', method: RequestMethod.ALL})
            .apply(PublishMiddleware)
            .forRoutes({path: '/publish/zip', method: RequestMethod.ALL});
    }
}