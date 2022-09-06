
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { SecUserService } from '@shared/Services/sec-user.service';

import DataSource from 'devextreme/data/data_source';
import { BrowserModule } from '@angular/platform-browser';
import { DxContextMenuModule } from "devextreme-angular";
import { DxListModule } from "devextreme-angular";
import {  DxDataGridModule,DxDataGridComponent,DxSpeedDialActionModule,DxSelectBoxModule} from 'devextreme-angular';



import { FormControl, FormGroup } from '@angular/forms';

import { IndentRequestService } from '@shared/Services/indent-request-service'

import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {Observable} from 'rxjs';

import { ActivatedRoute} from '@angular/router';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';

import { DxTreeListModule } from "devextreme-angular";
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import { ClientService } from '@shared/Services/Client-Service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-task-board-list',
  templateUrl: './task-board-list.component.html',
  styleUrls: ['./task-board-list.component.css']
})
export class TaskBoardListComponent implements OnInit {
  constructor(
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    public SecUserService : SecUserService,
    public _ClientService :  ClientService,
    private _toster: ToastrService,
    private router : Router
  ) {  
    this.edit = this.edit.bind(this);  
    this.ManageRecord=this.ManageRecord.bind(this);
    this.delete=this.delete.bind(this);}
  @Output() tabIndexEmitter = new EventEmitter<object>();
  @Input() formName : string
  @Input() locationId: number

  public tabIndex: number = 1;
  secRoleForm
  isManageAllowed: boolean 
  public isAddShown : boolean 
  public isEditShown : boolean  
  public isViewShown : boolean  
  public keyword : string = ''
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public ClientList = [];
  public pagedDto: PagedRequestModel = new PagedRequestModel()


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



