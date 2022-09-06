import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
import { Router } from "@angular/router";
import { TenantClientService } from "@shared/Services/tenant-client.service";
import { BuildingModel } from "@shared/interface/Building.interface";
import { TenantBuildingService } from "@shared/Services/tenant-building.service";
import { SecUserService } from "@shared/Services/sec-user.service";
import { TenantUserManagementService } from "@shared/Services/tenant-user-management.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-User-Management",
  templateUrl: "./User-Management.component.html",
  styleUrls: ["./User-Management.component.css"],
})
export class UserManagementComponent implements OnInit {
  public AddNewDataForm = new FormGroup({
    userName: new FormControl(""),
    fullName: new FormControl(""),
    lastName: new FormControl(""),
    cityId: new FormControl(""),
    stateId: new FormControl(""),
    buildingId: new FormControl(""),
    countryId: new FormControl(""),
    telephone: new FormControl(""),
    mobile: new FormControl(""),
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

  // DropDowns
  public CountryList: CountryModel[] = [];
  public StateList: StateModel[] = [];
  public CityList: CityModel[] = [];
  public BuildingList: BuildingModel[];
  // UserData
  private SecUserId;

  constructor(
    private router: Router,
    public CountryService: CountryService,
    public StateService: StateService,
    public CityService: CityService,
    private _tenantUser: TenantUserManagementService,
    private buildingService: TenantBuildingService,
    private _toster : ToastrService 
  ) {
    this.SecUserId = +localStorage.getItem("userId");
  }

  async ngOnInit(): Promise<void> {
    this.AddNewDataForm.reset();

    this.loadCountry();
    this.loadState();
    this.loadCity();
    await this.loadBuilding();
  }
  async loadBuilding(queryParam?: QueryParamModel[]): Promise<void> {
    this.BuildingList = await this.buildingService.GetAllBuildings(queryParam);
  }

  async loadCountry(queryParam?: QueryParamModel[]): Promise<void> {
    this.CountryList = await this.CountryService.GetAllCountries(queryParam);
  }

  async loadState(queryParam?: QueryParamModel[]): Promise<void> {
    this.StateList = await this.StateService.GetAllStates(queryParam);
  }

  async loadCity(queryParam?: QueryParamModel[]): Promise<void> {
    this.CityList = await this.CityService.GetAllCities(queryParam);
  }
  KeyPress(event) {
    let value: string = (event.target as HTMLInputElement).value;
    if (value.length == 3) (event.target as HTMLInputElement).value += "-";
    if (value.length == 7) (event.target as HTMLInputElement).value += "-";
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

  public async OnServiceRequestFormSubmit(): Promise<void> {
    if (this.AddNewDataForm.invalid)
    return null;
    //return this._toster.error("Error, Form Invalid");

    const byDefault = {
      code: "",
      name: "",
      description: "",
      phoneNumber: "",
      mobileNumber: "",
      website: "",
      email: "",
      organizationId: 0,
      contactPerson: "",
      personContactNumber: "",
      address1: "",
      address2: "",
      countryId: 0,
      countryName: "",
      stateId: 0,
      stateName: "",
      clientId: 0,
      clientName: "",
      cityId: 0,
      cityName: "",
      postalCode: "",
      prefixId: 0,
      position: "",
      isActive: true,
      multisite: true,
      creationTime: null,
      creatorUserId: 0,
      lastModificationTime: null,
      lastModifierUserId: 0,
      isDeleted: 0,
      deleterUserId: 0,
      deletionTime: null,
      date: null,
      isProjectExist: true,
      siteName: "",
      siteAddress: "",
      siteCity: "",
      siteCountry: "",
      siteCount: 0,
      overAllEmployees: 0,
      organizationName: "",
      organizationCode: "",
    };

    const user = { ...byDefault, ...this.AddNewDataForm.value };
    debugger;
    await this._tenantUser.CreateUser(user);
    this._toster.info("User Inserted!");
    this.router.navigate([`/app/userManagement`]);
  }
}
