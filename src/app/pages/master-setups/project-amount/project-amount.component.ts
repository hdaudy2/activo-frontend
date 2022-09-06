import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import { ProjectAmountModel } from '@shared/Dto/Project-Amount-model';
import { ProjectAmountService } from 'shared/Services/Project-Amount-service';
import { LibraryResourceService } from 'shared/Services/library-Resource_service';
import { IndentRequestService } from '@shared/Services/indent-request-service';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DxBulletModule, DxButtonModule, DxContextMenuModule, DxTemplateModule, DxTreeListModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { DxListModule } from "devextreme-angular";
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import DataSource from 'devextreme/data/data_source';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-amount',
  templateUrl: './project-amount.component.html',
  styleUrls: ['./project-amount.component.css']
})

export class ProjectAmountComponent implements OnInit {

  public item: ProjectAmountModel = new ProjectAmountModel();
  ProjectAmountForm = new FormGroup({
    Id: new FormControl(''),
    OrganizationId: new FormControl(''),
    StandardId: new FormControl(''),
    Amount: new FormControl(''),
    IsActive: new FormControl(''),
    Description: new FormControl(''),
    Date: new FormControl(''),
    CreatedBy: new FormControl(''),
    CreatedDate: new FormControl(''),
    LastupdatedId: new FormControl(''),
  })

  employees: Employee[] = [];
  @Input() formName: string
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  pipe = new DatePipe('en-US');
  datePipe = new DatePipe("en-US");
  public totalCount: number
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  pageNumber: number = 1
  pageSize: number = 10
  public isEditShown: boolean
  public isViewShown: boolean
  public isAddShown: boolean
  public keyword: string = ''
  public ProjectAmounList = []
  public moduleList = [];
  public StatusList = [];
  public CertificationList = [];
  public OrganizationList = [];
  fileToUpload: any;

  LibraryForm = new FormGroup({
    ModuleId: new FormControl(''),
  })

  readonly allowedPageSizes = [5, 10, 'all'];
  readonly displayModes = [{ text: "Display Mode 'full'", value: "full" }, { text: "Display Mode 'compact'", value: "compact" }];
  displayMode = "full";
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;

  customizeColumns(columns) {
    columns[0].width = 70;
  }


  get isCompactMode() {
    return this.displayMode === "compact";
  }

  constructor(service: EmployeesService,
    private indentRequestService: IndentRequestService,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    private _toster: ToastrService,
    private route: ActivatedRoute,
    public ProjectAmountService: ProjectAmountService,
    private router: Router,
    public LibraryResourceService: LibraryResourceService) {
    this.edit = this.edit.bind(this);
    this.NewRecord = this.NewRecord.bind(this);
    this.delete=this.delete.bind(this);
  }

  ngOnInit(): void {
    

    this.loadSecRoleForm();
    this.loadStatus();
    this.onSearch();
    this.loadAllCertification();
    this.loadAgency();
  }

  id: number

  edit(e) {
    

    this.id = e.row.data.id
    
    this.ProjectAmountForm.controls.Id.setValue(e.row.data.id);
    this.ProjectAmountForm.controls.StandardId.setValue(e.row.data.standardId);
    this.ProjectAmountForm.controls.OrganizationId.setValue(e.row.data.organizationId);
    this.ProjectAmountForm.controls.Amount.setValue(e.row.data.amount);

    let Project_Date = new Date(this.datePipe.transform(e.row.data.date, 'yyyy/MM/dd'))

    this.ProjectAmountForm.controls.Date.setValue(this.datePipe.transform(Project_Date, 'yyyy-MM-dd'))
    //this.ProjectAmountForm.controls.Date.setValue(e.row.data.date);

    this.ProjectAmountForm.controls.Description.setValue(e.row.data.description);
    if (e.row.data.isActive == true) {
      this.ProjectAmountForm.controls.IsActive.setValue(1);
    } else { this.ProjectAmountForm.controls.IsActive.setValue(0); }
  }

  loadAllCertification(): void {
    this.LibraryResourceService.getAllCertification().subscribe((Response) => {
      this.CertificationList = Response
    })
  }

  loadAgency(): void {
    this.ProjectAmountService.getAllAgency().subscribe((Response) => {
      this.OrganizationList = Response
    })
  }

  delete(e) {
    
    // abp.message.confirm((""),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {
    //       this.ProjectAmountService.Delete(e.row.data.id).subscribe((Response) => {
    //         this._toster.info(Response.message)
    //         this.onSearch();
    //       })
    //     }
    //   }
    // )
    this.ProjectAmountService.Delete(e.row.data.id).subscribe((Response) => {
      this._toster.info(Response.message)
      this.onSearch();
    })
  }

  onTableDataChange(event) {
    this.pagedDto.page = event;
    this.onSearch();
  }

