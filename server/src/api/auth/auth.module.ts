import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { LogInMiddleware } from '../auth/auth.middleware';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/user.module';

@Module({
    components: [AuthService, JwtStrategy, LocalStrategy],
    controllers: [AuthController],
    modules: [UsersModule]
})
class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(LogInMiddleware).forRoutes(AuthController)
    }
}

export default AuthModule;
