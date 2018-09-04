import * as _memoize from 'lodash/memoize';

import { UserEntity, User } from '../';

export const selUsers: (list: UserEntity[]) => User[] = _memoize(
  (list: UserEntity[]) => list.map<User>((user) => ({
    firstName: user.firstName,
    id: user.codeId,
    lastName: user.lastName,
    login: user.login,
    middleName: user.middleName,
  })),
);
