import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {Observable} from 'rxjs';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { ActivatedRoute, Router} from '@angular/router';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
import { DxListModule } from "devextreme-angular";
import {  DxDataGridModule,DxDataGridComponent,DxSpeedDialActionModule,DxSelectBoxModule} from 'devextreme-angular';
import { DxTreeListModule } from "devextreme-angular";
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import DataSource from 'devextreme/data/data_source';
import { BrowserModule } from '@angular/platform-browser';
import { DxContextMenuModule } from "devextreme-angular";
import { IndentRequestService } from '@shared/Services/indent-request-service';
import { CertificationBodyModel } from '@shared/Dto/certification-body-model';
import {CertificationBodyService} from 'shared/Services/Certification-Body-service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-certification-body',
  templateUrl: './certification-body.component.html',
  styleUrls: ['./certification-body.component.css']
})
export class CertificationBodyComponent implements OnInit {

  public item: CertificationBodyModel = new CertificationBodyModel();
  CertificationBodyForm = new FormGroup({
    // Id: new FormControl(''),
    Id: new FormControl(''),
    Name: new FormControl(''),
    IsActive: new FormControl(''),
    Description: new FormControl(''),
    Code: new FormControl(''),
    Address: new FormControl(''),
   
  })
  submitted = false;

 get f() { return this.CertificationBodyForm.controls; }

