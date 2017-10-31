import {
    Module, MiddlewaresConsumer, RequestMethod,
} from '@nestjs/common';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { AuthMiddleware } from '../../common/middlewares/auth.middleware';

@Module({
    controllers: [
        FolderController
    ],
    components: [
        FolderService
    ]
})
export class FolderModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(FolderController)
    }
}
