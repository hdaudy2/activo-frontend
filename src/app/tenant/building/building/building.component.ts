import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { CountryService } from "@shared/Services/country-service";
import { StateService } from "@shared/Services/state-service";
import { CityService } from "@shared/Services/City-Service";
import { TenantBuildingService } from "@shared/Services/tenant-building.service";

import { CountryModel } from "@shared/Dto/country-model";
import { StateModel } from "@shared/Dto/state-model";
import { CityModel } from "@shared/Dto/city-model";
import {
  FilterOperator,
  ParamMethod,
  QueryParamModel,
} from "@shared/interface/QueryParam.interface";
import { Router } from "@angular/router";
import { ClientModel } from "@shared/interface/Client.interface";
import { TenantClientService } from "@shared/Services/tenant-client.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-building",
  templateUrl: "./building.component.html",
  styleUrls: ["./building.component.css"],
})
export class BuildingComponent implements OnInit {
  public AddNewDataForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    cityId: new FormControl(""),
    stateId: new FormControl(""),
    countryId: new FormControl(""),
    clientId : new FormControl(""),
  });

  // DropDowns
  public CountryList: CountryModel[] = [];
  public ClientList: ClientModel[]=[];
  public StateList: StateModel[] = [];
  public CityList: CityModel[] = [];

  // UserData
  private SecUserId;

  constructor(
    private router: Router,
    public CountryService: CountryService,
    public clientService: TenantClientService,
    public StateService: StateService,
    public CityService: CityService,
    private _tenantBuilding: TenantBuildingService,
    private _toster : ToastrService 
  ) {
    this.SecUserId = +localStorage.getItem("userId");
  }

  async ngOnInit(): Promise<void> {
    this.AddNewDataForm.reset();

    this.loadCountry();
    this.loadClient();
    this.loadState();
    this.loadCity();
  }

  async loadCountry(queryParam?: QueryParamModel[]): Promise<void> {
    this.CountryList = await this.CountryService.GetAllCountries(queryParam);
  }
  async loadClient(queryParam?: QueryParamModel[]): Promise<void> {
    this.ClientList = await this.clientService.GetAllClient(queryParam);
  }
  async loadState(queryParam?: QueryParamModel[]): Promise<void> {
    this.StateList = await this.StateService.GetAllStates(queryParam);
  }

  async loadCity(queryParam?: QueryParamModel[]): Promise<void> {
    this.CityList = await this.CityService.GetAllCities(queryParam);
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

  onClientChange(value): void {
    const queryParam: QueryParamModel[] = [
      {
        QueryParam: "clientId",
        value,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
    ];
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
      //return abp.message.error("Error, Form Invalid");

    const byDefault = {
      createdById: this.SecUserId,
      createdDate: new Date().toJSON(),
      isActive: true,
      isDeleted: false,
    };

    const building = { ...this.AddNewDataForm.value, ...byDefault };

    await this._tenantBuilding.CreateBuilding(building);
    this._toster.info("Service Request Created");
    this.router.navigate([`/app/building`]);
  }
}
