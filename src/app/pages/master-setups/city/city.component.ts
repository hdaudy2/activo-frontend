import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import { CityService } from 'shared/Services/City-Service';
import { SecUserService } from '@shared/Services/sec-user.service';
import { CityModel } from '@shared/Dto/city-model';
import { IndentRequestService } from '@shared/Services/indent-request-service';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  public item: CityModel = new CityModel();
  CityForm = new FormGroup({
    // Id: new FormControl(''),
    Id: new FormControl(''),
    Name: new FormControl(''),
    CountryId: new FormControl(''),
    StateId: new FormControl(''),
    IsActive: new FormControl(''),
    Code: new FormControl(''),

  })
  submitted = false;

  get f() { return this.CityForm.controls; }
  employees: Employee[] = [];
  @Input() formName: string
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  pageNumber: number = 1
  pageSize: number = 10
  public isEditShown: boolean
  public isViewShown: boolean
  public isAddShown: boolean
  public keyword: string = ''
  public StateList = []
  public CountryList = []
  public CityList = []
  public moduleList = [];
  public StatusList = [];
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
    private indentRequestService: IndentRequestService,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    public SecUserService: SecUserService,
    private _toster: ToastrService,
    private route: ActivatedRoute,
    public CityService: CityService,
    private router: Router) {
    this.edit = this.edit.bind(this);
    this.NewRecord = this.NewRecord.bind(this);
    this.delete = this.delete.bind(this);
  }

  ngOnInit(): void {
    

    this.loadSecRoleForm();
    this.loadStatus();
    this.onSearch();
    this.loadCountries()
    //this.loadState()
  }

  loadCountries(): void {
    

    this.SecUserService.getCountries().subscribe((Response) => {
      this.CountryList = Response
      let countryId=0;
      this.loadState(countryId);
    })
  }

  loadState(countryId): void {
    this.SecUserService.getStateByCountryId(countryId).subscribe((Response) => {
      this.StateList = Response
    })
  }




  id: number

  edit(e) {
    
    this.id = e.row.data.id
    
    this.CityForm.controls.Id.setValue(e.row.data.id);
    this.CityForm.controls.Name.setValue(e.row.data.name);
    this.CityForm.controls.Code.setValue(e.row.data.code);
    this.CityForm.controls.CountryId.setValue(e.row.data.countryId);
    this.loadState(e.row.data.countryId);
    this.CityForm.controls.StateId.setValue(e.row.data.stateId);

    if (e.row.data.isActive == true) {
      this.CityForm.controls.IsActive.setValue(1);
    } else { this.CityForm.controls.IsActive.setValue(0); }
  }

  delete(e) {
    
    // this._toster.confirm((""),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {
    //       this.CityService.Delete(e.row.data.id).subscribe((Response) => {

    //         this._toster.info(Response.message)
    //         this.onSearch();

    //       })

    //     }
    //   }
    // )
    this.CityService.Delete(e.row.data.id).subscribe((Response) => {

      this._toster.info(Response.message)
      this.onSearch();

    })
  }

  onTableDataChange(event) {
    this.pagedDto.page = event;
    this.onSearch();
  }
  loadSecRoleForm() {

    

    this.formName = "City"
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
    

    this.item = new CityModel();
    this.submitted = true;
    if (this.CityForm.invalid) {
      this._toster.error("Some fields are required ");
      return;
    }
    if (this.id > 0 && this.id != null && this.id != undefined && this.id != NaN) {
      this.item.Id = this.id
    }
    this.item.Name = this.CityForm.get('Name').value
    this.item.Code = this.CityForm.get('Code').value
    this.item.CountryId = this.CityForm.get('CountryId').value
    this.item.StateId = this.CityForm.get('StateId').value
    if (this.CityForm.get('IsActive').value == 1) {
      this.item.IsActive = true;
    }
    else {
      this.item.IsActive = false;
    }
    this.CityService.create(this.item).subscribe((Response) => {
      this._toster.info(Response.message)
      this.reloadGrid();
      this.NewRecord();
    })
  }

  onSearch() {
    

    this.pagedDto.keyword = this.keyword
    this.pagedDto.authAllowed = this.secRoleForm.authAllowed
    this.CityService.Get(this.pagedDto).subscribe((Response) => {

      
      this.totalCount = Response.totalCount
      this.CityList = Response.cityModel
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
    this.id = 0;
    this.CityForm.controls.Name.setValue('');
    this.CityForm.controls.Code.setValue('');
    this.CityForm.controls.CountryId.setValue('');
    this.CityForm.controls.StateId.setValue('');
    this.CityForm.controls.IsActive.setValue('');
  }


}
