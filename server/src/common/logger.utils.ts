/*
 * @file: logger.utils.ts
 * @Author: shijh
 * @CreateDate: 2017-12-15 14:22:03
 * @Last Modified by: shijh
 * @Last Modified time: 2017-12-22 11:19:51
 *
 * 日志管理初始化
 */
import * as winston from 'winston';

// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     verbose: 3,
//     debug: 4,
//     silly: 5
// }

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple()
    ),
    transports: [
        // 错误日志
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        // 警告日志
        new winston.transports.File({ filename: './logs/warn.log', level: 'warn' }),
        // 提示日志
        new winston.transports.File({ filename: './logs/info.log', level: 'info' })
    ]
});

// 如果不是正式环境将消息打印到控制台
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export default logger;