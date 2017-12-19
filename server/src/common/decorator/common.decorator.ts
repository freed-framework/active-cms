/*
 * @file: common.decorator.ts
 * @Author: shijh
 * @CreateDate: 2017-12-18 10:53:31
 * @Last Modified by: shijh
 * @Last Modified time: 2017-12-18 10:55:06
 *
 * 公共装饰器
 */
import { ReflectMetadata } from '@nestjs/common';

/**
 * 定义角色公共方法
 * @param roles {string} 角色
 */
export const Roles = (...roles: string[]) => ReflectMetadata('roles', roles);
