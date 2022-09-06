import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {  BsModalRef } from "ngx-bootstrap/modal";
import { CountryService } from "@shared/Services/country-service";
import { StateService } from "@shared/Services/state-service";
import { CityService } from "@shared/Services/City-Service";
import { CountryModel } from "@shared/Dto/country-model";
import { StateModel } from "@shared/Dto/state-model";
import { CityModel } from "@shared/Dto/city-model";
import {
  FilterOperator,
  ParamMethod,
  QueryParamModel,
} from "@shared/interface/QueryParam.interface";

import {
  RoleAuthorizerUtility,
  Roles,
} from "@shared/utility/role-authorizer.utility";
import { ClientModel } from "@shared/interface/Client.interface";
import { TenantUserManagementService } from "@shared/Services/tenant-user-management.service";
import { SecUserModel } from "@shared/interface/UserManagement.interface";
import { TenantBuildingService } from "@shared/Services/tenant-building.service";
import { BuildingModel } from "@shared/interface/Building.interface";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: "app-User-Management",
  templateUrl: "./User-Management-edit.component.html",
  styleUrls: ["./User-Management-edit.component.css"],
})
export class UserManagementEditComponent
  extends RoleAuthorizerUtility
  implements OnInit {
  public AddUserManagementDataForm = new FormGroup({
    userName: new FormControl(""),
    fullName: new FormControl(""),
    lastName: new FormControl(""),
    cityId: new FormControl(""),
    stateId: new FormControl(""),
    buildingId: new FormControl(""),
    countryId: new FormControl(""),
    telephone: new FormControl(""),
    mobile : new FormControl(""),
    email: new FormControl(""),
    website: new FormControl(""),
    buildingName: new FormControl(""),
    countryName: new FormControl(""),
    creationTime: new FormControl(""),
    creatorUserId: new FormControl(""),
    date: new FormControl(""),
    deleterUserId: new FormControl(""),
    deletionTime: new FormControl(""),
    description: new FormControl(""),
    isActive: new FormControl(""),
    isDeleted: new FormControl(""),
    isProjectExist: new FormControl(""),
    lastModificationTime: new FormControl(""),
    lastModifierUserId: new FormControl(""),
  });

  
  KeyPress(event) {
    let value: string = (event.target as HTMLInputElement).value;
    if (value.length == 3) (event.target as HTMLInputElement).value += "-";
    if (value.length == 7) (event.target as HTMLInputElement).value += "-";
  }
  public modalRef?: BsModalRef;
  public BuildingId: number;
  public userId:number;


  public ShowSaveButton: boolean = this.isAuthorize([Roles.ADMIN]);
  public DisableFields: boolean = this.isNotAuthorize([Roles.ADMIN]);

  // Objects
  public User: SecUserModel;
  public BuildingList: BuildingModel[];
  public CountryList: CountryModel[];
  public StateList: StateModel[];
  public CityList: CityModel[];


  // UserData
  private QueryParam: QueryParamModel[];

  constructor(
    private route: ActivatedRoute,
    private buildingService : TenantBuildingService,
    private CountryService: CountryService,
    private StateService: StateService,
    private CityService: CityService,
    private _tenantUserManagement: TenantUserManagementService,
    private _toster : ToastrService 
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.userId = +params["id"];
    });

    if (this.DisableFields) this.AddUserManagementDataForm.disable();

    this.QueryParam = [
      {
        QueryParam: "buildingId",
        value: this.BuildingId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
    ];

    await this.loadUserManagement();
    await this.loadCountry();
    await this.loadState();
    await this.loadCity();
    await this.loadBuilding();
    this.FillFields();
  }

  

  async loadUserManagement(): Promise<void> {
    this.User = await this._tenantUserManagement.GetUserId(this.userId);
  }
  async loadCountry(queryParam?: QueryParamModel[]): Promise<void> {
    this.CountryList = await this.CountryService.GetAllCountries(queryParam);
  }
  async loadBuilding(queryParam?: QueryParamModel[]): Promise<void> {
    this.BuildingList = await this.buildingService.GetAllBuildings(queryParam);
  }

  async loadState(queryParam?: QueryParamModel[]): Promise<void> {
    this.StateList = await this.StateService.GetAllStates(queryParam);
  }

  async loadCity(queryParam?: QueryParamModel[]): Promise<void> {
    this.CityList = await this.CityService.GetAllCities(queryParam);
  }

 

 

  private FillFields(): void {
    // update form fields;
    var temp = this.AddUserManagementDataForm
    debugger;
    this.AddUserManagementDataForm.patchValue(this.User);
  }

  onCountryChange(value): void {
    const queryParam: QueryParamModel[] = [
      {
        QueryParam: "countryId",
        value,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
    ];

    this.loadState(queryParam);
  }

  onBuildingChange(value): void {
    const queryParam: QueryParamModel[] = [
      {
        QueryParam: "buildingId",
        value,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
    ];

    this.loadState(queryParam);
  }

  onStateChange(value): void {
    console.log(value);
    const queryParam: QueryParamModel[] = [
      {
        QueryParam: "stateId",
        value,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
    ];

    this.loadCity(queryParam);
  }

  async onAddUserManagementFormSubmit(): Promise<void> {
    if (this.AddUserManagementDataForm.invalid)
    return null;
    //return this._toster.error('Error, Form Invalid');
      

    const UpdateClient = { ...this.AddUserManagementDataForm.value };

    await this._tenantUserManagement.UpdateUserManagement(this.userId, UpdateClient);
    this._toster.info("User Updated");
  }

 

}
