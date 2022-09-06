import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { create } from 'lodash-es';
import { FormControl, FormGroup } from '@angular/forms';
import { RoleFormService } from '@shared/Services/sec-role-service'
import { RoleFormModel } from '@shared/Dto/role-form-model';
import { Router } from '@angular/router';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import { SecRoleFormModel } from '@shared/Dto/sec-role-form-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { LibraryResourceService } from '@shared/Services/library-Resource_service';
import { ConsultantModel } from '@shared/Dto/Consultant-model';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { TagContentType } from '@angular/compiler';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { SecUserService } from '@shared/Services/sec-user.service';
import { ConsultantService } from '@shared/Services/Consultant-service';


@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {
  @Input() formName: string
  message: string;
  progress: number;
  pipe = new DatePipe('en-US');
  datePipe = new DatePipe("en-US");
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  public totalCount: number
  public keyword: string = ''
  public id: number
  public roleList = [];
  public CountryList = [];
  public StateList = [];
  public CityList = [];
  public PrefixList = [];
  public StatusList = [];
  public ConsultantList = [];




  public ActiveStatusList = [];
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  isAuthAllowed: boolean = false
  isManageAllowed: boolean = false
  isShownDeclineRemarks: boolean = false
  isShownRejectOrAuthButton: boolean = false
  isMakerButtons: boolean = false
  isDeclineRemarks: boolean = false
  public isShown: boolean = false
  public isEditShown: boolean
  public isViewShown: boolean
  public isAddShown: boolean
  UserMaker: any;
  private userUpdateId: number
  public cuncMod: ConsultantModel = new ConsultantModel();


  ConsultantForm = new FormGroup({
    Name: new FormControl(''),
    Email: new FormControl(''),
    Address: new FormControl(''),
    TellNumber: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Code: new FormControl(''),
    PrefixId: new FormControl(''),
    CountryId: new FormControl(''),
    StateId: new FormControl(''),
    CityId: new FormControl(''),
    Id: new FormControl(''),
    OrganizationId: new FormControl(''),
    IsActive: new FormControl(''),

  })


  submitted = false;
  get f() { return this.ConsultantForm.controls; }


  constructor(
    public SecUserService: SecUserService,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    public RoleFormService: RoleFormService,
    public ConsultantService: ConsultantService,
    private _toster: ToastrService,
    private route: ActivatedRoute,

    private router: Router) {
    this.edit = this.edit.bind(this);
    this.NewRecord = this.NewRecord.bind(this);
    this.delete = this.delete.bind(this);
  }

  onTableDataChange(event) {
    this.pagedDto.page = event;
    this.onSearch();
  }

  delete(e) {
    debugger
    // abp.message.confirm((""),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {
    //       this.ConsultantService.Delete(e.row.data.id).subscribe((Response) => {
    //         this._toster.info(Response.message)
    //         this.onSearch();
    //       })
    //     }
    //   }
    // )
    this.ConsultantService.Delete(e.row.data.id).subscribe((Response) => {
      this._toster.info(Response.message)
      this.onSearch();
    })
  }


  onSearch() {
  
    debugger
    this.pagedDto.keyword = this.keyword
    this.pagedDto.authAllowed = true;
    this.pagedDto.organizationId= parseInt(localStorage.getItem('organizationId'));
    this.ConsultantService.Get(this.pagedDto).subscribe((Response) => {
      debugger
      this.totalCount = Response.totalCount
      this.ConsultantList=[];
      this.ConsultantList = Response.consultantModel
    })
  }

  ngOnInit(): void {
    debugger
    this.loadSecRoleForm()
    this.loadCountries()
    this.loadRoles()
    this.loadActiveStatus();
    this.loadPrefix();
    this.loadStatus();
    this.onSearch();
  }


  loadPrefix(): void {
    this.SecUserService.getPrefix().subscribe((Response) => {
      this.PrefixList = Response
    })
  }

  
  onTableSizeChange(event): void {
    this.pagedDto.pageSize = event.target.value;
    this.onSearch();
  }

  loadSecRoleForm() {

    debugger

    this.formName = "Consultant"
    this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
      this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)

      if (this.secRoleForm.authAllowed == true) {
        this.isViewShown = true
        if (this.secRoleForm.updateAllowed == true) {
          this.isEditShown = true
        }
        else {
          this.isEditShown = false
        }
        if (this.secRoleForm.insertAllowed == true) {
          this.isAddShown = true
        }
        else {
          this.isAddShown = false
        }
      }
      else {
        this.isViewShown = false
        this.isEditShown = false
      }
    })

  }
  loadRoles(): void {
    debugger
    var roleId = parseInt(localStorage.getItem('roleId'));
    this.RoleFormService.getroles(roleId).subscribe((Response) => {
      this.roleList = Response
    })
  }



  onSubmit(): void {
    debugger
    this.submitted = true;
    if (this.ConsultantForm.invalid) {
      debugger
      this._toster.error("Some fields are required ");
      return;
    }
    if (this.id > 0 && this.id != null && this.id != undefined && this.id != NaN) {
      this.cuncMod.Id = this.id
    }

    this.cuncMod.Code = this.ConsultantForm.get('Code').value
    this.cuncMod.PrefixId = this.ConsultantForm.get('PrefixId').value
    this.cuncMod.Name = this.ConsultantForm.get('Name').value
    this.cuncMod.Email = this.ConsultantForm.get('Email').value
    this.cuncMod.Address = this.ConsultantForm.get('Address').value
    this.cuncMod.CountryId = parseInt(this.ConsultantForm.get('CountryId').value)
    this.cuncMod.StateId = parseInt(this.ConsultantForm.get('StateId').value)
    this.cuncMod.CityId = parseInt(this.ConsultantForm.get('CityId').value)
    this.cuncMod.TellNumber = this.ConsultantForm.get('TellNumber').value
    this.cuncMod.PhoneNumber = this.ConsultantForm.get('PhoneNumber').value
    this.cuncMod.OrganizationId = parseInt(localStorage.getItem('organizationId'));

    if (this.ConsultantForm.get('IsActive').value == 1) {
      this.cuncMod.IsActive = true;
    }
    else {
      this.cuncMod.IsActive = false;
    }

    this.ConsultantService.create(this.cuncMod).subscribe((Response) => {
      debugger
      this.onSearch();
      this._toster.info(Response.message)
       
     // this.NewRecord();
    })
  }


  reloadGrid( ) {
    this.pagedDto.page = 1;
    this.onSearch();
  }


  loadStatus(): void {
    const item = {
      id: 1,
      name: 'Active',
    };
    this.StatusList.push(item);
    const item2 = {
      id: 0,
      name: 'InActive',
    };
    this.StatusList.push(item2);

  }

  edit(e) {
    debugger
    this.id = e.row.data.id
    debugger
    this.ConsultantForm.controls.Email.setValue(e.row.data.email);
    this.ConsultantForm.controls.Name.setValue(e.row.data.name);
    this.ConsultantForm.controls.Address.setValue(e.row.data.address);
    this.ConsultantForm.controls.Code.setValue(e.row.data.code);
    this.ConsultantForm.controls.TellNumber.setValue(e.row.data.tellNumber);

    this.ConsultantForm.get('CountryId').setValue(e.row.data.countryId);
    this.loadState(e.row.data.countryId);
    this.ConsultantForm.get('StateId').setValue(e.row.data.stateId);
    this.loadCities(e.row.data.stateId);
    this.ConsultantForm.get('CityId').setValue(e.row.data.cityId);

    this.ConsultantForm.controls.PrefixId.setValue(e.row.data.prefixId);
    this.ConsultantForm.controls.PhoneNumber.setValue(e.row.data.phoneNumber);
    if (e.row.data.isActive == true) {
      this.ConsultantForm.controls.IsActive.setValue(1);
    } else { this.ConsultantForm.controls.IsActive.setValue(0); }
  }


  loadActiveStatus(): void {
    this.SecUserService.getActiveStatus().subscribe((Response) => {
      this.ActiveStatusList = Response
    })
  }


  loadCountries(): void {
    debugger
    this.SecUserService.getCountries().subscribe((Response) => {
      this.CountryList = Response
      let countryId = 0;
      this.loadState(countryId);
    })
  }


  loadState(countryId): void {
    this.StateList = null
    this.SecUserService.getStateByCountryId(countryId).subscribe((Response) => {
      this.StateList = Response
      this.CityList = null;
    })
  }


  loadCities(stateId): void {
    debugger
    this.CityList = null
    this.SecUserService.getCitiesByState(stateId).subscribe((Response) => {
      this.CityList = Response
    })
  }


  NewRecord() {
    debugger
    this.reloadGrid();
    this.id = 0;
    this.ConsultantForm.controls.Name.setValue('');
    this.ConsultantForm.controls.Email.setValue('');
    this.ConsultantForm.controls.Address.setValue('');
    this.ConsultantForm.controls.TellNumber.setValue('');
    this.ConsultantForm.controls.PhoneNumber.setValue('');
    this.ConsultantForm.controls.Code.setValue('');
    this.ConsultantForm.controls.PrefixId.setValue('');
    this.ConsultantForm.controls.CountryId.setValue('');
    this.ConsultantForm.controls.StateId.setValue('');
    this.ConsultantForm.controls.CityId.setValue('');
    this.ConsultantForm.controls.IsActive.setValue('');
  }

}
