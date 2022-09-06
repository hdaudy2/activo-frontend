import { Component, Input, OnInit, Output , EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IndentRequestService } from '@shared/Services/indent-request-service'
import { LibraryResourceService } from '@shared/Services/library-Resource_service';
import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {Observable} from 'rxjs';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { ActivatedRoute} from '@angular/router';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';

import { DxTreeListModule } from "devextreme-angular";
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import DataSource from 'devextreme/data/data_source';
import { BrowserModule } from '@angular/platform-browser';
import { DxContextMenuModule } from "devextreme-angular";
import { DxListModule } from "devextreme-angular";
import {  DxDataGridModule,DxDataGridComponent,DxSpeedDialActionModule,DxSelectBoxModule} from 'devextreme-angular';
import { LibraryResourceModel } from '@shared/Dto/Library-Resource_model';
import { ToastrService } from 'ngx-toastr';



declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-indenting-maker-list',
  templateUrl: './indenting-maker-list.component.html',
  styleUrls: ['./indenting-maker-list.component.css']
 
          
})

export class IndentingMakerListComponent implements OnInit {
  public item: LibraryResourceModel = new LibraryResourceModel();
  StandardForm = new FormGroup({
    CertificationId: new FormControl(''),
    ModuleId: new FormControl(''),
    Title : new FormControl(''),
  })
  
  employees: Employee[] = [];
   formName : string
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
  public LibraryList = []
  public moduleList = [];
  fileToUpload: any;

  public standardList = [];
  public CertificationList =[];
  // LibraryForm = new FormGroup({
   
  //   ModuleId: new FormControl(''),
    
  
  // })
  readonly allowedPageSizes = [5, 10, 100,'all'];
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
 
 //keyword = '';
 
  
  constructor(service: EmployeesService,
   private indentRequestService : IndentRequestService,
   private _makerAuthorizerFormService: MakerAuthorizerFormService,
   private _toster: ToastrService,
    public LibraryResourceService: LibraryResourceService,
    
    // private LoginComponent: LoginComponent,
    private router : Router
  ) { 
    this.editIconClick = this.editIconClick.bind(this);  
    this.Downloadfile=this.Downloadfile.bind(this);
    this.delete=this.delete.bind(this);
    this.employees = service.getEmployees();
  }
  
       ngOnInit(): void
        {
          this.pagedDto.page=1;
         this.loadSecRoleForm();
      
         this.onstandard();
         this.loadstandard();
         this.loadModule();
       }

  //     editIconClick(e) {  
  //        
  // // this.router.navigateByUrl('/app/pages/stock-management/library');
  // // this.router.navigateByUrl('/app/pages/stock-management/library');
  // edit-library/:id
  //      this.router.navigate(['app/pages/stock-management/library']);
  //       //this.router.navigate(["account/login"]);
  //   // this.router.navigate('/app/pages/stock-management/library/'+ e.row.data.id);  
  //  }  

  public id: number
  editIconClick(e) {  
           
    // this.router.navigateByUrl('/app/pages/stock-management/library');
    this.id=e.row.data.id;
        // this.router.navigate(['app/pages/stock-management/library']);
          //this.router.navigate(["account/login"]);
      this.router.navigateByUrl('/app/pages/stock-management/library?'+this.id);  
     }  
   edit(e) {  
    
//this.router.navigate([/app/pages/stock-management/library/']);  
}  
    loadModule(): void {
    
      this.LibraryResourceService.getMOdule().subscribe((Response)=>{
        this.moduleList = Response

       
        this.moduleList.push({id: 0 , name: "ALL Modules" })



          
      })
    }
    onTableDataChange(event) {
      this.pagedDto.page = event;
      this.onstandard();
    }
    reloadGrid()
  
    {
  
      this.pagedDto.page =1;
      this.onstandard();
    }
    loadSecRoleForm() {debugger
        
      this.formName = "LibraryResources"
      this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
          
        let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
          
        this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)
    
