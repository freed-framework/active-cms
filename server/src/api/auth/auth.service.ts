import * as jwt from 'jsonwebtoken';
import { Component, HttpException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { success, authorization } from '../../common/common.utils';

@Component()
export class AuthService {

    constructor(private service: UsersService) { }

    async createToken(signedUser) {
        const expiresIn = 60 * 60, secretOrKey = 'xcdcxt';
        const user = { sub: signedUser._id, name: signedUser.name };
        const token = jwt.sign(user, secretOrKey, { expiresIn });
        return success({
            expires_in: expiresIn,
            access_token: token,
        })
    }

    async validateUser(payload): Promise<any> {
        const user = await this.service.one(payload.sub);
        if (!user) {
            // return authorization({}, '用户未授权')
            throw new HttpException('无效的授权', 404)
        }
        return user
    }

}