  loadSecRoleForm() {
    

    this.formName = "ProjectAmount"
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

  onTableSizeChange(event): void {
    this.pagedDto.pageSize = event.target.value;
    this.onSearch();
  }

  onSubmit(): void {
    

    var LoginUserId = localStorage.getItem('userId');
    if (this.id > 0) {
      this.item.Id = this.id
      this.item.LastUpdatedId = parseInt(LoginUserId)
    }
    else {
      this.item.CreatedBy = parseInt(LoginUserId)
    }


    this.item.OrganizationId = this.ProjectAmountForm.get('OrganizationId').value
    this.item.Amount = this.ProjectAmountForm.get('Amount').value
    this.item.StandardId = this.ProjectAmountForm.get('StandardId').value
    this.item.Date = this.ProjectAmountForm.get('Date').value
   this.item.Description = this.ProjectAmountForm.get('Description').value
   this.item.IsActive = this.ProjectAmountForm.get('IsActive').value


    if (this.ProjectAmountForm.get('IsActive').value == 1) {
      this.item.IsActive = true;
    }
    else {
      this.item.IsActive = false;
    }


  var MesseageError = "";
  if (this.ProjectAmountForm.get('OrganizationId').value == null || this.ProjectAmountForm.get('OrganizationId').value == undefined || this.ProjectAmountForm.get('OrganizationId').value == "") {
    this._toster.error("Agency is Empty", "Alert")
    return
  }
  if (this.ProjectAmountForm.get('StandardId').value == null || this.ProjectAmountForm.get('StandardId').value == undefined || this.ProjectAmountForm.get('StandardId').value == "") {
    this._toster.error("Standard is Empty", "Alert")
    return
  }
  if (this.ProjectAmountForm.get('Amount').value == null || this.ProjectAmountForm.get('Amount').value == undefined || this.ProjectAmountForm.get('Amount').value == "") {
    this._toster.error("Amount is Empty", "Alert")
    return
  }

  // if (this.ProjectAmountForm.get('Status').value == null || this.ProjectAmountForm.get('Status').value == undefined || this.ProjectAmountForm.get('Status').value == "") {
  //   this._toster.error("Status is Empty", "Alert")
  //   return
  // }


    this.ProjectAmountService.create(this.item).subscribe((Response) => {
      this._toster.info(Response.message)
      

    
      this.reloadGrid();
      this.NewRecord() 
    })
  }

  // onSubmit(): void {
  //   

  //   var LoginUserId = localStorage.getItem('userId');
  //      if (this.id > 0) {
  //        this.item.Id = this.id
  //        this.item.LastUpdatedId = parseInt(LoginUserId)
  //      }
  //      else {
  //        this.item.CreatedBy = parseInt(LoginUserId)
  //      }

  //   var MesseageError = "";
  //   if (this.ProjectAmountForm.get('OrganizationId').value == null || this.ProjectAmountForm.get('OrganizationId').value == undefined || this.ProjectAmountForm.get('OrganizationId').value == "") {
  //     this._toster.error("Agency is Empty", "Alert")
  //     return
  //   }
  //   if (this.ProjectAmountForm.get('StandardId').value == null || this.ProjectAmountForm.get('StandardId').value == undefined || this.ProjectAmountForm.get('StandardId').value == "") {
  //     this._toster.error("Standard is Empty", "Alert")
  //     return
  //   }
  //   if (this.ProjectAmountForm.get('Amount').value == null || this.ProjectAmountForm.get('Amount').value == undefined || this.ProjectAmountForm.get('Amount').value == "") {
  //     this._toster.error("Amount is Empty", "Alert")
  //     return
  //   }
   
  //   LBId: String;

  //   const foData: FormData = new FormData();
  //   foData.append('OrganizationId', this.ProjectAmountForm.get('OrganizationId').value);
  //   if (this.id != undefined || this.id != null) {
  //     foData.append("Id", this.id.toString());
  //   }
  //   foData.append('OrganizationId', this.ProjectAmountForm.get('OrganizationId').value);
  //   foData.append('StandardId', this.ProjectAmountForm.get('StandardId').value);
  //   foData.append('Date', this.ProjectAmountForm.get('Uploaddate').value);
  //   foData.append('Description', this.ProjectAmountForm.get('Description').value);
  //   foData.append('Amount', this.ProjectAmountForm.get('Amount').value);
  //   foData.append('IsActive', this.ProjectAmountForm.get('IsActive').value);
  
  //   // this.ProjectAmountService.PostItemReturnListPagination(foData).subscribe((Response) => {
  //   //   this._toster.info(Response.message)

  //     this.ProjectAmountService.create(this.item).subscribe((Response) => {
  //         this._toster.info(Response.message)

  //     this.id = null;
  //          this.ProjectAmountForm.controls.Id.setValue('');
  //          this.ProjectAmountForm.controls.OrganizationId.setValue('');
  //          this.ProjectAmountForm.controls.StandardId.setValue('');
  //          this.ProjectAmountForm.controls.Date.setValue('');
  //          this.ProjectAmountForm.controls.Amount.setValue('');
  //          this.ProjectAmountForm.controls.Code.setValue('');
  //          this.ProjectAmountForm.controls.Description.setValue('');
  //          this.ProjectAmountForm.controls.Status.setValue('');
  //         this.reloadGrid();
  //   })
  // }

  onSearch() {
    

    this.pagedDto.keyword = this.keyword;
    this.pagedDto.authAllowed = true;
    this.ProjectAmountService.Get(this.pagedDto).subscribe((Response) => {
      
      this.totalCount = Response.totalCount
      this.ProjectAmounList = Response.projectAmountModel
    })
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


  reloadGrid() {
    this.pagedDto.page = 1;
    this.onSearch();
  }


  NewRecord() {
    this.id = null;
    this.ProjectAmountForm.controls.Id.setValue('');
    this.ProjectAmountForm.controls.OrganizationId.setValue('');
    this.ProjectAmountForm.controls.StandardId.setValue('');
    this.ProjectAmountForm.controls.Date.setValue('');
    this.ProjectAmountForm.controls.Amount.setValue('');
   this.ProjectAmountForm.controls.Description.setValue('');
    this.ProjectAmountForm.controls.IsActive.setValue('');
  }
}
