import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Injectable} from '@angular/core'; 
import {HttpResponse} from '@angular/common/http';
import { DatePipe } from '@angular/common';
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
//import { AccreditationModel } from '@shared/Dto/accreditation-model';
import {HolidayCalendarService} from 'shared/Services/Holiday-Calendar-service';

import { ToastrService } from 'ngx-toastr';
import { HolidayCalendarModel } from '@shared/Dto/Holiday-Calendar-model';
// import { TreeviewItem } from 'ngx-treeview';

@Component({
  selector: 'app-holiday-calendar',
  templateUrl: './holiday-calendar.component.html',
  styleUrls: ['./holiday-calendar.component.css']
})
export class HolidayCalendarComponent implements OnInit {
  public item: HolidayCalendarModel = new HolidayCalendarModel();
  HolidayCalendarForm = new FormGroup({
  Id: new FormControl(''),
  Date: new FormControl(''),
  Description: new FormControl(''),
  HolidayTypeId: new FormControl(''),
  HolidayName: new FormControl(''),


   
  
 })
  submitted = false;

  get f() { return this.HolidayCalendarForm.controls; }
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
  public HolidayCalendarList = []
  public moduleList = [];
  public StatusList=[];
  public HolidayTypeList=[];
  public OrganizationId: number
 
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

  // public itCategory = new TreeviewItem({
  //   text: "IT",
  //   value: 9,
  //   children: [
  //     {
  //       text: "Programming",
  //       value: 91,
  //       children: [
  //         {
  //           text: "Frontend",
  //           value: 911,
  //           children: [
  //             { text: "Angular 1", value: 9111 },
  //             { text: "Angular 2", value: 9112 },
  //             { text: "ReactJS", value: 9113 },
  //           ],
  //         },
  //         {
  //           text: "Backend",
  //           value: 912,
  //           children: [
  //             { text: "C#", value: 9121 },
  //             { text: "Java", value: 9122 },
  //             { text: "Python", value: 9123, checked: false },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       text: "Networking",
  //       value: 92,
  //       children: [
  //         { text: "Internet", value: 921 },
  //         { text: "Security", value: 922 },
  //       ],
  //     },
  //   ],
  // });

  constructor(service: EmployeesService,
    private indentRequestService : IndentRequestService,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    private _toster: ToastrService,
    private route: ActivatedRoute,
    
     public HolidayCalendarService: HolidayCalendarService,
     private router : Router) { 
      this.edit = this.edit.bind(this);
    this.NewRecord=this.NewRecord.bind(this);
    this.delete=this.delete.bind(this);
  }

  ngOnInit(): void {
    
    
    
    this.loadSecRoleForm();
    this.loadHolidayType();
    //this.loadStatus();
    this.onSearch()
  }
  id: number
  datePipe = new DatePipe("en-US");

