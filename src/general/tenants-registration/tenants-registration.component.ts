import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SecUserModel } from '@shared/Dto/sec-user-model';
import { LocationService } from '@shared/Services/location.service';
import { SecUserService } from '@shared/Services/sec-user.service';
import { RoleFormService } from '@shared/Services/sec-role-service';
//import { SecPolicyService } from '@shared/Services/sec-policy.service';
import { DepartmentService } from '@shared/Services/department-service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import { EditPasswordDialogComponent } from './edit-password-dialog/edit-password-dialog.component';
import { Router } from '@angular/router';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { DatePipe } from '@angular/common';
import { UserStandardService } from 'shared/Services/User-Standard-service';
import { TenantBuildingService } from '@shared/Services/tenant-building.service';
import { FilterOperator, ParamMethod } from '@shared/interface/QueryParam.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tenants-registration',
  templateUrl: './tenants-registration.component.html',
  styleUrls: ['./tenants-registration.component.css']
})
export class TenantsRegistrationComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  @Output() tabIndexEmitter = new EventEmitter<object>();
  @Input() locationId: number
  @Input() formName: string
  datePipe = new DatePipe("en-US");
  // onAdd = new EventEmitter();
  secRoleForm
  secUserLocation
  public id: number
  public secUserId: number

  public code: string
  public name: string
  public isAllowed: boolean = false
  public list = []
  isAuthAllowed: boolean = false
  isManageAllowed: boolean = false
  isShownDeclineRemarks: boolean = false
  isShownRejectOrAuthButton: boolean = false
  isMakerButtons: boolean = false
  isDeclineRemarks: boolean = false
  public showMessage: boolean
  public isResetPassword: boolean = true
  public isResetButtonShow: boolean = false
  public isShown: boolean = false
  public Confidentialitypath: boolean = false
  public PhotoPath: boolean = false
  public ContractPath: boolean = false
  UserMaker: any;
  public CountryManager: boolean = false
  private userUpdateId: number
  public item: SecUserModel = new SecUserModel();
  UserForm = new FormGroup({
    // Id: new FormControl(''),
    UserName: new FormControl(''),
    FullName: new FormControl(''),
    Email: new FormControl(''),
    RoleId: new FormControl(''),
    UserTypeId: new FormControl(''),
    Password: new FormControl(''),
    ConfirmPassword: new FormControl(''),
    DepartmentId: new FormControl(''),
    Designation: new FormControl(''),
    IsActive: new FormControl(''),
    //IsSubmitted: new FormControl(''),
    //SbpAllowed: new FormControl(''),
    Address1: new FormControl(''),
    Address2: new FormControl(''),
    PostalCode: new FormControl(''),
    Telephone: new FormControl(''),
    Mobile: new FormControl(''),
    Code: new FormControl(''),
    DateofBirth: new FormControl(''),
    PrefixId: new FormControl(''),
    CountryId: new FormControl(''),
    StateId: new FormControl(''),
    CityId: new FormControl(''),
    //PhotoFile: new FormControl(''),
    //ConfidentialityFile: new FormControl(''),
    //ContractFile: new FormControl(''),
    FirstName: new FormControl(''),
    EmailForgotPassword: new FormControl(''),
    RegistrationNo: new FormControl(''),
    NewPassword: new FormControl(''),
    NewConfirmPassword: new FormControl(''),
    ParentUserId: new FormControl(''),
    ParentAgencyId: new FormControl(''),
    BuildingId: new FormControl(''),
    FloorId: new FormControl(''),
    FlatId: new FormControl(''),
    CountryName: new FormControl(''),
    StateName: new FormControl(''),
    CityName: new FormControl(''),



  })
  PhotoFileToUpload: File;
  ConfidentialityFileToUpload: File;
  ContractFileToUpload: File;
  public departList = [];
  public locationList = [];
  public UserTypeList = [];
  public OrganizationList = [];
  public UsersList = [];
  public BuildingList = [];
  public floorList = [];
  public flatsList = [];

  public ActiveStatusList = [];
  public roleList = [];
  public CountryList = [];
  public StateList = [];
  public CityList = [];
  public PrefixList = [];
  public listusertype = [];

  submitted = false;
  constructor(
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    public SecUserService: SecUserService,
    private _tenantBuilding: TenantBuildingService,
    public locationService: LocationService,
    public RoleFormService: RoleFormService,
    public DepartmentService: DepartmentService,
    private router: Router,
    private UserStandardService: UserStandardService,
    private _toster: ToastrService,
  ) { }

  ngOnInit(): void {

    this.loadLocations()
    this.loadRoles();
    this.loadUserType();
    this.loadDepartments();
    this.loadSecRoleForm();
    //this.loadCities();
    this.loadCountries();
    this.loadPrefix();
    //this.loadState();
    this.loadActiveStatus();
    this.AllBuildings();
    //this.loadAllAgency();


  }
  ngAfterViewInit(): void {
    this.editUser()

  }
  KeyPress(event) {
    let value: string = (event.target as HTMLInputElement).value
    if (value.length == 3) (event.target as HTMLInputElement).value += "-";
    if (value.length == 7) (event.target as HTMLInputElement).value += "-";
  }

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.router.navigateByUrl('/account/login')
    //this.displayStyle = "none";
  }
  PhotoFilefileInput(e: any) {

    this.PhotoFileToUpload = <File>e?.target?.files[0];
    //this.url=e.target.value; 


  }
  ConfidentialityFilefileInput(e: any) {

    this.ConfidentialityFileToUpload = <File>e?.target?.files[0];
    //this.url=e.target.value; 


  }
  ContractFileInput(e: any) {

    this.ContractFileToUpload = <File>e?.target?.files[0];
    //this.url=e.target.value; 


  }
  loadSecRoleForm() {
    // let secRoleForm = JSON.parse(localStorage.getItem('secRoleForm'))
    // let permission = secRoleForm.find(x => x.formCode != null && x.formCode == this.formCode)

    // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {

    //   let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
    //   this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)

    // var formName = "User"
    // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
    //   this.secRoleForm = data.find(x => x.formName == formName)
    //   this.isShown = this.secRoleForm.authAllowed
    //   if (this.secRoleForm.manageAllowed == true) {
    //     this.isManageAllowed = true

    //   }
    //   if (this.secRoleForm.insertAllowed == false || this.secRoleForm.insertAllowed == null) {


    //     // this.isShownDeclineRemarks = this.secRoleForm.authAllowed
    //     // this.isShownRejectOrAuthButton = true
    //     // this.isMakerButtons = false
    //     // this.UserForm.disable()

    //     this.UserForm.get('ConfirmPassword').disable();
    //     this.UserForm.get('Password').disable();


    //     this.UserForm.get('Id').disable();
    //     this.UserForm.get('UserName').disable();
    //     this.UserForm.get('FullName').disable();
    //     this.UserForm.get('Email').disable();
    //     this.UserForm.get('DepartmentId').disable();

    //     this.UserForm.get('RoleId').disable();
    //     this.UserForm.get('Designation').disable();
    //     this.UserForm.get('IsActive').disable();
    //     this.UserForm.get('SbpAllowed').disable();
    //     this.isAuthAllowed = false
    //   }
    //   else {
    //     this.isAuthAllowed = true
    //     this.isMakerButtons = true
    //     this.isDeclineRemarks = true
    //   }

    // })
    this.isManageAllowed = true
    this.isAuthAllowed = true
    this.isMakerButtons = true
    this.isDeclineRemarks = true
  }
  // public confrmPass : string
  // public pass : string

  editUser() {
    var roleId = localStorage.getItem('roleId');
    if (roleId == "2") {
      this.UserForm.get('UserTypeId').setValue(1);
      this.UserForm.get('UserTypeId').disable();
    }


    var ur;
    ur = window.location.href.split("/")[7];
    var com = [] = ur.split("?")[1];
    if (com != undefined && com != null) {
      var PId = com.split("=")[0];
      this.id = PId;

      this.SecUserService.GetUserbyId(this.id).subscribe(data => {

        this.isResetButtonShow = true;
        this.isResetPassword = false;
        this.isResetButtonShow = false;
        this.isResetPassword = true;
        this.userUpdateId = data.id
        this.UserMaker = data;
        if (this.userUpdateId != undefined) {
          //this.isResetButtonShow=true;
          // this.isResetPassword=false;
          // this.confrmPass = this.UserMaker.ConfirmPassword
          // this.pass = this.UserMaker.password


          //this.UserForm.get('Id').setValue(this.UserMaker.id);
          if (this.UserMaker.parentAgencyId != null && this.UserMaker.parentAgencyId != undefined && this.UserMaker.parentAgencyId != NaN) {
            this.UserForm.get('ParentAgencyId').setValue(this.UserMaker.parentAgencyId);
            this.loadAllUsers(this.UserMaker.parentAgencyId);
            this.UserForm.get('ParentUserId').setValue(this.UserMaker.parentAgencyName);
          }


          this.UserForm.get('PrefixId').setValue(this.UserMaker.prefixId);
          this.UserForm.get('UserName').setValue(this.UserMaker.userName);
          this.UserForm.get('FullName').setValue(this.UserMaker.fullName);
          this.UserForm.get('Email').setValue(this.UserMaker.email);
          this.UserForm.get('Address1').setValue(this.UserMaker.address1);
          this.UserForm.get('Address2').setValue(this.UserMaker.address2);
          // this.UserForm.get('CountryId').setValue(this.UserMaker.countryId);

          this.UserForm.get('CountryId').setValue(this.UserMaker.countryId);
          this.loadState(this.UserMaker.countryId);
          this.UserForm.get('StateId').setValue(this.UserMaker.stateId);
          this.loadCities(this.UserMaker.stateId);
          this.UserForm.get('CityId').setValue(this.UserMaker.cityId);


          // this.UserForm.get('StateId').setValue(this.UserMaker.stateId);
          //this.UserForm.get('CityId').setValue(this.UserMaker.cityId);
          this.UserForm.get('PostalCode').setValue(this.UserMaker.postalCode);
          this.UserForm.get('Telephone').setValue(this.UserMaker.telephone);
          this.UserForm.get('Mobile').setValue(this.UserMaker.mobile);
          this.UserForm.get('Code').setValue(this.UserMaker.code);
          let req = new Date(this.datePipe.transform(this.UserMaker.dateOfBirth, 'yyyy/MM/dd'))
          // this.LibraryForm.controls.Uploaddate.setValue(LBDate);
          this.UserForm.get('DateofBirth').setValue(this.datePipe.transform(req, 'yyyy-MM-dd'))
          // this.UserForm.get('DateofBirth').setValue(this.UserMaker.dateOfBirth);
          this.UserForm.get('RegistrationNo').setValue(this.UserMaker.registrationNo);
          this.UserForm.get('RoleId').setValue(this.UserMaker.roleId);
          if (this.UserMaker.roleId == 6) {
            this.CountryManager = true
            this.UserForm.get('RoleId').disable();
          }
          this.UserForm.get('DepartmentId').setValue(this.UserMaker.departmentId);
          this.UserForm.get('UserTypeId').setValue(this.UserMaker.userTypeId);
          this.UserForm.get('Password').disable();
          this.UserForm.get('ConfirmPassword').disable();
          this.UserForm.get('ConfirmPassword').setValue("Pakistan@123");
          this.UserForm.get('Password').setValue("Pakistan@123");

          if (this.UserMaker.isActive == true) {
            this.UserForm.get('IsActive').setValue(1);
          }
          else { this.UserForm.get('IsActive').setValue(0); }
          this.UserForm.get('FirstName').setValue(this.UserMaker.firstName);
          this.UserForm.get('EmailForgotPassword').setValue(this.UserMaker.emailForgotPassword);
          // this.UserForm.get('OrganizationId').setValue(this.UserMaker.EmailForgotPassword);


          //   this.UserForm.get('Designation').setValue(this.UserMaker.designation);
          //  this.UserForm.get('Remarks').setValue(this.UserMaker.remarks);

          //  this.UserForm.get('SbpAllowed').setValue(this.UserMaker.sbpAllowed);
          //  this.UserForm.get('SbpAllowed').setValue(this.UserMaker.sbpAllowed);

          if (this.UserForm.get('Email').setValue(this.UserMaker.email) == undefined) {

            this.isResetButtonShow = true;
            this.isResetPassword = false;
          }

          if (data.confidentialityPath != null && data.confidentialityPath != undefined && data.confidentialityPath != NaN && data.confidentialityPath != "" && data.confidentialityPath != '') {
            //this.UserForm.get('ConfidentialityFile').setValue(data.confidentialityPath)
            this.Confidentialitypath = true;
          }
          if (data.photoPath != null && data.photoPath != undefined && data.photoPath != NaN && data.photoPath != "" && data.photoPath != '') {

            this.PhotoPath = true;
          }
          if (data.contractPath != null && data.contractPath != undefined && data.contractPath != NaN && data.contractPath != "" && data.contractPath != '') {

            this.ContractPath = true;
          }
        }

      })
      //  this.onSearch(this.userUpdateId);
    }

  }
  // onSearch(id) 
  // {
  //   this.SecUserService.GetLocationsById(id).subscribe((Response) => { 

  //     this.id = Response.id
  //     this.code = Response.code
  //     this.name = Response.name
  //     this.list = Response.secUserLocation
  //     if(this.id != null && this.id != undefined)
  //     {
  //       this.isAllowed= true;
  //     }
  //   })
  // }
  // onSubmit(): void {


  //   this.item.UserName = this.UserForm.get('UserName').value
  //   this.item.FullName = this.UserForm.get('FullName').value
  //   this.item.Email = this.UserForm.get('Email').value
  //   this.item.RoleId = this.UserForm.get('RoleId').value
  //   this.item.ConfirmPassword = this.UserForm.get('ConfirmPassword').value
  //   this.item.UserTypeId=this.UserForm.get('UserTypeId').value
  //   this.item.DepartmentId = this.UserForm.get('DepartmentId').value
  //   this.item.Designation = this.UserForm.get('Designation').value
  //   this.item.IsActive = this.UserForm.get('IsActive').value
  //   this.item.Password=this.UserForm.get('Password').value


  //   this.SecUserService.create(this.item).subscribe((Response)=>{
  //     this._toster.info(Response.message)
  //    this.UserForm.reset()
  //   })
  // }

  get f() { return this.UserForm.controls; }
  onRecordSubmit(): void {
    debugger;
    var LoginUserId = localStorage.getItem('userId');
    this.submitted = true;

    // stop here if form is invalid
    if (this.UserForm.invalid) {
      this._toster.error("Some fields are required ");
      return;
    }
    // if (this.UserForm.get('UserName').value == null || this.UserForm.get('UserName').value == undefined || this.UserForm.get('UserName').value == "") {
    //   this._toster.error("User Name required", "Alert")
    //   return
    //   // MesseageError="Module is Empty";
    // }
    // if (this.UserForm.get('Email').value == null || this.UserForm.get('Email').value == undefined || this.UserForm.get('Email').value == "") {
    //   this._toster.error("Email Address required", "Alert")
    //   return
    //   // MesseageError="Module is Empty";
    // }
    // if (this.UserForm.get('UserTypeId').value == null || this.UserForm.get('UserTypeId').value == undefined || this.UserForm.get('UserTypeId').value == "") {
    //   this._toster.error("User Type  required", "Alert")
    //   return
    //   // MesseageError="Module is Empty";
    // }


    const foData: FormData = new FormData();

    if (this.id != undefined && this.id != null && this.id > 0) {
      foData.append("Id", this.id.toString());
    }
    else {
      if (this.UserForm.get('Password').value == null || this.UserForm.get('Password').value == undefined || this.UserForm.get('Password').value == "") {
        this._toster.error("Password  required", "Alert")
        return
      }
      if (this.UserForm.get('ConfirmPassword').value == null || this.UserForm.get('ConfirmPassword').value == undefined || this.UserForm.get('ConfirmPassword').value == "") {
        this._toster.error("Confirm Password  required", "Alert")
        return
      }
      if (this.UserForm.get('ConfirmPassword').value != this.UserForm.get('Password').value) {
        this._toster.error("Password doesn't match Confirm Password", "Alert")
        return
      }
    }
    foData.append('IsActive', "true");
    // if (this.UserForm.get('IsActive').value == 1) {
    //   foData.append('IsActive', "true");
    // }
    // else {
    //   foData.append('IsActive', "false");
    // }
    // var OrgId = localStorage.getItem('organizationId');
    //foData.append('OrganizationId', OrgId);
    foData.append('PhotoFile', this.PhotoFileToUpload);
    //foData.append('ConfidentialityFile', this.ConfidentialityFileToUpload);
    //foData.append('ContractFile', this.ContractFileToUpload);


    // Object.keys(this.UserForm.controls).forEach(key => {
    //   if (key != "NewPassword" && key != "NewConfirmPassword" && this.UserForm.controls[key].value != null && this.UserForm.controls[key].value != "" && this.UserForm.controls[key].value != undefined && this.UserForm.controls[key].value != NaN &&this.UserForm.controls[key].value != "" && this.UserForm.controls[key].value !='') {
    //     var sname = key;
    //     //var sname= this.SLCPForm.controls[key].;
    //     var val = this.UserForm.controls[key].value;

    //     foData.append(sname, val);
    //   }
    // });

    foData.append('UserName', this.UserForm.get('UserName').value);
    foData.append('FullName', this.UserForm.get('FullName').value);
    foData.append('Email', this.UserForm.get('Email').value);
    //foData.append('RoleId', this.UserForm.get('RoleId').value);
    //foData.append('UserTypeId', this.UserForm.get('UserTypeId').value);
    foData.append('Password', this.UserForm.get('Password').value);
    foData.append('ConfirmPassword', this.UserForm.get('ConfirmPassword').value);
    //foData.append('DepartmentId', this.UserForm.get('DepartmentId').value);
    //foData.append('Address1', this.UserForm.get('Address1').value);
    //foData.append('Address2', this.UserForm.get('Address2').value);
    //foData.append('PostalCode', this.UserForm.get('PostalCode').value);
    foData.append('Telephone', this.UserForm.get('Telephone').value);
    //foData.append('ParentUserId', this.UserForm.get('ParentUserId').value);

    // foData.append('ParentUserId', this.UserForm.get('ParentUserId').value);

    if (this.UserForm.get('Mobile').value != null && this.UserForm.get('Mobile').value != undefined && this.UserForm.get('Mobile').value != "" && this.UserForm.get('Mobile').value != '') {
      foData.append('Mobile', this.UserForm.get('Mobile').value);
    }

    // foData.append('Mobile', this.UserForm.get('Mobile').value);
    //foData.append('Code', this.UserForm.get('Code').value);
    // if (this.UserForm.get('DateofBirth').value != null && this.UserForm.get('DateofBirth').value != undefined && this.UserForm.get('DateofBirth').value != "" && this.UserForm.get('DateofBirth').value != '') {
    //   foData.append('DateOfBirth', this.UserForm.get('DateofBirth').value);
    // }
    // foData.append('DateOfBirth', this.UserForm.get('DateofBirth').value);
    foData.append('PrefixId', this.UserForm.get('PrefixId').value);
    if (this.UserForm.get('CountryId').value != null && this.UserForm.get('CountryId').value != undefined && this.UserForm.get('CountryId').value != "" && this.UserForm.get('CountryId').value != '') {
      foData.append('CountryId', this.UserForm.get('CountryId').value);
    }

    if (this.UserForm.get('StateId').value != null && this.UserForm.get('StateId').value != undefined && this.UserForm.get('StateId').value != "" && this.UserForm.get('StateId').value != '') {
      foData.append('StateId', this.UserForm.get('StateId').value);
    }

    if (this.UserForm.get('CityId').value != null && this.UserForm.get('CityId').value != undefined && this.UserForm.get('CityId').value != "" && this.UserForm.get('CityId').value != '') {
      foData.append('CityId', this.UserForm.get('CityId').value);
    }

    foData.append('FirstName', this.UserForm.get('FirstName').value);
    foData.append('EmailForgotPassword', this.UserForm.get('EmailForgotPassword').value);
    //zeeshan
    if (this.UserForm.get('BuildingId').value != null && this.UserForm.get('BuildingId').value != undefined && this.UserForm.get('BuildingId').value != "" && this.UserForm.get('BuildingId').value != '') {
      foData.append('BuildingId', this.UserForm.get('BuildingId').value);
    }

    if (this.UserForm.get('FloorId').value != null && this.UserForm.get('FloorId').value != undefined && this.UserForm.get('FloorId').value != "" && this.UserForm.get('FloorId').value != '') {
      foData.append('FloorId', this.UserForm.get('FloorId').value);
    }

    if (this.UserForm.get('FlatId').value != null && this.UserForm.get('FlatId').value != undefined && this.UserForm.get('FlatId').value != "" && this.UserForm.get('FlatId').value != '') {
      foData.append('FlatId', this.UserForm.get('FlatId').value);
    }
    //foData.append('RegistrationNo', this.UserForm.get('RegistrationNo').value);
    //foData.append('CreatedBy', LoginUserId);


    //  foData.append('Code',this.UserForm.get('Code').value);



    //formData

    // 
    // let data ={
    //   File:this.fileToUpload,
    //   Title:'Title',
    //   Version:'Version',
    //   ModuleId:'ModuleId',
    //   Description:'Description',
    //   Reviewer:'Reviewer',
    //   CertificationId:'CertificationId',
    //   StatusId:'StatusId',
    //   DocumentTypeId:'DocumentTypeId',


    //}
    debugger;
    this.SecUserService.UserCreateWithFiles(foData).subscribe(async (Response) => {
      debugger;
      //this._toster.info(Response.message)

      if (Response.message == "0") {
        this._toster.info("User Already Exists!")
      }
      else if (Response.message == "1") {
        this._toster.info("Password doesn't match Confirm Password")
      }
      else if (Response.message == "2") {
        this._toster.info("Successfully Registered!")
        await this._tenantBuilding.UpdateFlats(this.UserForm.get('FlatId').value, {isAllotted: true});
        this.router.navigateByUrl('/account/login')
      }
      else if (Response.message == "3") {
        this._toster.info("Successfully Updated!")
        this.router.navigateByUrl('/app/pages/security-module/user-with-locations-task-board')
      }
      else if (Response.message == "4") {
        this._toster.error("Not Inserted!")
      } else if (Response.message == "5") {
        this._toster.error("Country Manager Already Exist!")
      }


    })
    // window.location.reload();
    // this.LibraryResourceService.create(this.item).subscribe((Response)=>{

    // //  this._toster.info(Response.message)

    //  })




    //this.LibraryResourceService.create(this.item).subscribe((Response)=>{

  }
  loadLocations(): void {

    this.locationService.getlocations().subscribe((Response) => {
      this.locationList = Response.result
    });
  }
  // openDialog(): void {
  //   const initialState = {
  //     list: [
  //       this.item.id = this.UserForm.get('id').value
  //     ]
  //   }
  //   let editUserDialog: BsModalRef;
  //   ;
  //   editUserDialog = this._modalService.show(
  //     EditPasswordDialogComponent,
  //     {
  //       class: 'modal-dialog-centered modal-sm',
  //       backdrop: 'static',
  //       initialState
  //      });
  //     //this.onAdd.emit(this.item.id);

  // }
  loadDepartments(): void {
    this.DepartmentService.getdepartments().subscribe((Response) => {
      this.departList = Response
    })
  }
  // public secusertypeid: number
  loadUserType(): void {

    var secusertypeid = parseInt(localStorage.getItem('userTypeId'));
    this.RoleFormService.getUserType(secusertypeid).subscribe((Response) => {

      // this.listusertype= Response;
      // this.UserTypeList = this.listusertype.find(x => x.userLevel > 1 )

      // this.listusertype = this.listusertype.filter(function(elem) {
      //   //return false for the element that matches both the name and the id
      //  // this.UserTypeList=(elem.userLevel >1)
      //  return(elem.userLevel >1)
      // });

      this.UserTypeList = Response;
    })
  }
  loadRoles(): void {


    var roleId = parseInt(localStorage.getItem('roleId'));
    this.RoleFormService.getroles(roleId).subscribe((Response) => {
      this.roleList = Response

      // this.UserForm.get('RoleId').setValue(this.UserMaker.roleId);
      Response['result'].forEach((element) => {

        const item = {
          id: element.id,
          name:
            element.name,

        };
        this.roleList.push(item);
      });
    })
  }
  // loadCities(): void {

  //   this.SecUserService.getCities().subscribe((Response) => {
  //     this.CityList = Response
  //   })
  // }
  // loadCountries(): void {

  //   this.SecUserService.getCountries().subscribe((Response) => {
  //     this.CountryList = Response
  //   })
  // }

  loadPrefix(): void {

    this.SecUserService.getPrefix().subscribe((Response) => {
      this.PrefixList = Response
    })
  }
  // loadState(): void {

  //   this.SecUserService.getState().subscribe((Response) => {
  //     this.StateList = Response
  //   })
  // }

  async AllBuildings(): Promise<void> {
    debugger
    this.BuildingList = await this._tenantBuilding.GetAllBuildings();
  }
  async loadFloors(buildingId): Promise<void> {

    this.floorList = await this._tenantBuilding.GetAllFloor([{ QueryParam: "BuildingId", value: buildingId, method: ParamMethod.FILTER, filterOperator: FilterOperator.EQUAL }]);
      debugger
      console.log(this.BuildingList);
      var BuildingData = this.BuildingList.filter(item => item.id === parseInt(buildingId));
      console.log(BuildingData);
      this.UserForm.get('CountryId').setValue(BuildingData[0]["countryId"]);
      this.UserForm.get('CityId').setValue(BuildingData[0]["cityId"]);
      this.UserForm.get('StateId').setValue(BuildingData[0]["stateId"]);
      this.UserForm.get('CountryName').setValue(BuildingData[0]["countryName"]);
      this.UserForm.get('CityName').setValue(BuildingData[0]["cityName"]);
      this.UserForm.get('StateName').setValue(BuildingData[0]["stateName"]);
      this.UserForm.get('EmailForgotPassword').setValue(8);
  }
  async loadFlats(floorsId): Promise<void> {
    this.flatsList = await this._tenantBuilding.GetAllFlat([{ QueryParam: "FloorId", value: floorsId, method: ParamMethod.FILTER, filterOperator: FilterOperator.EQUAL}, { QueryParam: "IsAllotted", value: false, method: ParamMethod.FILTER, filterOperator: FilterOperator.EQUAL}])
  }

  onFocusOutEvent(event: any) {
    debugger;
    this.UserForm.get('UserName').setValue((event.target.value).toString())
  }

  loadAllUsers(organizationId): void {
    debugger
    this.SecUserService.getAllUsers(organizationId).subscribe((Response) => {
      this.UsersList = Response

    })
  }



  loadActiveStatus(): void {

    this.SecUserService.getActiveStatus().subscribe((Response) => {
      this.ActiveStatusList = Response
    })
  }
  UserSubmit(): void {
    debugger;
    if (this.UserForm.get('NewConfirmPassword').value != this.UserForm.get('NewPassword').value) {
      this._toster.error("Password doesn't match Confirm Password", "Alert")
      return
    }
    if (this.UserForm.get('EmailForgotPassword').value == null || this.UserForm.get('EmailForgotPassword').value == undefined || this.UserForm.get('EmailForgotPassword').value == "") {
      this._toster.error("Email Address required", "Alert")
      return
      // MesseageError="Module is Empty";
    }
    //var LoginUserId = localStorage.getItem('userId');
    const UserModel =

    {

      Id: this.id,
      Password: this.UserForm.get('NewPassword').value,
      ConfirmPassword: this.UserForm.get('NewConfirmPassword').value,
      EmailAddress: this.UserForm.get('EmailForgotPassword').value,
      //LastModifiedById: LoginUserId.toString(),

    }

    debugger;
    this.SecUserService.UCreate(UserModel).subscribe((Response) => {
      debugger;
      this._toster.info(Response.message)
      console.log(Response)
      // this.router.navigateByUrl('/app/pages/security-module/agency')

    })
  }

  loadCities(stateId): void {

    this.CityList = null
    this.SecUserService.getCitiesByState(stateId).subscribe((Response) => {
      this.CityList = Response
    })
  }

  loadCountries(): void {

    this.SecUserService.getCountries().subscribe((Response) => {
      this.CountryList = Response
      let countryId = 0;
      this.loadState(countryId);
    })
  }

  loadState(countryId): void {
    this.StateList = [];
    this.SecUserService.getStateByCountryId(countryId).subscribe((Response) => {
      this.StateList = Response
      this.CityList = [];
    })
  }
  DownloadConfidentially(): void {

    if (this.Confidentialitypath == true) {
      this.id = this.id;
      //this.CardForm.get('FirstName').value
      // var fillename=e.row.data.title;
      var fillename = this.UserForm.get('FullName').value + " Confidentially";
      this.UserStandardService.DownloadConfidentially(this.id).subscribe((result: Blob) => {
        const Blb = new Blob([result], { type: result.type });
        // const url=window.URL.createObjectURL(Blb);
        // window.open(url);
        // console.log("success");


        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = fillename;
        // const fileName =

        //="farooq";
        a.href = URL.createObjectURL(Blb);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);

        // const Blb =new Blob([result], { type: result.type });
        // // const url=window.URL.createObjectURL(Blb);
        // // window.open(url);
        // // console.log("success");

        // 
        // const a = document.createElement('a');
        //   a.setAttribute('style', 'display:none;');
        //   document.body.appendChild(a);
        // // a.download =fillename;  
        //  // const fileName =

        //   //="farooq";
        //   a.href = URL.createObjectURL(Blb);
        //   a.target = '_blank';
        //   a.click();
        //   document.body.removeChild(a);

      })
    }
    else { this._toster.error("File Not Exsit", "Alert") }
  }
  DownloadContract(): void {

    if (this.ContractPath == true) {
      this.id = this.id;
      // var fillename=e.row.data.title;
      var fillename = this.UserForm.get('FullName').value + " Contract";
      this.UserStandardService.DownloadContract(this.id).subscribe((result: Blob) => {
        const Blb = new Blob([result], { type: result.type });
        // const url=window.URL.createObjectURL(Blb);
        // window.open(url);
        // console.log("success");


        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = fillename;
        // const fileName =

        //="farooq";
        a.href = URL.createObjectURL(Blb);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);



      })
    }
    else { this._toster.error("File Not Exsit", "Alert") }

  }
  DownloadImage(): void {

    if (this.ContractPath == true) {
      this.id = this.id;
      // var fillename=e.row.data.title;
      var fillename = this.UserForm.get('FullName').value + " Photo";
      this.UserStandardService.DownloadImage(this.id).subscribe((result: Blob) => {
        const Blb = new Blob([result], { type: result.type });
        // const url=window.URL.createObjectURL(Blb);
        // window.open(url);
        // console.log("success");


        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = fillename;
        // const fileName =

        //="farooq";
        a.href = URL.createObjectURL(Blb);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);

        // const Blb =new Blob([result], { type: result.type });
        // // const url=window.URL.createObjectURL(Blb);
        // // window.open(url);
        // // console.log("success");

        // 
        // const a = document.createElement('a');
        //   a.setAttribute('style', 'display:none;');
        //   document.body.appendChild(a);
        // // a.download =fillename;  
        //  // const fileName =

        //   //="farooq";
        //   a.href = URL.createObjectURL(Blb);
        //   a.target = '_blank';
        //   a.click();
        //   document.body.removeChild(a);

      })
    }
    else { this._toster.error("File Not Exsit", "Alert") }

  }

}
