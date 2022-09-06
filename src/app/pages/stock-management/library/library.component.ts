//import { Component, OnInit } from '@angular/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { create } from 'lodash-es';
import { FormControl, FormGroup } from '@angular/forms';

import { RoleFormService } from '@shared/Services/sec-role-service'
import { RoleFormModel } from '@shared/Dto/role-form-model';
import { Router } from '@angular/router';
import { SecRoleFormModel } from '@shared/Dto/sec-role-form-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { LibraryResourceService } from '@shared/Services/library-Resource_service';
import { LibraryResourceModel } from '@shared/Dto/Library-Resource_model';
import { ActivatedRoute} from '@angular/router';
import { DatePipe } from '@angular/common';



//for test file
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from "@angular/common/http";
//import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
//import { AppConsts } from "../AppConsts";
//import { LibraryResourceModel } from "../Dto/Library-Resource_model";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { TagContentType } from '@angular/compiler';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Employee } from '@app/pages/sales/employees.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';


//export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  animations: [appModuleAnimation()]
}) 
export class LibraryComponent implements OnInit {
  @ViewChild('content',{static: false}) content : ElementRef;
  employees: Employee[] = [];
  public moduleList = [];
  public DocumentList = [];
  public ReviewerList = [];
  public StatusList = [];
  public CertificationList = [];
  public url:string
  message: string;
  progress: number;
  pipe = new DatePipe('en-US');
  datePipe = new DatePipe("en-US");
  formName : string
  public isAddShown : boolean
   secRoleForm
   public isViewShown : boolean  

  public item: LibraryResourceModel = new LibraryResourceModel();
  LibraryForm = new FormGroup({
    Id: new FormControl(''),
    ModuleId: new FormControl(''),
    Title: new FormControl(''),
    Version: new FormControl(''),
    Uploaddate: new FormControl(''),
    Description: new FormControl(''),
    Reviewer: new FormControl(''),

    CertificationId: new FormControl(''),
    StatusId: new FormControl(''),
    DocumentTypeId: new FormControl(''),
    //IsActive: new FormControl(''),
    //IsDeleted: new FormControl(''),
    File: new FormControl(''),
   
  })
  fileToUpload: File;
  constructor(private http: HttpClient,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
   // private route: Router,
    private _toster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,

    public LibraryResourceService: LibraryResourceService
  ) { }
 id: number 

