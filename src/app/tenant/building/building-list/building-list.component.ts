import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { CountryService } from "@shared/Services/country-service";
import { StateService } from "@shared/Services/state-service";
import { CityService } from "@shared/Services/City-Service";

import { TenantBuildingService } from "@shared/Services/tenant-building.service";

import { BuildingModel } from "@shared/interface/Building.interface";
import { FlatModel } from "@shared/interface/Flat.interface";
import { FloorModel } from "@shared/interface/Floor.interface";
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
import { ParkingSlotModel } from "@shared/interface/ParkingSlot.interface";
import { FloorType } from "@shared/interface/FloorType.interface";

interface filterModel {
  CreatedByDate: string;
  PriorityId: string;
  StatusId: string;
}

interface gridRowModel {
  id: number;
  name: string;
  country: string;
  state: string;
  city: string;
  floorNo: number;
  parkingNo: number;
  flatNo: number;
  slotNo: number;
  availableSlotNo: number;
}

@Component({
  selector: "app-building-list",
  templateUrl: "./building-list.component.html",
  styleUrls: ["./building-list.component.css"],
})
export class BuildingListComponent
  extends RoleAuthorizerUtility
  implements OnInit
{
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

  public BuildingList: BuildingModel[] = [];
  public FloorList: FloorModel[] = [];
  public FlatsList: FlatModel[] = [];
  public ParkingSlotList: ParkingSlotModel[] = [];

  constructor(
    private router: Router,
    public CountryService: CountryService,
    public StateService: StateService,
    public CityService: CityService,
    private _tenantBuilding: TenantBuildingService
  ) {
    super();
    this.onEditClick = this.onEditClick.bind(this);
  }

  async ngOnInit(): Promise<void> {
    await this.loadCountry();
    await this.loadState();
    await this.loadCity();
    await this.loadQueryParamList();
    await this.loadFloors();
    await this.loadFlats();
    await this.loadSlots();
    await this.loadBuildings();
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

  async loadFlats(): Promise<void> {
    this.FlatsList = await this._tenantBuilding.GetAllFlat();
  }

  async loadFloors(): Promise<void> {
    this.FloorList = await this._tenantBuilding.GetAllFloor();
  }

  async loadSlots(): Promise<void> {
    this.ParkingSlotList = await this._tenantBuilding.GetAllParkingSlot();
  }

  loadQueryParamList(): void {
    const temp: QueryParamModel[] = [];

    const filterOptions = this.FilterForm.value;

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

  async loadBuildings(): Promise<void> {
    //* Load Building
    this.BuildingList = await this._tenantBuilding.GetAllBuildings(
      this.queryParamList
    );
  }

  private loadGridData(): void {
    const data = [];

    this.BuildingList.forEach((building) => {
      const name = building.name;
      const country = building.countryName;
      const state = building.stateName;
      const city = building.cityName;

      const floorNo = this.FloorList.filter((fno) => {
        const buildingId = building.id;
        const floorBuildingId = fno.buildingId;
        return (
          floorBuildingId == buildingId &&
          fno.floorTypeId == FloorType.RESIDENCE
        );
      })?.length;

      const parkingNo = this.FloorList.filter((fno) => {
        const buildingId = building.id;
        const floorBuildingId = fno.buildingId;
        return (
          floorBuildingId == buildingId && fno.floorTypeId == FloorType.PARKING
        );
      })?.length;

      const flatNo = this.FloorList.filter((fno) => {
        const flatBuildingId = fno.buildingId;
        const buildingId = building.id;
        return flatBuildingId == buildingId;
      })?.length;

      const slotNo = this.ParkingSlotList.filter((pno) => {
        const flatBuildingId = pno.buildingId;
        const buildingId = building.id;
        return flatBuildingId == buildingId;
      })?.length;

      const availableSlotNo = this.ParkingSlotList.filter((pno) => {
        const flatBuildingId = pno.buildingId;
        const buildingId = building.id;
        return flatBuildingId == buildingId && pno.isAllotted == false;
      })?.length;

      data.push({
        id: building.id,
        name,
        country,
        state,
        city,
        floorNo: floorNo ?? 0,
        parkingNo: parkingNo ?? 0,
        flatNo: flatNo ?? 0,
        slotNo: slotNo ?? 0,
        availableSlotNo: availableSlotNo ?? 0,
      } as gridRowModel);
    });

    this.GridData = data;
  }

  onEditClick(event): void {
    const Id: number = event.row.data.id;
    const URL = `/app/buildings/edit`;

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
    await this.loadBuildings();
    // TODO 3: Load Grid Data
    await this.loadGridData();
  }

  async resetFilterFormSubmit(): Promise<void> {
    // TODO 1: Reset Form
    this.FilterForm.reset();
    // TODO 2: Load Service Request
    await this.loadQueryParamList();
    // TODO 3: Load Service Request
    await this.loadBuildings();
    // TODO 4: Load Grid Data
    await this.loadGridData();
  }
}
