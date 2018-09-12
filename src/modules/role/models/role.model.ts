import { Role } from 'modules/role';

export class RoleModel  implements Role {
  public id: string;
  public name: string;

  constructor(params: any) {
    this.id = params.sid;
    this.name = params.name;
  }
}
