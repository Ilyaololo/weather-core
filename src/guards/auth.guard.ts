import { mixin, UnauthorizedException, CanActivate, ExecutionContext } from '@nestjs/common';

import * as passport from 'passport';

export interface AuthGuardOptions {
  session: boolean;
  property: string;
  callback: (err, user, info?) => any;
}

const defaultOptions: AuthGuardOptions = {
  session: false,
  property: 'user',
  callback: (err, user, info) => {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  },
};

export const AuthGuard = (type: string, opt: Partial<AuthGuardOptions> = {}) => {
  const options = {
    ...defaultOptions,
    ...opt,
  };

  return mixin(
    class implements CanActivate {
      private createPassportContext(request, response) {
        return () => new Promise((resolve, reject) =>
          passport.authenticate(type, options, (err, user, info) => {
            try {
              return resolve(options.callback(err, user, info));
            } catch (err) {
              reject(err);
            }
          })(request, response, resolve),
        );
      }

      public async canActivate(context: ExecutionContext): Promise<boolean> {
        const [obj, args, ctx, info] = context.getArgs();

        const passportFn = this.createPassportContext(ctx.req, ctx.res);
        ctx.req[options.property || defaultOptions.property] = await passportFn();

        return true;
      }
    },
  );
};
