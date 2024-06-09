import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  #logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, baseUrl: url } = request;
    const requestDate = Date.now();

    response.on('finish', () => {
      const { statusCode } = response;

      this.#logger.log(
        `${method} - ${url}: ${statusCode} - ${Date.now() - requestDate} ms`,
      );
    });

    next();
  }
}
