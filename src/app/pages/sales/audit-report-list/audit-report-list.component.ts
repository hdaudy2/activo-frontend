import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import { IndentRequestService } from '@shared/Services/indent-request-service';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { ToastrService } from 'ngx-toastr';
import { StateModel } from '@shared/Dto/state-model';
import {StateService} from 'shared/Services/state-service';
import { SecUserService } from '@shared/Services/sec-user.service';
import { AuditReportService } from '@shared/Services/Audit-report-service';
import { ClientAuditVisitService } from '@shared/Services/Client-Audit-visit-service';

@Component({
  selector: 'app-audit-report-list',
  templateUrl: './audit-report-list.component.html',
  styleUrls: ['./audit-report-list.component.css']
})
export class AuditReportListComponent implements OnInit {

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
  public DocumentsList=[]
  public ReportMasterList=[]
  public DocumentsTypeList=[]
  public projyctcodelist=[]
  submitted = false;
  fileToUpload: any;
  Projectcode:string;
  StandardName:string;
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
    public SecUserService : SecUserService,
    private _toster: ToastrService,
    private route: ActivatedRoute,
     public AuditReportService: AuditReportService,
     private _ClientAuditVisitService: ClientAuditVisitService,
     private router : Router) 
      { 
    //     this.edit = this.edit.bind(this); 
    //   this.NewRecord=this.NewRecord.bind(this);
    //   this.delete=this.delete.bind(this);
    // this.Downloadfile=this.Downloadfile.bind(this)
  }

  ngOnInit(): void  {
    
    
    //this.loadSecRoleForm();
    // this.GetAllDocumentsType();
    // this.editUser();
    //this.onSearch();
    
  }
}
