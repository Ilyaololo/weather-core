import * as _memoize from 'lodash/memoize';

import { User, UserEntity, UserModel } from 'modules/user';

export const selUsers: (list: UserEntity[]) => User[] = _memoize(
  (list: UserEntity[]) => list.map<User>((user) => new UserModel(user)),
);
