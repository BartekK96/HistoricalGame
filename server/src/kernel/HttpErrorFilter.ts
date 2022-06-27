import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorResponse;
    const exceptionResponse: any = exception.getResponse();
    if (exceptionResponse.message) {
      errorResponse = {
        code: status,
        message:
          status !== HttpStatus.INTERNAL_SERVER_ERROR
            ? [exceptionResponse.message.toString()] || [
                exceptionResponse.message,
              ] ||
              null
            : ['Internal Server Error'],
      };
    } else {
      errorResponse = {
        code: status,
        message:
          status !== HttpStatus.INTERNAL_SERVER_ERROR
            ? [exception.message.toString()] || [exception.message] || null
            : ['Internal Server Error'],
      };
    }

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify({ ...errorResponse, ...{ body: request.body } }),
      'ExceptionFilter',
    );

    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
