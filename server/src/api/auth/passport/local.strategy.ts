import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { Component, Inject } from '@nestjs/common';
import { UsersService } from '../../user/user.service';

@Component()
export class LocalStrategy extends Strategy {
    constructor(private readonly service: UsersService) {
        super(
            {
                usernameField: 'name',
                passReqToCallback: false
            },
            async (name, password, done) => await this.logIn(name, password, done)
        );
        passport.use(this);
    }

    async logIn(name, password, done) {
        const user: any = await this.service.findByName(name)
            .then(user => {
                const u: any = user;

                if (!u) {
                    return done('用户名或密码错误', false);
                }
                else if (!u.validPassword(password)) {
                    return done('用户名或密码错误', false)
                }
                else {
                    return done(null, u);
                }
            })
            .catch(err => {
                done(err, false)
            })
    }

}