  employees: Employee[] = [];
  @Input() formName : string
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  pageNumber : number = 1
  pageSize : number = 10
  public isEditShown : boolean  
  public isViewShown : boolean  
  public isAddShown : boolean  
  public keyword : string = ''
  public CertificationList = []
  public moduleList = [];
  public StatusList=[];
  fileToUpload: any;
 
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
    private indentRequestService : IndentRequestService,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    private _toster: ToastrService,
    private route: ActivatedRoute,
     public CertificationBodyService: CertificationBodyService,
     private router : Router) 
      { this.edit = this.edit.bind(this); 
      this.NewRecord=this.NewRecord.bind(this);
      this.delete=this.delete.bind(this);}

      ngOnInit(): void {
        
        
        this.loadSecRoleForm();
        this.loadStatus();
        this.onSearch()
      }
      id: number
    
      edit(e) {  
         
    // var List = [];
    // List=this.Liststandard                                                                             ; 
    // this.router.navigateByUrl('/app/pages/stock-management/library');
    this.id=e.row.data.id
    // var updateDate =this.StandardList.find(x => x.id == this.id );
    
    // this._StandardService.GetStandardById(this.id).subscribe((res) => 
    // {
    
     // this.ModuleForm.controls.Code.setValue(e.row.data.code);
      this.CertificationBodyForm.controls.Id.setValue(e.row.data.id);
      this.CertificationBodyForm.controls.Name.setValue(e.row.data.body);
      this.CertificationBodyForm.controls.Code.setValue(e.row.data.code);
      this.CertificationBodyForm.controls.Description.setValue(e.row.data.description); 
      this.CertificationBodyForm.controls.Address.setValue(e.row.data.address); 

    // this.CertificateForm.controls.StartDate.setValue(e.row.data.startdate);
      //let req = new Date(this.datePipe.transform(e.row.data.startDate, 'yyyy/MM/dd'))
    
       //this.CertificateForm.controls.StartDate.setValue(this.datePipe.transform(req, 'yyyy/MM/dd'))
    
      if(e.row.data.isActive==true){
      this.CertificationBodyForm.controls.IsActive.setValue(1);
      }else{this.CertificationBodyForm.controls.IsActive.setValue(0);}
      
      // });
      // this.router.navigate(['app/pages/stock-management/library']);
        //this.router.navigate(["account/login"]);
    // this.router.navigateByUrl('/app/pages/certification-setups/Standard?'+this.id);  
    }  

    delete(e) {
      
        //  this._toster.confirm((""),
        //  undefined,
        //      (result: boolean) => {
        //          if (result) {
        //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
        //            //     this._toster.info("Deleted successfully", "Status", {});
     
        //                this.CertificationBodyService.Delete(e.row.data.id).subscribe((Response)=>{
      
        //                  this._toster.info(Response.message)
        //                  this.onSearch();
                        
        //                 })
                       
        //          }
        //        }
        //   )
        this.CertificationBodyService.Delete(e.row.data.id).subscribe((Response)=>{
      
          this._toster.info(Response.message)
          this.onSearch();
         
         })
      }
    
    onTableDataChange(event) {
      this.pagedDto.page = event;
      this.onSearch();
    }
    loadSecRoleForm() {
    
      
        
      this.formName = "CertificationBody"
      this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
          
        let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
          
        this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)
    
      //this.isEditShown= this.secRoleForm.authAllowed
      // this.isViewShown = this.secRoleForm.authAllowed
    
      // var formName = "User"
      // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      //   this.secRoleForm = data.find(x => x.formName.toLocaleLowerCase() == formName.toLocaleLowerCase())
        if(this.secRoleForm.authAllowed == true )
        {
          this.isViewShown = true
          if(this.secRoleForm.updateAllowed==true)
          {
          this.isEditShown = true
          }
          else
          {
            this.isEditShown = false
          }
          if(this.secRoleForm.insertAllowed==true)
          {
              this.isAddShown = true
              }
              else
              {
                this.isAddShown = false
              }
        }
        else{
          this.isViewShown = false
          this.isEditShown = false
        }
        //this.isViewShown = this.secRoleForm.authAllowed
      })
        
    } 
    
    
    onTableSizeChange(event): void {
      this.pagedDto.pageSize = event.target.value;
      this.onSearch();
    
     }
    
      onSubmit(): void {
        
        // if (this.CertificationBodyForm.get('Code').value < 3) {
        //   this._toster.error("Standard Code should be 3 Character! ");
        //   return;
        // }
        this.item=new CertificationBodyModel();
        this.submitted = true;
    
        // stop here if form is invalid
        if (this.CertificationBodyForm.invalid) {
          this._toster.error("Some fields are required ");
          return;
        }
        if(this.id>0 && this.id!=null && this.id!=undefined && this.id!=NaN)
        {
              this.item.Id = this.id
        }
    
    // this.item.Id=this.DocumentTypeForm.get('Id').value
    this.item.body=this.CertificationBodyForm.get('Name').value
    this.item.Code=this.CertificationBodyForm.get('Code').value
    this.item.Description=this.CertificationBodyForm.get('Description').value
    this.item.Address=this.CertificationBodyForm.get('Address').value

    if(this.CertificationBodyForm.get('IsActive').value==1)
    {
      this.item.IsActive=true;
    
    }
    else
    { 
      this.item.IsActive=false;
    
    }
    var userId =localStorage.getItem('userId');
    this.item.CreatedBy=parseFloat(userId);
    // this.item.IsDeleted=this.CertificateForm.get('IsDeleted').value
    
          this.CertificationBodyService.create(this.item).subscribe((Response)=>{
     
        this._toster.info(Response.message)
        this.reloadGrid();
       this.NewRecord();
       })
    }
    
    onSearch(){
      
        
      this.pagedDto.keyword = this.keyword
      this.pagedDto.authAllowed = this.secRoleForm.authAllowed
      //this.pagedDto.pageSize = 3
      this.CertificationBodyService.Get(this.pagedDto).subscribe((Response) => {
                  
      
        this.totalCount = Response.totalCount
        this.CertificationList = Response.certificationBodyModel
      })
    }
    
    loadStatus(): void {
        
      const item = {
        id: 1,
        name:'Active',
      };
     this.StatusList.push(item);
     const item2 = {
      id: 0,
      name:'InActive',
      };
    this.StatusList.push(item2);
    
      } 
    
    reloadGrid()
     
    {
    
      this.pagedDto.page =1;
      this.onSearch();
    }
    
    NewRecord()
    
     
     {  
      // window.location.reload();
      this.id = 0;
      this.CertificationBodyForm.controls.Name.setValue('');
      this.CertificationBodyForm.controls.Code.setValue('');
      this.CertificationBodyForm.controls.Description.setValue(''); 
      this.CertificationBodyForm.controls.Address.setValue(''); 

   
      this.CertificationBodyForm.controls.IsActive.setValue('');
    
    }
    
    
    
    
    
    }
