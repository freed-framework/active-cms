import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { FolderModule } from '../folder/folder.module'
import { JwtMiddleware } from '../auth/auth.middleware';

@Module({
    controllers: [
        UsersController,
    ],
    components: [
        UsersService,
    ],
    modules: [
        FolderModule
    ],
    exports:[ UsersService ]
})
export class UsersModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer
            .apply(JwtMiddleware)
            .forRoutes(UsersController)
    }
}
