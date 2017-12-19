/*
 * @file: common.guard.ts
 * @Author: shijh
 * @CreateDate: 2017-12-18 10:13:50
 * @Last Modified by: shijh
 * @Last Modified time: 2017-12-18 10:58:23
 *
 * 用户权限验证
 */
import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';

@Guard()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(req, context: ExecutionContext): boolean {
        const { parent, handler } = context;
        const roles = this.reflector.get<string[]>('roles', handler);

        if (!roles) {
            return true;
        }

        const user = req.user;
        const guards = user.roles.split(',');

        const hasRole = () => !!guards.find((role) => !!roles.find((item) => item === role));
        return user && user.roles && hasRole();
    }
}
