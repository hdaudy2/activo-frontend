
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import { IndentRequestService } from '@shared/Services/indent-request-service';
import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {Observable} from 'rxjs';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { ActivatedRoute} from '@angular/router';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
import { DxListModule } from "devextreme-angular";
import {  DxDataGridModule,DxDataGridComponent,DxSpeedDialActionModule,DxSelectBoxModule} from 'devextreme-angular';
import { DxTreeListModule } from "devextreme-angular";
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import DataSource from 'devextreme/data/data_source';
import { BrowserModule } from '@angular/platform-browser';
import { DxContextMenuModule } from "devextreme-angular";
import { createDeflate } from 'zlib';
import {UserStandardService} from 'shared/Services/User-Standard-service';
import { SecUserService } from '@shared/Services/sec-user.service';
import { SecUserModel } from '@shared/Dto/sec-user-model';
import { ToastrService } from 'ngx-toastr';
SecUserService
@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {

  public SecUserModel: SecUserModel = new SecUserModel();
  employees: Employee[] = [];
  @Input() formName : string
  secRoleForm
  secRoleForm2
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  pageNumber : number = 1
  pageSize : number = 10
  public isEditShown : boolean  
  public isViewShown : boolean  
  public isAddShown : boolean  
  public keyword : string = ''
  public StandardList = []
  public UserStandardList = []
  public DeclarationList = []
  public AcademicList = []
  public CPDList=[];
  public EmploymentList=[];
  public ProfessionalList=[];
  public ConsultancyList=[];
  public AuditList=[];
  public AuditorNaceList=[];
  public List = []
  public moduleList = [];
  div1: boolean=false;
 public ApprovalList= [];
  public card: any;
  fileToUpload: any;
  photoPath:any;
  public Confidentialitypath :boolean =false
  public PhotoPath:boolean =false
  public ContractPath:boolean =false
  submitted = false;
  UserstandardId : number
  UserauditorNaceId : number
public ApprovalStatusId: any
public Remarks: string
  public standard:boolean=false
  public auditor:boolean=false

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
  CardForm = new FormGroup({
      Id: new FormControl(''),
      UserName: new FormControl(''),
      FullName: new FormControl(''),
      Email: new FormControl(''),
      Role: new FormControl(''),
      UserTypeId: new FormControl(''),
      Password: new FormControl(''),
      ConfirmPassword: new FormControl(''),
      Department: new FormControl(''),
      Designation: new FormControl(''),
      IsActive: new FormControl(''),
      IsSubmitted: new FormControl(''),
      SbpAllowed: new FormControl(''),
      Address1: new FormControl(''),
      Address2: new FormControl(''),
      PostalCode: new FormControl(''),
      Telephone: new FormControl(''),
      Mobile: new FormControl(''),
      Code:new FormControl(''),
      DateofBirth:new FormControl(''),
      PrefixId:new FormControl(''),
      Prefix:new FormControl(''),
      CountryName:new FormControl(''),
      Stateus:new FormControl(''),
      StateName:new FormControl(''),
      CityName:new FormControl(''),
      PhotoFile:new FormControl(''),
      ConfidentialityFile:new FormControl(''),
      ContractFile:new FormControl(''),
      FirstName:new FormControl(''),
      EmailForgotPassword:new FormControl(''),
      RegistrationNo:new FormControl(''),
      Status:new FormControl(''),
      Comments:new FormControl(''),
      ApprovalStatusId:new FormControl(''),
      ParentUserName:new FormControl(''),
      ParentAgencyName:new FormControl(''),
      Remarks: new FormControl(''),
      
      
    })

  constructor(service: EmployeesService,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    private indentRequestService : IndentRequestService,
    private router : Router,
    private UserStandardService:UserStandardService,
    private _toster: ToastrService,
    public SecUserService : SecUserService,) 
    {  
      this.Downloadfile = this.Downloadfile.bind(this);
      this.DownloadProfesional = this.DownloadProfesional.bind(this);
      this.DownloadCPD = this.DownloadCPD.bind(this);
      this.DownloadValidationReport=this.DownloadValidationReport.bind(this)
      this.openPopup=this.openPopup.bind(this); 
      this.openPopup1=this.openPopup1.bind(this);
    }

  ngOnInit(): void { 
     var formName = "UserReview"
     this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      this.secRoleForm = data.find(x => x.formName == formName)
    
      if(this.secRoleForm.authAllowed == true)
      {
        localStorage.removeItem('InsertAllow');
        localStorage.setItem('InsertAllow','1');
        this.isAddShown = false
        this.div1 = true;
      }
      else
      { this.div1 = false;
        localStorage.removeItem('InsertAllow');
        localStorage.setItem('InsertAllow','0');
      }
     
    
     
        
    })
  
    this.loadApprovalStatus();
   // this.editUser();
    //this.CardForm.get('Prefix').setValue("123");
   
  } 
  ngAfterViewInit() : void {
    this.editUser()
   
  }

  public statusList = [
   

    {id:"2",name:"Approved"  },
    {id:"3",name:"Reject"},
    
    
    
  ]

  displayStyle = "none";
  openPopup(e) {
    debugger
   this.UserstandardId = e.row.data.id;
    //standard = e.data.id
   //this.addetail=true
   //this.CardForm.ApprovelStatusId.controls.ProjectCode.setValue(e.row.data.projectCode);
       // this.ProjectLedgerForm.controls.ProjectCode.setValue(e.row.data.projectCode);
       // this.LedgerMasterId=e.row.data.id;
       this.displayStyle = "block";
       this.auditor=false;
       this.standard=true;
     }
     openPopup1(e){
      debugger
this.UserauditorNaceId = e.row.data.id;

       this.displayStyle = "block";
       this.auditor=true;
       this.standard=false;
     }
   
     closePopup() {
       this.displayStyle = "none";
     }

  id : number
  editUser()
  {
       
      var  ur ;
      ur=window.location.href.split("/")[7];
      var com=[]=ur.split("?")[1];
      if(com!=undefined && com!=null)
      {
      var PId=com.split("=")[0];
      this.id=PId;
    this.SecUserService.GetUserbyId(this.id).subscribe(data => {
        
      this.CardForm.controls.ApprovalStatusId.setValue(data.approvelStatusId);
      this.CardForm.controls.Comments.setValue(data.remarks);
      

          //this.isResetButtonShow=true;
          // this.isResetPassword=false;
          // this.confrmPass = this.UserMaker.ConfirmPassword
          // this.pass = this.UserMaker.password
 
 this.CardForm.get('Code').setValue(data.code);
 this.CardForm.get('FirstName').setValue(data.firstName);
 this.CardForm.get('FullName').setValue(data.fullName);
 this.CardForm.get('Email').setValue(data.email);
 this.CardForm.get('Address1').setValue(data.address1);
 this.CardForm.get('Address2').setValue(data.address2);
 this.CardForm.get('StateName').setValue(data.stateName);
 this.CardForm.get('CityName').setValue(data.cityName);
 this.CardForm.get('PostalCode').setValue(data.postalCode);
 this.CardForm.get('Mobile').setValue(data.mobile);
 this.CardForm.get('Telephone').setValue(data.telephone);
 this.CardForm.get('Role').setValue(data.roleName);
 this.CardForm.get('DateofBirth').setValue(data.dateOfBirth);
 this.CardForm.get('Prefix').setValue(data.prefixNmae);
 this.CardForm.get('RegistrationNo').setValue(data.registrationNo);
 this.CardForm.get('Department').setValue(data.departmentName);
 this.CardForm.get('Status').setValue(data.approvelStatus);
 this.CardForm.get('CountryName').setValue(data.countryName);

 if(data.parentAgencyId != null && data.parentAgencyId != undefined && data.parentAgencyId != NaN)
 {
  debugger
   this.CardForm.get('ParentAgencyName').setValue(data.parentAgencyName);

   this.CardForm.get('ParentUserName').setValue(data.parentUserName);
 }

 if(data.confidentialityPath!=null && data.confidentialityPath!=undefined && data.confidentialityPath!=NaN && data.confidentialityPath!="" && data.confidentialityPath!='')
{

  this.Confidentialitypath=true;
}
if(data.photoPath!=null && data.photoPath!=undefined && data.photoPath!=NaN && data.photoPath!="" && data.photoPath!='')
{

  this.PhotoPath=true;
}
if(data.contractPath!=null && data.contractPath!=undefined && data.contractPath!=NaN && data.contractPath!="" && data.contractPath!='')
{

  this.ContractPath=true;
}
 this.UserStandardList=data.userStandardModel;
this.DeclarationList=data.userDeclarationModel;
this.AcademicList=data.userAcademicModel;
this.CPDList=data.userCPDModel;
this.ProfessionalList=data.userProfessionalModel;
this.EmploymentList=data.userEmploymentModel;
this.ConsultancyList=data.userConsultancyModel;
this.AuditList=data.userAuditModel;
this.AuditorNaceList=data.userAuditorNaceModel;
      
      
    })
  //  this.onSearch(this.userUpdateId);
  } 
  var formName = "UserReview"
     this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      this.secRoleForm = data.find(x => x.formName == formName)
    
      if(this.secRoleForm.authAllowed == true)
      {
        this.isAddShown = false
        this.div1 = true;
      }
      else
      { this.div1 = false;

      }
     
    
     
        
    })
  }
  Downloadfile(e): void {
     
   if(e.row.data.documentFilePath!=null && e.row.data.documentFilePath!=undefined && e.row.data.documentFilePath!=NaN && e.row.data.documentFilePath!="" && e.row.data.documentFilePath!='')
   {
   this.id=e.row.data.id;
    
   // var fillename=e.row.data.title;
   var fillename="Document File";
    this.UserStandardService.downloadFile(this.id).subscribe((result:Blob)=>{

      
      const Blb =new Blob([result], { type: result.type });
      // const url=window.URL.createObjectURL(Blb);
      // window.open(url);
      // console.log("success");
    
      
      const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
      // a.download =fillename;  
       // const fileName =
        
        //="farooq";
        a.href = URL.createObjectURL(Blb);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
        
    })
    


  }
  
    else{this._toster.error("File Not Exsit", "Alert")}

  
   }

   DownloadProfesional(e): void {
     
    if(e.row.data.documentsFilePath!=null && e.row.data.documentsFilePath!=undefined && e.row.data.documentsFilePath!=NaN && e.row.data.documentsFilePath!="" && e.row.data.documentsFilePath!='')
    {
    this.id=e.row.data.id;
   // var fillename=e.row.data.title;
   var fillename="Document File";
    this.UserStandardService.downloadProfessionaldocuments(this.id).subscribe((result:Blob)=>{
      const Blb =new Blob([result], { type: result.type });
      // const url=window.URL.createObjectURL(Blb);
      // window.open(url);
      // console.log("success");
    
      
      const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
      // a.download =fillename;  
       // const fileName =
        
        //="farooq";
        a.href = URL.createObjectURL(Blb);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
        
    })
  }
  else{this._toster.error("File Not Exsit", "Alert")}
   }
   DownloadCPD(e): void {
     
    if(e.row.data.documentsFilePath!=null && e.row.data.documentsFilePath!=undefined && e.row.data.documentsFilePath!=NaN && e.row.data.documentsFilePath!="" && e.row.data.documentsFilePath!='')
    {
    this.id=e.row.data.id;
   // var fillename=e.row.data.title;
   var fillename="Document File";
    this.UserStandardService.downloadCPDdocuments(this.id).subscribe((result:Blob)=>{
      const Blb =new Blob([result], { type: result.type });
      // const url=window.URL.createObjectURL(Blb);
      // window.open(url);
      // console.log("success");
    
      
      const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
      // a.download =fillename;  
       // const fileName =
        
        //="farooq";
        a.href = URL.createObjectURL(Blb);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
        
    })
  } else{this._toster.error("File Not Exsit", "Alert")}
   }
  loadApprovalStatus(): void {
      
    this.UserStandardService.getAllApprovalStatus().subscribe((Response)=>{
      this.ApprovalList = Response
        
    })
  }


  onSubmit(): void {
    
   
   
    if (this.id != undefined || this.id != null) {
      this.SecUserModel.Id=this.id;
    }
    this.SecUserModel.ApprovelStatusId=this.CardForm.get('ApprovalStatusId').value
    this.SecUserModel.Remarks=this.CardForm.get('Comments').value
  
  
  var LoginUserId =localStorage.getItem('userId');
  this.SecUserModel.AuthorizedBy=parseInt(LoginUserId);
  //   const foData:FormData = new FormData();
  //  // const foData
  //   foData.append('StandardId',this.UserStandardForm.get('StandardId').value);
  //   if (this.id != undefined || this.id != null) {
  //     foData.append("Id",this.id.toString());
  //   }
  //   foData.append('AuditorTypeId',this.UserStandardForm.get('AuditorTypeId').value);
  //    foData.append('CourseTypeId',this.UserStandardForm.get('CourseTypeId').value);
  //    foData.append('CourseDate',this.UserStandardForm.get('CourseDate').value);
  //    foData.append('PreValidDate',this.UserStandardForm.get('PreValidDate').value);
  //    foData.append('ValidationDate',this.UserStandardForm.get('ValidationDate').value);
  //    foData.append('ApprovalStatusId',this.UserStandardForm.get('ApprovalStatusId').value);

    
  //    foData.append('ValidationDate',this.UserStandardForm.get('ValidationDate').value);
  //    foData.append('ApprovalStatusId',this.UserStandardForm.get('ApprovalStatusId').value);
  //    var LoginUserId =localStorage.getItem('userId');
  //    foData.append('CreatedBy',LoginUserId);
  //    foData.append('UserId', this.Userid.toString());

     
      this.SecUserService.Approval(this.SecUserModel).subscribe((Response)=>{
 
    this._toster.info(Response.message)
    //this.reloadGrid();
   
   })
}
DownloadConfidentially(): void {
   
  if(this.Confidentialitypath==true)
  {
  this.id=this.id;
  //this.CardForm.get('FirstName').value
 // var fillename=e.row.data.title;
 var fillename=this.CardForm.get('FirstName').value +" Confidentially" ;
  this.UserStandardService.DownloadConfidentially(this.id).subscribe((result:Blob)=>{
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
      
  })}
  else{this._toster.error("File Not Exsit", "Alert")}
 }
 DownloadContract(): void {
   
if(this.ContractPath==true){
  this.id=this.id;
 // var fillename=e.row.data.title;
 var fillename=this.CardForm.get('FirstName').value +" Contract" ;
  this.UserStandardService.DownloadContract(this.id).subscribe((result:Blob)=>{
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
else{this._toster.error("File Not Exsit", "Alert")}
  
 }
 DownloadImage(): void {
   
if(this.ContractPath==true){
  this.id=this.id;
 // var fillename=e.row.data.title;
 var fillename=this.CardForm.get('FirstName').value +" Photo";
  this.UserStandardService.DownloadImage(this.id).subscribe((result:Blob)=>{
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
else{this._toster.error("File Not Exsit", "Alert")}
  
 }

 DownloadValidationReport(e): void {
     
  
  this.id=e.row.data.id;
 // var fillename=e.row.data.title;
 var fillename="Document File";
  this.UserStandardService.downloadFileStandard(this.id).subscribe((result:Blob)=>{
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

 OnApprovalSubmit(): void {


  debugger
        var LoginUserId = localStorage.getItem('userId');
    
        if (this.CardForm.get('ApprovalStatusId').value > 0 && this.CardForm.get('Remarks').value != null && this.CardForm.get('Remarks').value != '' && this.CardForm.get('Remarks').value != undefined && this.CardForm.get('Remarks').value != "" && this.CardForm.get('Remarks').value != NaN)
         {
         
          const ClientSitesModel =
           
          {
            
          
  
    Id:this.UserstandardId,
    ApprovalStatusId: this.CardForm.get('ApprovalStatusId').value,
    Remarks:this.CardForm.get('Remarks').value,
  
  
  
            //Id: this.ProjectId,
            //ProjectId: this.ProjectId,
            //ApprovalStatusId: this.CardForm.get('ApprovalStatusId').value,
            //Remarks: this.CardForm.get('Remarks').value,
            
     
          };
    
    debugger
          this.UserStandardService.ApprovedUserStandard(ClientSitesModel).subscribe((Response) => {
    
            this._toster.info(Response.message)
            //this.reloadGrid();
            //this.router.navigateByUrl('/app/home');
          })
        }
       
      else{
        this._toster.error("Approval Status and Remarks can not be Empty", "Alert")
      }
      
      }

      OnApprovalAuditorSubmit(): void {


        debugger
              var LoginUserId = localStorage.getItem('userId');
          
              if (this.CardForm.get('ApprovalStatusId').value > 0 && this.CardForm.get('Remarks').value != null && this.CardForm.get('Remarks').value != '' && this.CardForm.get('Remarks').value != undefined && this.CardForm.get('Remarks').value != "" && this.CardForm.get('Remarks').value != NaN)
               {
               
                const ClientSitesModel =
                 
                {
                
        
          Id:this.UserauditorNaceId,
          ApprovalStatusId: this.CardForm.get('ApprovalStatusId').value,
          Remarks:this.CardForm.get('Remarks').value,
        
        
        
                  //Id: this.ProjectId,
                  //ProjectId: this.ProjectId,
                  //ApprovalStatusId: this.CardForm.get('ApprovalStatusId').value,
                  //Remarks: this.CardForm.get('Remarks').value,
                  
          
                };
          
          debugger
                this.UserStandardService.ApprovedUserAuditor(ClientSitesModel).subscribe((Response) => {
          
                  this._toster.info(Response.message)
                  //this.reloadGrid();
                 // this.router.navigateByUrl('/app/home');
                })
              }
             
            else{
              this._toster.error("Approval Status and Remarks can not be Empty", "Alert")
            }
            
            }
            
            btnforReview(e) {
debugger

    var Insert_Allow =localStorage.getItem('InsertAllow');
           debugger
  
              if (Insert_Allow =="1" && e.row.data.approvalStatusId!="3" && e.row.data.approvalStatusId!="10003")
               {
               return !e.row.isEditing;
             }
             
               else
               {
                 
                 return e.row.isEditing;
               }
             
             
             }      
             btnforReview2(e) {
              debugger
              
                  var Insert_Allow =localStorage.getItem('InsertAllow');
                         debugger
                
                            if (Insert_Allow =="1" && e.row.data.approvalStatusId!="3" && e.row.data.approvalStatusId!="10003")
                             {
                             return !e.row.isEditing;
                           }
                           
                             else
                             {
                               
                               return e.row.isEditing;
                             }
                           
                           
                           }     
}

