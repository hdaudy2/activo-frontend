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
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-Client",
  templateUrl: "./Client.component.html",
  styleUrls: ["./Client.component.css"],
})
export class ClientComponent implements OnInit {
  public AddNewDataForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    code: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    contactPerson: new FormControl(""),
    mobileNumber: new FormControl(""),
    email: new FormControl(""),
    website: new FormControl(""),
    address1: new FormControl(""),
    cityId: new FormControl(""),
    stateId: new FormControl(""),
    countryId: new FormControl(""),
    address2: new FormControl(""),
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
    multisite: new FormControl(""),
    organizationCode: new FormControl(""),
    organizationId: new FormControl(""),
    organizationName: new FormControl(""),
    overAllEmployees: new FormControl(""),
    personContactNumber: new FormControl(""),
    position: new FormControl(""),
    postalCode: new FormControl(""),
    prefixId: new FormControl(""),
    siteAddress: new FormControl(""),
    siteCity: new FormControl(""),
    siteCount: new FormControl(""),
    siteCountry: new FormControl(""),
    siteName: new FormControl(""),
    stateName: new FormControl(""),
  });

  // DropDowns
  public CountryList: CountryModel[] = [];
  public StateList: StateModel[] = [];
  public CityList: CityModel[] = [];

  // UserData
  private SecUserId;

  constructor(
    private router: Router,
    public CountryService: CountryService,
    public StateService: StateService,
    public CityService: CityService,
    private _tenantClient: TenantClientService,
    private _toster : ToastrService 
  ) {
    this.SecUserId = +localStorage.getItem("userId");
  }

  async ngOnInit(): Promise<void> {
    this.AddNewDataForm.reset();

    this.loadCountry();
    this.loadState();
    this.loadCity();
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
      description: null,
      phoneNumber: "",
      mobileNumber: "",
      website: "",
      email: "",
      organizationId: null,
      contactPerson: "",
      personContactNumber: null,
      address1: "",
      address2: "",
      countryId: null,
      stateId: null,
      cityId: null,
      postalCode: "",
      prefixId: null,
      position: "",
      isActive: true,
      multisite: false,
      creationTime: new Date().toJSON(),
      creatorUserId: this.SecUserId,
      lastModificationTime: null,
      lastModifierUserId: null,
      isDeleted: false,
      deleterUserId: null,
      deletionTime: null,
      date: "",
      isProjectExist: null,
      siteName: null,
      siteAddress: null,
      siteCity: null,
      siteCountry: null,
      siteCount: null,
      overAllEmployees: null,
      organizationName: null,
      organizationCode: null,
    };

    const client = { ...byDefault, ...this.AddNewDataForm.value };
    debugger;
    await this._tenantClient.CreateClient(client);
    this._toster.success("Client Inserted!");
    this.router.navigate([`/app/client`]);
  }
}
