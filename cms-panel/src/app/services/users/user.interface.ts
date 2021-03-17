import { Role } from '../role/role.interface';

export interface User {
  id: number;
  login: string;
  email: string;
  name: string;
  surname: string;
  createdAt: string;
  updatedAt: string;
  role: Role[];
}
