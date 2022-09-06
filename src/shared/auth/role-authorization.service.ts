export class RoleAuthorizationService {

  private userRole: number;
  constructor() {}
    
    isAuthorized(): boolean {
      // this.userRole = this._userConfigService.getUserMode();
      // if(!this.userRole){
        const info = localStorage.getItem('secRoleForm');
   
        if(info){
          // this.userRole = JSON.parse(info).UserRoleId;
          this.userRole = 1;
        }
        return this.userRole && !!this.userRole;
      }
    // }

    hasRole(role): boolean {
        return this.isAuthorized() && this.userRole === role
    }
}