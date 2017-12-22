import {
    Module, MiddlewaresConsumer, RequestMethod,
} from '@nestjs/common';

import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';

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
        // consumer
        //     .apply(AuthMiddleware)
        //     .forRoutes(FolderController)
    }
}