  edit(e) {  
     
// var List = [];
// List=this.Liststandard                                                                             ; 
// this.router.navigateByUrl('/app/pages/stock-management/library');
this.id=e.row.data.id
// var updateDate =this.StandardList.find(x => x.id == this.id );

// this._StandardService.GetStandardById(this.id).subscribe((res) => 
// {

 // this.ModuleForm.controls.Code.setValue(e.row.data.code);
 // this.HolidayCalendarForm.controls.Date.setValue(e.row.data.date);
  this.HolidayCalendarForm.controls.Description.setValue(e.row.data.description); 
   this.HolidayCalendarForm.controls.HolidayTypeId.setValue(e.row.data.holidayTypeId); 
   //this.OrganizationId = parseInt(localStorage.getItem('organizationId'));

  let To_Date = new Date(this.datePipe.transform(e.row.data.date, 'yyyy/MM/dd'))

        this.HolidayCalendarForm.controls.Date.setValue(this.datePipe.transform(To_Date, 'yyyy-MM-dd'))

// this.CertificateForm.controls.StartDate.setValue(e.row.data.startdate);
  //let req = new Date(this.datePipe.transform(e.row.data.startDate, 'yyyy/MM/dd'))

   //this.CertificateForm.controls.StartDate.setValue(this.datePipe.transform(req, 'yyyy/MM/dd'))

  // if(e.row.data.isActive==true){
  // this.HolidayCalendarForm.controls.IsActive.setValue(1);
  // }else{this.HolidayCalendarForm.controls.IsActive.setValue(0);}
  
  // });
  // this.router.navigate(['app/pages/stock-management/library']);
    //this.router.navigate(["account/login"]);
// this.router.navigateByUrl('/app/pages/certification-setups/Standard?'+this.id);  
}  

loadHolidayType(): void {

  this.HolidayCalendarService.GetAllHolidayTypeList().subscribe((Response) => {
    
    
    this.HolidayTypeList = Response

  })
}
  onSubmit(): void {
     
    this.item =new HolidayCalendarModel();
    this.submitted = true;

    // stop here if form is invalid
    if (this.HolidayCalendarForm.invalid) {
      this._toster.error("Some fields are required ");
      return;
    }
    if (this.id > 0 && this.id != null && this.id != undefined && this.id != NaN) {
      this.item.Id = this.id
    }

  if(this.id>0){this.item.Id=this.id}


this.item.Date=this.HolidayCalendarForm.get('Date').value
this.item.Description=this.HolidayCalendarForm.get('Description').value

 this.item.HolidayTypeId=this.HolidayCalendarForm.get('HolidayTypeId').value

// if(this.HolidayCalendarForm.get('IsActive').value==1)
// {
//   this.item.IsActive=true;

// }
// else
// { 
//   this.item.IsActive=false;

// }
var userId =localStorage.getItem('userId');
this.item.CreatedBy=parseFloat(userId);
this.item.OrganizationId = parseInt(localStorage.getItem('organizationId'));

// this.item.IsDeleted=this.CertificateForm.get('IsDeleted').value

      this.HolidayCalendarService.create(this.item).subscribe((Response)=>{
 
    this._toster.info(Response.message)
    this.reloadGrid();
    this.NewRecord();

   
   })
}

onTableDataChange(event) {
  this.pagedDto.page = event;
  this.onSearch();
}

// loadStatus(): void {
        
//   const item = {
//     id: 1,
//     name:'Active',
//   };
//  this.StatusList.push(item);
//  const item2 = {
//   id: 0,
//   name:'InActive',
//   };
// this.StatusList.push(item2);

//   } 

loadSecRoleForm() {
    
  
    
  this.formName = "HolidayCalendar"
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

delete(e) {
  
    //  this._toster.confirm((""),
    //  undefined,
    //      (result: boolean) => {
    //          if (result) {
    //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //            //     this._toster.info("Deleted successfully", "Status", {});
 
                
                   
    //          }
    //        }
    //   )
    this.HolidayCalendarService.Delete(e.row.data.id).subscribe((Response)=>{
  
    this._toster.info(Response.message)
      this.onSearch();
     
     })
    }

      onTableSizeChange(event): void {
        this.pagedDto.pageSize = event.target.value;
        this.onSearch();
      
       }

       onSearch(){
        
          
        this.pagedDto.keyword = this.keyword
        this.pagedDto.organizationId = parseInt( localStorage.getItem('organizationId'));
        //this.pagedDto.pageSize = 3
        this.HolidayCalendarService.Get(this.pagedDto).subscribe((Response) => {
                    
        
          this.totalCount = Response.totalCount
          this.HolidayCalendarList = Response.holidayCalendarModel
        })
      }
NewRecord()
    
     
{  
 this.id=0;
 
 this.HolidayCalendarForm.controls.Date.setValue('');
 this.HolidayCalendarForm.controls.Description.setValue(''); 
 this.HolidayCalendarForm.controls.HolidayTypeId.setValue(''); 




}

reloadGrid()
     
{

  this.pagedDto.page =1;
  this.onSearch();
}

}
