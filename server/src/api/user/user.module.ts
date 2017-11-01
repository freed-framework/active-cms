import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { FolderModule } from '../folder/folder.module'

@Module({
    controllers: [
        UsersController,
    ],
    components: [
        UsersService,
    ],
    modules: [
        FolderModule
    ]
})
export class UsersModule {
    configure(consumer: MiddlewaresConsumer) {
        // consumer
        //     .apply(AuthMiddleware)
        //     .forRoutes(UsersController)
        //     .apply(LoginMiddleware)
        //     .forRoutes({
        //         path: 'users/login',
        //         method: RequestMethod.ALL
        //     })
            // .forRoutes({
            //     path: 'api/*',
            //     method: RequestMethod.ALL
            // })
    }
}
