import { City } from 'modules/city';
import { Role } from 'modules/role';

export interface User {
  city: City;
  firstName: string;
  id: string;
  lastName: string;
  login: string;
  middleName: string;
  role: Role;
}

export interface UserPayload {
  login: string;
  password: string;
}
