import { City, CityModel } from 'modules/city';
import { Role, RoleModel } from 'modules/role';
import { User } from 'modules/user';

export class UserModel implements User {
  public city: City;
  public firstName: string;
  public id: string;
  public lastName: string;
  public login: string;
  public middleName: string;
  public role: Role;

  constructor(params: any) {
    this.city = new CityModel(params.city);
    this.firstName = params.firstName;
    this.id = params.id;
    this.lastName = params.lastName;
    this.login = params.login;
    this.middleName = params.middleName;
    this.role = new RoleModel(params.role);
  }
}
