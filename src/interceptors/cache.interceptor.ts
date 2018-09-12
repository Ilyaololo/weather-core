import { CacheInterceptor as HttpCacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

import * as qs from 'qs';

@Injectable()
export class CacheInterceptor extends HttpCacheInterceptor {
  public trackBy(context: ExecutionContext): string {
    const [obj, args, ctx, info] = context.getArgs();

    return `${info.fieldName}(${qs.stringify(args)})`;
  }
}
