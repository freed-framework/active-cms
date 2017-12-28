require('dotenv').load();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import { NestFactory } from '@nestjs/core';

import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import * as flash from 'express-flash';
import * as config from './config/environment';
import { ApplicationModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
// import { RolesGuard } from './common/guard/roles.guard';
// import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

// mongodb 链接
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    app.setGlobalPrefix('api');
    app.use(bodyParser.json({limit: '100mb'}));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use(cookieParser('node-auth'));
    app.use(session({
        secret: 'node-auth',
        name: 'name',
        cookie: {maxAge: 60000},
        resave: false,
        saveUninitialized: true
    }));

    app.use(flash())

    app.useGlobalFilters(new HttpExceptionFilter());
    //   app.useGlobalInterceptors(new LoggingInterceptor())
    //   app.useGlobalGuards(new RolesGuard());

    await app.listen(3000);
}

bootstrap();
