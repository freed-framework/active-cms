import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

import logger from '../logger.utils';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
    resolve(...args: any[]): ExpressMiddleware {
        return (req, res, next): void => {
            req.logger = logger;

            next();
        }
    }
}
