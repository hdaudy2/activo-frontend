import { Component, Input,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
//import { ProjectAmountModel } from '@shared/Dto/Project-Amount-model';
import { ProjectLedgerModel } from '@shared/Dto/Project-Ledger-model';
import { ProjectLedgerDetailModel } from '@shared/Dto/Project-Ledger-Detail-model';

import { ProjectAmountReportsService } from 'shared/Services/Project-Amount-Reports-service';
import { ProjectAmountService } from 'shared/Services/Project-amount-service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  selector: 'app-project-amount-reports',
  templateUrl: './project-amount-reports.component.html',
  styleUrls: ['./project-amount-reports.component.css']
})

export class ProjectAmountReportsComponent implements OnInit {
  public ledgerdetail: ProjectLedgerDetailModel = new ProjectLedgerDetailModel();
  public item: ProjectLedgerModel = new ProjectLedgerModel();
  ProjectLedgerForm = new FormGroup({
    StandardId: new FormControl(''),
    OrganizationId: new FormControl(''),
    ProjectCode: new FormControl(''),
    Date: new FormControl(''),
    ReceiveAmount: new FormControl(''),
    InvoiceAmount: new FormControl(''),
    Balance: new FormControl(''),
    TotalReceiveAmount: new FormControl(''),

  })
  submitted = false;

 get f() { return this.ProjectLedgerForm.controls; }
  employees: Employee[] = [];
  @Input() formName : string
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number

  public pagedDto: PagedRequestModel = new PagedRequestModel()
  public keyword: string = ''
  public ProjectAmountReportsList = [];
  public ProjectLedgerDetailList = [];
  public CertificationList = [];
  public OrganizationList = [];
  public isEditShown: boolean
  public isViewShown: boolean
  public isAddShown: boolean
  public isShown: boolean = false 
  public userdata:any;
  addetail:boolean=false
  history:boolean=false
  public LedgerMasterId: number;
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


  constructor
  
    (
      
      public ProjectAmountReportsService: ProjectAmountReportsService,
      public LibraryResourceService: LibraryResourceService,
      private _toster: ToastrService,
      private route: ActivatedRoute,
      private router : Router,
      private _makerAuthorizerFormService: MakerAuthorizerFormService,
      service: EmployeesService,
    private indentRequestService : IndentRequestService

  ) 
  { debugger
    this.edit = this.edit.bind(this); 
    this.NewRecord=this.NewRecord.bind(this);
    this.delete=this.delete.bind(this);
  this.openPopup=this.openPopup.bind(this); 
  this.openPopup1=this.openPopup1.bind(this);
}

  ngOnInit(): void {
    
    this.loadSecRoleForm();
    this.loadAllCertification();
    this.loadAgency();
    this.onSearch();
    this.UserSubmit();
    this.UserSubmit1();
  }
  displayStyle = "none";
 
  openPopup(e) {
this.addetail=true

    this.ProjectLedgerForm.controls.ProjectCode.setValue(e.row.data.projectCode);
    this.LedgerMasterId=e.row.data.id;
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  openPopup1(e) {
    this.addetail=false
    this.displayStyle = "block";
    this.onSearch1(e.row.data.id)
    
  }
  
  loadSecRoleForm() {

    
    // let secRoleForm = JSON.parse(localStorage.getItem('secRoleForm'))
    // let permission = secRoleForm.find(x => x.formCode != null && x.formCode == this.formCode)

    // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {

    //   let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
    //   this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)
    
    var formName = "ProjectAmountReports"
    this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      
      this.secRoleForm = data.find(x => x.formName == formName)
      this.isShown = this.secRoleForm.authAllowed



      // if(this.secRoleForm.authAllowed == true )
      //   {
      //     this.isViewShown = true
      //     if(this.secRoleForm.updateAllowed==true)
      //     {
      //     this.isEditShown = true
      //     }
      //     else
      //     {
      //       this.isEditShown = false
      //     }
      //     if(this.secRoleForm.insertAllowed==true)
      //     {
      //         this.isAddShown = true
      //         }
      //         else
      //         {
      //           this.isAddShown = false
      //         }
      //   }
      //   else{
      //     this.isViewShown = false
      //     this.isEditShown = false
      //   }

     

    })

  }

