import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

import * as toobusy from 'toobusy-js';

@Injectable()
export class ToobusyMiddleware implements NestMiddleware {
  public resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      if (toobusy()) { // TODO
        // throw new ServiceUnavailableException();
      }

      next();
    };
  }
}
