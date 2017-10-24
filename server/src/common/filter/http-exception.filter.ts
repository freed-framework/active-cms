import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, response) {
        const status = exception.getStatus();
        const message = exception.getResponse();

        response.status(200).json({
            code: status,
            message: message
        })
    }
}