  ngOnInit(): void {
    this.loadSecRoleForm()
   var  ur ;
   ur=window.location.href.split("/")[7];
   var com=[]=ur.split("?")[1];
   if(com!=undefined && com!=null)
   {
   var PId=com.split("=")[0];
   this.id=PId;
    
   
    //this.id = this.route.snapshot.params.id;

   
        if (this.id>0) 
        {
          this.LibraryResourceService.GetLibraryById(this.id).subscribe((res) => {
          
            this.LibraryForm.controls.ModuleId.setValue(res.moduleId);
            this.LibraryForm.controls.Title.setValue(res.title);
            this.LibraryForm.controls.Version.setValue(res.version);
            var Librarydate = new Date(res.date);
          // var LBDate= this.pipe.transform(res.date,'MM/dd/yyyy');
           let req = new Date(this.datePipe.transform(res.date, 'yyyy/MM/dd'))
           // this.LibraryForm.controls.Uploaddate.setValue(LBDate);
           this.LibraryForm.controls.Uploaddate.setValue(this.datePipe.transform(req, 'yyyy-MM-dd'))
            this.LibraryForm.controls.Description.setValue(res.description);
            this.LibraryForm.controls.Reviewer.setValue(res.reviewer);
            this.LibraryForm.controls.DocumentTypeId.setValue(res.documentTypeId);
            this.LibraryForm.controls.CertificationId.setValue(res.certificationId);
            this.LibraryForm.controls.StatusId.setValue(res.statusId);
            
          

            
  
         
          });
        }
   }
    
  
    this.loadModule();
    this.loadDocumentType();
    this.loadReviewer();
    this.loadStatus();
    this.loadAllCertification();
    
    
  
  }
  loadSecRoleForm() {
        debugger
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
       
        if(this.secRoleForm.insertAllowed==true)
        {
            this.isAddShown = true
        }
            else
            {
              
              this.isAddShown = false
              //this._toster.info("Not Allowed")
        //this.reloadGrid();
        //this.router.navigateByUrl('/app/home');
            }
      }
      else{
        this.isViewShown = false
        // this._toster.info("Not Allowed")
        // //this.reloadGrid();
        // this.router.navigateByUrl('/app/home');
       
       
      }
      //this.isViewShown = this.secRoleForm.authAllowed
    })
      
  } 
  handlefileInput(e: any)
  {

this.fileToUpload= <File>e?.target?.files[0];
//this.url=e.target.value; 


  }

  fileChange(event, item) {
    
    item.binary = event;
    var r = new FileReader();
    r.onload = function(e) { 
      item.binary = r.result
    }
    r.readAsArrayBuffer(event.target.files[0]);
  }
  // editIconClick(e) {  
  //   this.router.navigateByUrl('/app/pages/stock-management/library/'+ e.row.data.id);  
  //  }  
  deleteItem(id: number) {
    
    // this._toster.confirm((""),
    // undefined,
    //     // (result: boolean) => {
    //     //     if (result) {
    //     //       this._purchaseOrderService.DeletePO(id).subscribe(() => {   
    //     //           this._toster.info("Deleted successfully", "Status", {});
    //     //       });
    //     //     }
    //     //   }
    //  ) 
  }

  loadModule(): void {
      
    this.LibraryResourceService.getMOdule().subscribe(
      (Response)=>{
      this.moduleList = Response
       // this._toster.success('sucess')
    },
    // (err) =>{
    //     this._toster.error('error');
    // }
    )
  } 
  loadDocumentType(): void {
      
    this.LibraryResourceService.getDoucmentType().subscribe((Response)=>{
      this.DocumentList = Response
        
    })
  }
  loadReviewer(): void {
    var OrganizationId =localStorage.getItem('organizationId');
    this.LibraryResourceService.getAllReviewer(OrganizationId).subscribe((Response)=>{
      this.ReviewerList = Response
        
    })
  }
  loadStatus(): void {
      
    this.LibraryResourceService.getStatus().subscribe((Response)=>{
      this.StatusList = Response
        
    })
  }
  loadAllCertification(): void {
      
    this.LibraryResourceService.getAllCertification().subscribe((Response)=>{
      this.CertificationList = Response
        
    })
  }
  onSubmit(): void 
  {

    

    var MesseageError="";
if(this.LibraryForm.get('ModuleId').value ==null ||this.LibraryForm.get('ModuleId').value==undefined|| this.LibraryForm.get('ModuleId').value=="")
{  this._toster.error("Module is Empty","Alert")
return
// MesseageError="Module is Empty";
}
if(this.LibraryForm.get('Title').value ==null ||this.LibraryForm.get('Title').value==undefined|| this.LibraryForm.get('Title').value=="")
{  this._toster.error("Title is Empty","Alert")
return
// MesseageError="Title is Empty";
}
if(this.LibraryForm.get('Version').value ==null ||this.LibraryForm.get('Version').value==undefined|| this.LibraryForm.get('Version').value=="")
{  this._toster.error("Version is Empty","Alert")
return
// MesseageError="Version is Empty";
}


    // this.item.ModuleId = this.LibraryForm.get('ModuleId').value
    // this.item.Title = this.LibraryForm.get('Title').value
    // this.item.Version = this.LibraryForm.get('Version').value
    // this.item.Date = this.LibraryForm.get('Date').value
    // this.item.Description = this.LibraryForm.get('Description').value
    // this.item.Reviewer=this.LibraryForm.get('Reviewer').value
    // this.item.CertificationId = this.LibraryForm.get('CertificationId').value
    // this.item.StatusId = this.LibraryForm.get('StatusId').value
    // this.item.IsActive = true
    // this.item.DocumentTypeId=this.LibraryForm.get('DocumentTypeId').value
    // this.item.File=this.fileToUpload
  
  //   let formData:FormData = new FormData();  
  
    //this.saving = false;
   LBId: String;
 
  const foData:FormData = new FormData();
  foData.append('ModuleId',this.LibraryForm.get('ModuleId').value);
  if (this.id != undefined && this.id != null && this.id>0) {

    foData.append("Id",this.id.toString());
  }
  else
  {
    if(this.fileToUpload ==null ||this.fileToUpload==undefined )
    {  this._toster.error("Document File is Empty","Alert")
    return
    // MesseageError="Document File is Empty";
    }
  }
  foData.append('Title',this.LibraryForm.get('Title').value);
   foData.append('Version',this.LibraryForm.get('Version').value);
   foData.append('Date',this.LibraryForm.get('Uploaddate').value);
   foData.append('Description',this.LibraryForm.get('Description').value);
   foData.append('Reviewer',this.LibraryForm.get('Reviewer').value);
   foData.append('DocumentTypeId',this.LibraryForm.get('DocumentTypeId').value);
   foData.append('CertificationId',this.LibraryForm.get('CertificationId').value);
   foData.append('StatusId',this.LibraryForm.get('StatusId').value);
  foData.append('File',this.fileToUpload);

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

this.LibraryResourceService.PostItemReturnListPagination(foData).subscribe((Response)=>{
 
     this._toster.info(Response.message)
    
    })

  }
    // this.LibraryResourceService.create(this.item).subscribe((Response)=>{
 
    // //  this._toster.info(Response.message)
     
    //  })

  
  

      //this.LibraryResourceService.create(this.item).subscribe((Response)=>{
      
 
 
//  this.LibraryResourceService.PostItemReturnListPagination(formData).subscribe((event) => 
//  {
//   if (event.type === HttpEventType.UploadProgress)
//       this.progress = Math.round((100 * event.loaded) / event.total);
//   else if (event.type === HttpEventType.Response) {
//       this.message = 'Download success.';
//       this.downloadFile(event);
//   }
// });

//}

// private downloadFile(data: HttpResponse<Blob>) {
//   const downloadedFile = new Blob([data.body], { type: data.body.type });
//   const a = document.createElement('a');
//   a.setAttribute('style', 'display:none;');
//   document.body.appendChild(a);
//   a.download =this.fileToUpload ;
//   a.href = URL.createObjectURL(downloadedFile);
//   a.target = '_blank';
//   a.click();
//   document.body.removeChild(a);
// }




}
