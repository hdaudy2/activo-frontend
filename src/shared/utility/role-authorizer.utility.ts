export enum Roles {
  ADMIN = 2,
  MAINTAINER_OFFICER = 23,
  TENANT = 22,
}

export class RoleAuthorizerUtility {
  private RoleId: number = 0;
  
  constructor() {
    this.RoleId = +localStorage.getItem("roleId");
  }

  public isAuthorize = (Roles: Roles[]): boolean => Roles.includes(this.RoleId);
  public isNotAuthorize = (Roles: Roles[]): boolean =>
    !Roles.includes(this.RoleId);
}
