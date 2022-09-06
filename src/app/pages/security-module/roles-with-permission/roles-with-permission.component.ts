import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { create } from 'lodash-es';
import { FormControl, FormGroup } from '@angular/forms';

import { RoleFormService } from '@shared/Services/sec-role-service'
import { RoleFormModel } from '@shared/Dto/role-form-model';
import { Router } from '@angular/router';
import { SecRoleFormModel } from '@shared/Dto/sec-role-form-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles-with-permission',
  templateUrl: './roles-with-permission.component.html',
  styleUrls: ['./roles-with-permission.component.css']
})
export class RolesWithPermissionComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  @Output() tabIndexEmitter = new EventEmitter<object>();
  @Input() locationId: number
  @Input() formName: string
 // @Output() tabIndexEmitter = new EventEmitter<number>();
  secRoleForm
  public tabIndex: number = 0;
  isShownDeclineRemarks: boolean = false
  isShownRejectOrAuthButton: boolean = false
  public roleid: number
  public code: string
  public name: string
  public IsSubmitted: boolean = false
  public Remarks: string
  isAuthAllowed: boolean = false
  isDeclineRemarks: boolean = false
  isShownPermissions: boolean = false
  isMakerButtons: boolean = false
  isShownList: boolean = true
  pageNumber: number = 1
  pageSize: number = 50
  public list = []
  public permission = []
  public SecForm: any[] = [];
  private router: Router
  public RoleMaker 
  private roleUpdateId: number
  public model: SecRoleFormModel = new SecRoleFormModel()
  public item: RoleFormModel = new RoleFormModel()

  RoleForm = new FormGroup({
    // insertAllowed: new FormControl(''),
    // updateAllowed: new FormControl(''),
    // queryAllowed: new FormControl(''),
    // authAllowed: new FormControl(''),
    // roleName: new FormControl(''),
    // permissionName: new FormControl(''),
    // permissionId: new FormControl(''),
    Remarks: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    // id : new FormControl('')
  })
  public approval = []
  constructor(
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    private route: Router,
    public RoleFormService: RoleFormService,
    private _toster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadSecRoleForm()
   this.GetAll()
   this.editUser()
  }

  editUser() {
    this.RoleFormService.getRolesWithPermission().subscribe(data => {
      
      if(data != Response)
      {

        this.roleUpdateId = data.id
         this.RoleMaker = data;
         this.roleid= data.id
        this.code = data.code
        this.name = this.RoleMaker.name
        
      }
      
    })
      
    this.onSearch(this.RoleMaker.id);
  }
  loadSecRoleForm() {
    // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      
    //   let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
    //   this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)
    var formName = "Role"
    this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
        
      this.secRoleForm = data.find(x => x.formName == formName)
      
      //this.isShown = this.secRoleForm.authAllowed
        
      if(this.secRoleForm.authAllowed == true){
        this.isShownDeclineRemarks = this.secRoleForm.authAllowed
        this.isShownRejectOrAuthButton = true  
      }
      else{
        this.isAuthAllowed =true
        this.isMakerButtons = true
        this.isDeclineRemarks = true
      }  
    })
  }
  onInsertSelection(item) {
      
    if (item.insertAllowed == true){
      item.insertAllowed = true
    }
    else
    {
      item.insertAllowed = false
    }
      
  }
  onUpdateSelection(item) {  
    if (item.updateAllowed == true){
      item.updateAllowed = true
    }
      else
      {
        item.updateAllowed = false
      }
  }
  onQueryAllowedSelection(item) {
    if (item.queryAllowed == true){
      item.queryAllowed = true
    }
      else
      {
        item.queryAllowed = false
      }
  }
  onAuthAllowedSelection(item) {
    if (item.authAllowed == true){
      item.authAllowed = true
    }
      else
      {
        item.authAllowed = false
      }
  }

  routeToList(){
    //this.route.navigate(['app/pages/security-module/roles-with-permission-task-board'])
    this.tabIndexEmitter.emit({ 'tabIndex' :this.tabIndex});
  }
  onSaveAsDraft(): void {
    this.save()
  }

  onSubmit(): void {

    this.model.IsSubmitted = true
    this.save()
  }
  save(): void {
    
    this.model.id= this.roleid
    this.model.code = this.code
    this.model.name = this.name
    this.model.SecRoleForm = this.list
      
    if (this.roleUpdateId == null) {
      this.RoleFormService.create(this.model).subscribe((Response) => { 
        this._toster.info(Response.message)   
        this.model.code = ""
        this.model.name = ""
        this.routeToList()
      })
    }
    else {
      this.item.id = this.roleUpdateId
      this.RoleFormService
        .update(this.model)
        .subscribe((Response) => {  
          this._toster.info(Response.message)
          if (Response.message == "Successfully Updated!") {
            this.routeToList()
          }
        })
          
    }

  }

  onSearch(id) {
    this.RoleFormService.GetPermissionsById(id).subscribe((Response) => { 
      
      this.roleid = Response.id
      this.code = Response.code
      this.name = Response.name
      this.Remarks= Response.remarks
      this.list = Response.secRoleForm
    })
      
  }


  GetAll() {
    
    this.RoleFormService.GetAll(this.pageNumber, this.pageSize).subscribe((Response) => {
      Response.forEach(element => {
        const obj = {
          permissionId: element.id,
          permissionName: element.name,
          authAllowed: false,
          insertAllowed: false,
          updateAllowed: false,
          queryAllowed: false,
        }    
        this.list.push(obj);
      });
    })
  }
  onAuthorize() {  
    this.RoleFormService.authorizeRole(this.roleUpdateId,this.Remarks).subscribe((Response) => {
      this._toster.info(Response.message)
      if (Response.message == "Successfully Authorized!") {
        this.routeToList()
      }
    })
  }
  
  onReject() {
    this.RoleFormService.rejectRole(this.roleUpdateId,this.Remarks).subscribe((Response) => {
      this._toster.info(Response.message)
      if (Response.message == "Successfully Rejected!") {
        this.routeToList()
      }
    })
  
  }

}


