import {RoleEnum} from './role.enum';

export class Role {
  name: RoleEnum;

  constructor(roleEnum: RoleEnum) {
    this.name = roleEnum;
  }
}