  public approval = [
    // {
    //   serial: "abc",
    //   code: "xyz",
    //   companyName:"asdf",
    //   name:"zxcv",
    //   email:"zxcv@asd.com",
    //   contact:"123456789",
    //   cityState:"asdf\nzxcvb",
    //   multiside:"Yes"
    // },    {
    //   serial: "abc",
    //   code: "xyz",
    //   companyName:"asdf",
    //   name:"zxcv",
    //   email:"zxcv@asd.com",
    //   contact:"123456789",
    //   cityState:"asdf\nzxcvb",
    //   multiside:"Yes"
    // },    {
    //   serial: "abc",
    //   code: "xyz",
    //   companyName:"asdf",
    //   name:"zxcv",
    //   email:"zxcv@asd.com",
    //   contact:"123456789",
    //   cityState:"asdf\nzxcvb",
    //   multiside:"Yes"
    // },    

    {serial:"01",  code:"141204",   companyName:"Artistic Apparels Pvt Ltd Unit 2	    					",    companyPerson : "Mr. Saqib Amin		",    contact:"	92 111 786 135		" ,    cityState:" Karachi	",		email:"saqib.amin@artisticapparels.com			"},
    {serial:"02",  code:"7229",	   companyName:"Artistic Fabric Mills (Pvt.) Ltd	    					",    companyPerson : "Mr Suhaib 			",    contact:"	92 21 35025217-20	" ,    cityState:" Karachi	",		email:"suhaib@artisticfabricmills.com			"},
    {serial:"03",  code:"133333",   companyName:"Ijaz Apparel (pvt) Ltd				    					",    companyPerson : "Shoukat Ali			",    contact:"						" ,    cityState:" Lahore	",		email:"shoukat@ijazapparel.com.pk			"},
    {serial:"04",  code:"133340",   companyName:"Mr Fabrics Pvt Ltd					    					",    companyPerson : "Arshad Jamal		", 	      contact:"	042 99232228		" ,    cityState:" Lahore	",		email:"								"},
    {serial:"05",  code:"17532",	   companyName:"Naveena Exports Ltd					    					",    companyPerson : "Moid Ul Hassan		",    contact:"	92 333 2103852		" ,    cityState:" Karachi	",		email:"Mgr.compliance@naveenagroup.com	"},
    {serial:"06",  code:"22238",	   companyName:"AFGI - 2							    					",    companyPerson : "Zeeshan Mazahir		",    contact:"	92 345 6434667		" ,    cityState:" Karachi	",		email:"sustainability@artisticgarment.com	"},
    {serial:"07",  code:"22330",	   companyName:"AFGI - 1							    					",    companyPerson : "Zeeshan Mazahir		",    contact:"	93 345 6434667		" ,    cityState:" Karachi	",		email:"sustainability@artisticgarment.com	"},
    {serial:"08",  code:"23074",	   companyName:"AFGI-11								    					",    companyPerson : "Zeeshan Mazahir		",    contact:"	94 345 6434667		" ,    cityState:" Karachi	",		email:"sustainability@artisticgarment.com	"},
    {serial:"09",  code:"124667",   companyName:"AFGI-12								    					",    companyPerson : "Zeeshan Mazahir		",    contact:"	95 345 6434667		" ,    cityState:" Karachi	",		email:"sustainability@artisticgarment.com	"},
    {serial:"10",  code:"42580",	   companyName:"AFGI-13								    					",    companyPerson : "Zeeshan Mazahir		",    contact:"	96 345 6434667		" ,    cityState:" Karachi	",		email:"sustainability@artisticgarment.com	"},
    {serial:"11",  code:"22331",	   companyName:"AFGI-6								    					",    companyPerson : "Zeeshan Mazahir		",    contact:"	97 345 6434667		" ,    cityState:" Karachi	",		email:"sustainability@artisticgarment.com	"},
    {serial:"12",  code:"22332",	   companyName:"AFGI-7								    					",    companyPerson : "Zeeshan Mazahir		",    contact:"	98 345 6434667		" ,    cityState:" Karachi	",		email:"sustainability@artisticgarment.com	"},
    {serial:"13",  code:"23071",	   companyName:"AFGI-8								    					",    companyPerson : "Zeeshan Mazahir		",    contact:"	99 345 6434667		" ,    cityState:" Karachi	",		email:"sustainability@artisticgarment.com	"},
    {serial:"14",  code:"23071",	   companyName:"AFGI-MALIR-1						    					",    companyPerson : "Zeeshan Mazahir		",    contact:"	100 345 6434667		" ,    cityState:" Karachi	",		email:"sustainability@artisticgarment.com		"},
    {serial:"15",  code:"22334",	   companyName:"AFGI-Malir-2						    					",    companyPerson : "Zeeshan Mazahir		",    contact:"	 345 6434667		" ,    cityState:" Karachi	",		email:"sustainability@artisticgarment.com		"},
   // {serial:"16",  code:"124127",   companyName:"Afroze Textile Industries (Pvt) Ltd. (Towel Unit)			",    name : "Muhammad Ayaz		", 	      contact:"	0333 3049296		" ,    cityState:" Karachi	",		email:"hr2@afroze.com,adeel@afroze.com		"},
    {serial:"17",  code:"129688",   companyName:"Ali Murtaza Associates Pvt. Ltd								",    companyPerson : "Major Abid Iftekhar ",      contact:"	42 3527407			" ,    cityState:" Lahore	",		email:"abid.iftikhar@alimurtaza.com			"},
    {serial:"18",  code:"141204",   companyName:"Artistic Apparels Pvt Ltd Unit 2							",    companyPerson : "Saqib Amin			",    contact:"	92 111 786 135		" ,    cityState:" Karachi	",		email:"saqib.amin@artisticapparels.com			"},
   // {serial:"19",  code:"7229",	   companyName:"Artistic Fabric & Garment Industires (Pvt) Ltd (AGI Denim)	",    name : "Zeeshan Mazahir		",    contact:"	92 345 6434667		" ,    cityState:" Karachi	",		email:"sustainability@artisticgarment.com		"},
    {serial:"20",  code:"7228",	   companyName:"Artistic Fabric Mills (Pvt.) Ltd							",    companyPerson : "Ameer Hussain Thebo	",    contact:"	021 35025221		" ,    cityState:" Karachi	",		email:"ameer.thebo@artisticfabricmills.com		"},
   // {serial:"21",  code:"139782",   companyName:"Artistic Milliners (PVT) Limited AM-10						",    name : "Khawaja Faheem	    ",    contact:"    92 300 3591003	" ,    cityState:" Karachi	",		email:"environment@artisticmilliners.com	"},
    {serial:"22",  code:"204",	   companyName:"Artistic Milliners - AM 2									",    companyPerson : "Khawaja Faheem	    ",    contact:"    93 300 3591003	" ,    cityState:" Karachi	",		email:"environment@artisticmilliners.com	"},
    {serial:"23",  code:"256",	   companyName:"Artistic Milliners - AM6									",    companyPerson : "Khawaja Faheem	    ",    contact:"    94 300 3591003	" ,    cityState:" Karachi	",		email:"environment@artisticmilliners.com	"},
    {serial:"24",  code:"142444",   companyName:"Bari Textile Mills Pvt Ltd 4								",    companyPerson : "Mr Osama Bari		",        contact:"	92 21 3257663-7		" ,    cityState:" Karachi	",	email:"Osama.bari@barimills.com.pk"},																													
     {serial:"25",  code:"135591",   companyName:"Chottani Industries											",    companyPerson :"Malik Farooq Awan		",    contact:"0333-2163793			" ,    cityState:"Karachi		",	email:"admin@chottani.com		"},
    {serial:"26",  code:"138084",   companyName:"Cosy International Pvt Ltd									",    companyPerson :"Muhammad Rizwan Irshad",     contact:"	041-8520456			" ,    cityState:"Faisalabad	",	email:"rizwan@cosyint.com										"},
   // {serial:"27",  code:"133876",   companyName:"Green Clothing Pvt LTD (Unit-II)	   						",    name :"Adnan Khan				",    contact:"0300 8458190			" ,    cityState:"Karachi",			email:"					"},
    //{serial:"28",  code:"135438",   companyName:'Gul Ahmed Textile Mills'+'\n'+'(GTM - 2 Processing Unit)			',    name :"Yasir Qayyum			",    contact:"314 5251752			" ,    cityState:"Karachi		",	email:"yasir.qayyum@gulahmed.com		"},
    //{serial:"30",  code:"149095",   companyName:"H Nizam Din and Sons Pvt Limited Main / Wash Unit			",    name :"Adnan Fareed			",    contact:"345 8204303			" ,    cityState:"Lahore		",	email:"hse@nizamapparel.com	"},
    {serial:"31",  code:"133333",   companyName:"Ijaz Apparel (pvt) Ltd										",    companyPerson :"Shoukat Ali				",    contact:"					" ,    cityState:"Lahore		",	email:"shoukat@ijazapparel.com.pk		"},
     {serial:"32",  code:"132793",   companyName:"KM Ashraf & Sons (Pvt.) Ltd.								",    companyPerson :"Muhammad Noman Awan		",    contact:"0300 6124661			" ,    cityState:"Sialkot		",	email:"hr@kmashraf.com.pk		"},
     {serial:"33",  code:"148537",   companyName:"S.M Traders													",    companyPerson:"						",    contact:"						" ,    cityState:"",				email:""},																			                           
     {serial:"34",  code:"129305",   companyName:"Shafi Texcel Limited										",    companyPerson :"Faisal Khalil 			",    contact:"042 35393612-14		" ,    cityState:"Lahore		",	email:"faisal.khalil@shafitexcel.com	"},
    {serial:"35",  code:"148455",   companyName:"Siddiqsons Limited (D-53)									",    companyPerson :"Sarmad Naeem			",    contact:"0344 2078687", 		    cityState:"Karachi		",	email:"sarmad@siddiqsonsgroup.com	"},
    {serial:"36",  code:"131865",   companyName:"UMAR GARMENTS												",    companyPerson :"Mubashir Meher			",    contact:"92 321 2441551		" ,    cityState:"Karachi		",	email:"mubashir@umar-garments.com"},
    
    
  ]
  // listDataSource = new DataSource({
  
