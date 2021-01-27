import { UserRoles } from './user-roles.interface';

export interface Role {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user_roles?: UserRoles;
}