      //this.isEditShown= this.secRoleForm.authAllowed
      // this.isViewShown = this.secRoleForm.authAllowed
  
      // var formName = "User"
      // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      //   this.secRoleForm = data.find(x => x.formName.toLocaleLowerCase() == formName.toLocaleLowerCase())
        if(this.secRoleForm.viewRecordAllowed == true )
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
      this.onstandard();
    }
   
  
   
//filter product details on name and return productDetails object.

onSearch(){
  this.pagedDto.page = 1;
  this.onstandard();
//   debugger
//   this.LibraryList=[];
//   this.totalCount = 0;
//  // var dropdwn=this.StandardForm.value;
//  var PageNo=this.pagedDto.page;
//  this.LibraryResourceService.getdata(this.StandardForm.value,PageNo).subscribe((Response) => {
//              debugger 

//   this.LibraryList = Response.libraryModel
//   this.totalCount = Response.totalCount
  
// })
}

// onSearch(){
    
//   this.pagedDto.keyword = this.keyword
//   this.pagedDto.authAllowed = this.secRoleForm.authAllowed
//   this.pagedDto.pageSize = 3
//   this.LibraryResourceService.Get(this.pagedDto).subscribe((Response) => {
              
  
//     this.totalCount = Response.totalCount
//     this.LibraryList = Response.libraryModel
//   })
// }

SearchProduct(name: string) {  
  this.keyword=name
  this.onstandard();
  this.keyword= ''
}


  // edit(item) {
  //     
  //   this.indentRequestService.setIndentMaker(item)
  //   this.router.navigate(['app/pages/stock-management/indenting-maker'])
   

  // }
 

//   PrintReceipt(): void {
//   
   
    
//   }
downloadPdf(description) {
  const pdfUrl = './assets/documents/'+description+'.pdf';
  const pdfName = description;
  FileSaver.saveAs(pdfUrl, pdfName);
}
onSubmit() {  
  this.router.navigateByUrl('/app/pages/stock-management/library');
} 
Downloadfile(e): void {
   

  this.id=e.row.data.id;
  var fillename=e.row.data.title;
  //this.LibraryResourceService.PostItemReturnListPagination().subscribe((result:Blob)=>
   // const downloadedFile = new Blob([data.body], { type: data.body.type });
  this.LibraryResourceService.downloadFile(this.id).subscribe((result:Blob)=>{
    const Blb =new Blob([result], { type: result.type });
    // const url=window.URL.createObjectURL(Blb);
    // window.open(url);
    // console.log("success");
  
    
    const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
     a.download =fillename;  
     // const fileName =
      
      //="farooq";
      a.href = URL.createObjectURL(Blb);
      a.target = '_blank';
      a.click();
      document.body.removeChild(a);
      
  })
}
delete(e) {
  
    //  this._toster.confirm((""),
    //  undefined,
    //      (result: boolean) => {
    //          if (result) {
    //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //            //     this._toster.info("Deleted successfully", "Status", {});
 
    //                this.LibraryResourceService.Delete(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onstandard();
                    
    //                 })
                   
    //          }
    //        }
    //   )
    this.LibraryResourceService.Delete(e.row.data.id).subscribe((Response)=>{
  
      this._toster.info(Response.message)
      this.onstandard();
     
     })
  }


      loadstandard(): void {
      
        this.LibraryResourceService.getAllCertification().subscribe((Response)=>{
          this.CertificationList = Response
            this.CertificationList.push({id: 0 , name: "---- ALL----" })
            this.CertificationList.reverse();
        })
      }

      onstandard(){
        debugger
        this.LibraryList=[];
        this.totalCount = 0;
       // var dropdwn=this.StandardForm.value;
       var PageNo=this.pagedDto.page;
       this.LibraryResourceService.getdata(this.StandardForm.value,PageNo).subscribe((Response) => {
                   debugger 
    
        this.LibraryList = Response.libraryModel
        this.totalCount = Response.totalCount
        
      })
      }
      
} 