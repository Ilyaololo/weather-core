import { Role } from 'modules/role';

export class RoleModel  implements Role {
  public id: string;
  public name: string;

  constructor(params: any) {
    this.id = params.id;
    this.name = params.name;
  }
}