//   onSubmit(): void {
        
//     this.item=new ProjectLedgerModel();

//  this.submitted = true;
    
//  // stop here if form is invalid
//  if (this.ProjectLedgerForm.invalid) {
//    this._toster.error("Some fields are required ");
//    return;
//  }
//  if(this.id>0 && this.id!=null && this.id!=undefined && this.id!=NaN)
//  {
//        this.item.Id = this.id
//  }
   
//     // this.item.Id=this.DocumentTypeForm.get('Id').value
//     this.item.OrganizationId=this.ProjectLedgerForm.get('OrganizationId').value
//     this.item.StandardId=this.ProjectLedgerForm.get('StandardId').value
    
    
//     if(this.ProjectLedgerForm.get('IsActive').value==1)
//     {
//       this.item.IsActive=true;
    
//     }
//     else
//     { 
//       this.item.IsActive=false;
    
//     }
//     var userId =localStorage.getItem('userId');
//     this.item.CreatedBy=parseFloat(userId);
//     // this.item.IsDeleted=this.CertificateForm.get('IsDeleted').value
    
//           this.ProjectAmountReportsService.create(this.item).subscribe((Response)=>{
     
//         this._toster.info(Response.message)
//         this.NewRecord();
//         this.onSearch();
       
//        })
//     }
delete(e) {
  
  // abp.message.confirm((""),
  // undefined,
  //     (result: boolean) => {
  //         if (result) {
  //           // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
  //           //     this._toster.info("Deleted successfully", "Status", {});

  //               this.ProjectAmountReportsService.Delete(e.row.data.id).subscribe((Response)=>{

  //                 this._toster.info(Response.message)
  //                 this.onSearch();
                 
  //                })
                
  //         }
  //       }
  //  )
  this.ProjectAmountReportsService.Delete(e.row.data.id).subscribe((Response)=>{

    this._toster.info(Response.message)
    this.onSearch();
   
   })
}

  NewRecord()
    
     
  {  

   //this.id=0;
   
  
 
   this.ProjectLedgerForm.controls.ProjectCode.setValue('');
   this.ProjectLedgerForm.controls.Date.setValue('');
   this.ProjectLedgerForm.controls.ReceiveAmount.setValue('');


   //this.ProjectLedgerForm.controls.Description.setValue(''); 
   //this.ProjectLedgerForm.controls.IsActive.setValue(''); 
   // window.location.reload();
   // this.ModuleForm.controls.Name.setValue('');
   //   this.ModuleForm.controls.Description.setValue('');
   //   this.ModuleForm.controls.Code.setValue('');
    
 
 
 
   //  let currentUrl = this.router.url;
   // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   // this.router.onSameUrlNavigation = 'reload';
   // this.router.navigate([currentUrl]);
    
  // this.router.navigateByUrl('/app/pages/certification-setups/module');
 
 }
  onTableDataChange(event) {
  }

  reloadGrid() {
  }

  onSearch() {
    
debugger
    this.pagedDto.organizationId= parseInt (this.ProjectLedgerForm.get('OrganizationId').value);
    this.pagedDto.standardId=this.ProjectLedgerForm.get('StandardId').value;
    

    this.pagedDto.keyword = this.keyword;
    this.pagedDto.authAllowed = true;
    this.ProjectAmountReportsService.Get(this.pagedDto).subscribe((Response) => {
      debugger
      this.totalCount = Response.totalCount
      this.ProjectAmountReportsList = Response.projectLedgerModel
      debugger
      const sum = this.ProjectAmountReportsList.reduce((sum, current) => sum + current.receivedAmount, 0);
     
    })
  }
  onSearch1(id:number) {
    // this.pagedDto.organizationId= parseInt (this.ProjectLedgerForm.get('OrganizationId').value);
    // this.pagedDto.standardId=this.ProjectLedgerForm.get('StandardId').value;
    

    this.pagedDto.keyword = this.keyword;
    this.pagedDto.authAllowed = true;
    this.ProjectAmountReportsService.GetAllPayments(id,this.pagedDto).subscribe((Response) => {
      debugger
      this.totalCount = Response.totalCount
      
      this.ProjectLedgerDetailList = Response.projectLedgerDetailModel
      this.ProjectLedgerForm.controls.TotalReceiveAmount.setValue(Response.totalReceivedAmount);
      this.ProjectLedgerForm.controls.Balance.setValue(Response.balanceAmount);
      this.ProjectLedgerForm.controls.InvoiceAmount.setValue(Response.invoiceAmount);

    })
    }

  SearchProduct(name: string) {  
    this.keyword=name
    this.onSearch();
    //this.UserSubmit();
    this.keyword= ''
  }

  loadAllCertification(): void {
    this.LibraryResourceService.getAllCertification().subscribe((Response) => {
      this.CertificationList = Response
    })
  }

  loadAgency(): void {
    this.ProjectAmountReportsService.getAllAgency().subscribe((Response) => {
      this.OrganizationList = Response
    })
  }
  id: number

  edit(e) { this.id=e.row.data.id
    // var updateDate =this.StandardList.find(x => x.id == this.id );
    
    // this._StandardService.GetStandardById(this.id).subscribe((res) => 
    // {
    
     // this.ModuleForm.controls.Code.setValue(e.row.data.code);
    
      this.ProjectLedgerForm.controls.OrganizationId.setValue(e.row.data.organizationId);
      this.ProjectLedgerForm.controls.StandardId.setValue(e.row.data.standardId);
      this.ProjectLedgerForm.controls.Amount.setValue(e.row.data.amount);
    
      this.ProjectLedgerForm.controls.Date.setValue(e.row.data.date);
      this.ProjectLedgerForm.controls.ReceiveAmount.setValue(e.row.data.receiveAmount);

    }
    userId:number
    
    UserSubmit(): void {
    
debugger   
      
      // const UserModel =
  
      // {
  
      //   //Id:this.userId ,
      //   ProjectCode: this.ProjectLedgerForm.get('ProjectCode').value,
      //   Date: this.ProjectLedgerForm.get('Date').value,
      //   ReceiveAmount: this.ProjectLedgerForm.get('ReceiveAmount').value,
      //  // LastModifiedById: LoginUserId.toString(),
      // }
      this.ledgerdetail.ProjectCode=this.ProjectLedgerForm.get('ProjectCode').value
      this.ledgerdetail.Date=this.ProjectLedgerForm.get('Date').value
      this.ledgerdetail.ReceiveAmount=this.ProjectLedgerForm.get('ReceiveAmount').value
      this.ledgerdetail.ProjectLedgerMasterId=this.LedgerMasterId

  
      this.ProjectAmountReportsService.create(this.ledgerdetail).subscribe((Response)=>{
     
        this._toster.info(Response.message)
       
        this.onSearch();
        this.NewRecord();
        this.closePopup();
      
  
      })
    }

    UserSubmit1(): void {
    
      debugger   
            
            // const UserModel =
        
            // {
        
            //   //Id:this.userId ,
            //   ProjectCode: this.ProjectLedgerForm.get('ProjectCode').value,
            //   Date: this.ProjectLedgerForm.get('Date').value,
            //   ReceiveAmount: this.ProjectLedgerForm.get('ReceiveAmount').value,
            //  // LastModifiedById: LoginUserId.toString(),
            // }
            // this.ledgerdetail.ProjectCode=this.ProjectLedgerForm.get('ProjectCode').value
            this.ledgerdetail.Date=this.ProjectLedgerForm.get('Date').value
            this.ledgerdetail.ReceiveAmount=this.ProjectLedgerForm.get('ReceiveAmount').value
            this.ledgerdetail.ProjectLedgerMasterId=this.LedgerMasterId
      
        
            this.ProjectAmountReportsService.create(this.ledgerdetail).subscribe((Response)=>{
           
              this._toster.info(Response.message)
              this.NewRecord();
        
            })
          }
}