  //   paginate: true,
  //   pageSize: 10
   
  // });

   dataSource: Employee[];
  // readonly allowedPageSizes = [5, 10, 'all'];
  // readonly displayModes = [{ text: "Display Mode 'full'", value: "full" }, { text: "Display Mode 'compact'", value: "compact" }];
  // displayMode = "full";
  // showPageSizeSelector = true;
  // showInfo = true;
  // showNavButtons = true;


 
  

  ngOnInit(): void {
    this.loadSecRoleForm()
    this.onSearch()
  }
  id: number
  edit(e) {  
     

    this.id=e.row.data.id;
// this.router.navigateByUrl('/app/pages/stock-management/library');
//this.id=e.row.data.id;
  // this.router.navigate(['app/pages/stock-management/library']);
    //this.router.navigate(["account/login"]);
this.router.navigateByUrl('/app/pages/sales/task-board?'+this.id);  
}  
 onTableDataChange(event) {
  
   this.pagedDto.page = event;
   this.onSearch();
 }
 reloadGrid()
 
 {

   this.pagedDto.page =1;
   this.onSearch();
 }
 loadSecRoleForm() {
     
   this.formName = "Clients"
   this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
       
     let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
       
     this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)
     if(this.secRoleForm.manageAllowed == true)
     { 
       this.isManageAllowed = true

     }
     else
     {
       this.isManageAllowed = false;
   
     }
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
onSearch(){
  
  var OrganId;
  var  ur ;
   ur=window.location.href.split("/")[7];
  var com=[]=ur.split("?")[1];
  if(com!=undefined && com!=null)
  {
    OrganId=com.split("=")[0];
  if(this.isManageAllowed==false)
  {
    this.isAddShown=false;
    this.isEditShown=false;
  }
  }
  else
  {
    OrganId=localStorage.getItem('organizationId');
  }
  
  this.pagedDto.keyword = this.keyword
  this.pagedDto.authAllowed = this.secRoleForm.authAllowed
 // this.pagedDto.pageSize = 3
  this._ClientService.Get(this.pagedDto).subscribe((Response) => 
  {
            
   
    this.totalCount = Response.totalCount
    this.ClientList = Response.clientModel
  })
}
ManageRecord(e)
{ this.id=e.row.data.id;
//   if(e.row.data.multisite==true)
//  // var userId=item;
//   //var urlink=e;
//   {
//     this.router.navigateByUrl('/app/pages/sales/all-projects?'+this.id)
//   }
  //else{
  this.router.navigateByUrl('/app/pages/sales/client-sites?'+this.id)
  //}
}
delete(e) {
  
    //  this._toster.confirm((""),
    //  undefined,
    //      (result: boolean) => {
    //          if (result) {
    //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //            //     this._toster.info("Deleted successfully", "Status", {});
 
    //                this._ClientService.Deleteuser(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onSearch();
                    
    //                 })
                   
    //          }
    //        }
    //   )
  
    this._ClientService.Deleteuser(e.row.data.id).subscribe((Response)=>{
  
      this._toster.info(Response.message)
      this.onSearch();
     
     })
  }
   

}