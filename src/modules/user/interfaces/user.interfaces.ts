export interface User {
  firstName: string;
  id: string;
  lastName: string;
  login: string;
  middleName: string;
}

export interface UserPayload {
  login: string;
  password: string;
}
