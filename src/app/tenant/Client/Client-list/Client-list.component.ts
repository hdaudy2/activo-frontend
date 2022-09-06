import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { CountryService } from "@shared/Services/country-service";
import { StateService } from "@shared/Services/state-service";
import { CityService } from "@shared/Services/City-Service";


import { TenantClientService } from "@shared/Services/tenant-client.service";

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

} from "@shared/utility/role-authorizer.utility";

import { ClientModel } from "@shared/interface/Client.interface";

interface filterModel {
  CreatedByDate: string;
  PriorityId: string;
  StatusId: string;
}

interface gridRowModel {
  id: number;
  code: string;
  name: string;
  country: string;
  state: string;
  city: string;
  floorNo: number;
  parkingNo: number;
  flatNo: number;
  slotNo: number;
  phoneNo: string;
  email: string;
  availableSlotNo: number;
}

@Component({
  selector: "app-Client-list",
  templateUrl: "./Client-list.component.html",
  styleUrls: ["./Client-list.component.css"],
})
export class ClientListComponent
  extends RoleAuthorizerUtility
  implements OnInit {
  public readonly allowedPageSizes = [5, 10, 30, 50, 100, "all"];
  public readonly displayModes = [
    { text: "Display Mode 'full'", value: "full" },
    { text: "Display Mode 'compact'", value: "compact" },
  ];
  public displayMode = "compact";
  public showPageSizeSelector = true;
  public showInfo = true;
  public showNavButtons = true;

  public FilterForm = new FormGroup({
    countryId: new FormControl(""),
    stateId: new FormControl(""),
    cityId: new FormControl(""),
  });

  public showEdit: boolean = true;

  public GridData = [];
  public GridDataRowCount = 0;

  private queryParamList: QueryParamModel[] = [];

  public CountryList: CountryModel[] = [];
  public StateList: StateModel[] = [];
  public CityList: CityModel[] = [];


  public ClientList: ClientModel[] = [];


  constructor(
    private router: Router,
    public CountryService: CountryService,
    public StateService: StateService,
    public CityService: CityService,
    private _tenantClient: TenantClientService
  ) {
    super();
    this.onEditClick = this.onEditClick.bind(this);
  }

  async ngOnInit(): Promise<void> {
    await this.loadCountry();
    await this.loadQueryParamList();
    await this.loadClient();
    await this.loadGridData();
  }

  async loadCountry(): Promise<void> {
    //* Load Building
    this.CountryList = await this.CountryService.GetAllCountries();
  }

  async loadState(queryParam?: QueryParamModel[]): Promise<void> {
    this.StateList = await this.StateService.GetAllStates(queryParam);
  }

  async loadCity(queryParam?: QueryParamModel[]): Promise<void> {
    this.CityList = await this.CityService.GetAllCities(queryParam);
  }

  loadQueryParamList(): void {
    const temp: QueryParamModel[] = [];

    const filterOptions = this.FilterForm.value;
    debugger;
    for (const QueryParam in filterOptions) {
      if (Object.prototype.hasOwnProperty.call(filterOptions, QueryParam)) {
        const value = filterOptions[QueryParam];

        if (value && value != "null")
          temp.push({
            QueryParam,
            value,
            method: ParamMethod.FILTER,
            filterOperator: FilterOperator.EQUAL,
          });
      }
    }
    this.queryParamList = temp;
  }

  async loadClient(): Promise<void> {
    //* Load Building
    this.ClientList = await this._tenantClient.GetAllClient(
      this.queryParamList
    );
  }

  private loadGridData(): void {
    const data = [];

    this.ClientList.forEach((client) => {

      const name = client.name;
      const country = client.countryName;
      const state = client.stateName;
      const city = client.cityName;
      const code = client.code;
      const phoneNo = client.phoneNumber;
      const email = client.email;




      data.push({
        id: client.id,
        code,
        name,
        country,
        state,
        city,
        phoneNo,
        email,
      } as gridRowModel);
    });

    this.GridData = data;
  }

  onEditClick(event): void {
    const Id: number = event.row.data.id;
    const URL = `/app/clients/edit`;

    console.log(URL, Id);

    this.router.navigate([URL, Id]);
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

  async OnFilterFormSubmit(): Promise<void> {
    // TODO 1: Load Service Request
    await this.loadQueryParamList();
    // TODO 2: Load Building
    await this.loadClient();
    // TODO 3: Load Grid Data
    await this.loadGridData();
  }

  async resetFilterFormSubmit(): Promise<void> {
    // TODO 1: Reset Form
    this.FilterForm.reset();
    // TODO 2: Load Service Request
    await this.loadQueryParamList();
    // TODO 3: Load Service Request
    await this.loadClient();
    // TODO 4: Load Grid Data
    await this.loadGridData();
  }
}
