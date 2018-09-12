import { createParamDecorator } from '@nestjs/common';

import { CursorPipe } from 'pipes';

export const Cursor = (sid: string = 'sid') => createParamDecorator((data: string, req: any) => {
  const [root, args, ctx, info] = req;

  return args.pagination;
})(new CursorPipe(sid));
