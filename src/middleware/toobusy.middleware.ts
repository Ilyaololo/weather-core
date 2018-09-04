import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class ToobusyMiddleware implements NestMiddleware {
  public resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      console.log('Request...');

      next();
    };
  }
}
