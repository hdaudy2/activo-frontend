import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { SecUserService } from "@shared/Services/sec-user.service";
import { TenantServicesService } from "@shared/Services/tenant-services.service";
import { TenantBuildingService } from "@shared/Services/tenant-building.service";

import { BuildingModel } from "@shared/interface/Building.interface";
import { FlatModel } from "@shared/interface/Flat.interface";
import { StatusModel } from "@shared/interface/Status.interface";
import { ServiceTypeModel } from "@shared/interface/ServiceType.interface";
import { PriorityModel } from "@shared/interface/Priority.interface";
import { ServiceRequestModel } from "@shared/interface/ServiceRequest.interface";
import {
  FilterOperator,
  ParamMethod,
  QueryParamModel,
  SortOperator,
} from "@shared/interface/QueryParam.interface";

import {
  RoleAuthorizerUtility,
  Roles,
} from "@shared/utility/role-authorizer.utility";

import { SecUserModel } from "@app/Models/user-interface";
import { FormControl, FormGroup } from "@angular/forms";

interface filterModel {
  CreatedByDate: string;
  PriorityId: string;
  StatusId: string;
}

@Component({
  selector: "app-service-request-list",
  templateUrl: "./service-request-list.component.html",
  styleUrls: ["./service-request-list.component.css"],
})
export class ServiceRequestListComponent
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
    PriorityId: new FormControl(""),
    StatusId: new FormControl(""),
    CreatedByDate: new FormControl(""),
  });

  public showEdit: boolean = true;

  public GridData = [];
  public GridDataRowCount = 0;

  private queryParamList: QueryParamModel[] = [];

  public ServiceRequestList: ServiceRequestModel[] = [];
  public BuildingList: BuildingModel[] = [];
  public FlatsList: FlatModel[] = [];
  public ServiceTypeList: ServiceTypeModel[] = [];
  public PriorityList: PriorityModel[] = [];
  public StatusList: StatusModel[] = [];

  public SecUserData: SecUserModel;
  private SecUserId: number;
  public SecUserRole: number;

  // Columns enable
  public ShowDescription: boolean = this.isAuthorize([
    Roles.MAINTAINER_OFFICER,
  ]);
  public ShowBuilding: boolean = this.isAuthorize([Roles.ADMIN]);
  public ShowFlat: boolean = this.isAuthorize([
    Roles.ADMIN,
    Roles.MAINTAINER_OFFICER,
  ]);

  constructor(
    private router: Router,
    public SecUserService: SecUserService,
    private _tenantService: TenantServicesService,
    private _tenantBuilding: TenantBuildingService,
  ) {
    super();
    this.onEditClick = this.onEditClick.bind(this);
  }

  async ngOnInit(): Promise<void> {
    // TODO 0: Load Data From LocalStorage
    this.loadUserDataFromLocalStorage();
    this.FilterForm.reset();

    // TODO 1: Load SecUser Data From DB
    await this.LoadUserData();

    // TODO 2: Load All Service Types
    await this.LoadServiceType();

    // TODO 3: Load All States
    await this.LoadStatus();

    // TODO 4: Load All States
    await this.LoadPriorities();

    // TODO 5: Load All Buildings
    await this.loadBuildings();

    // TODO 6: Load Flats Base on Building Id
    await this.loadFlats();

    // TODO 7: Load Service Request
    await this.loadQueryParamList();

    // TODO 8: Load Service Request
    await this.loadServiceRequests();

    // TODO 9: Load Grid Data
    await this.loadGridData();
  }

  loadUserDataFromLocalStorage(): void {
    this.SecUserId = +localStorage.getItem("userId");
    this.SecUserRole = +localStorage.getItem("roleId");
  }

  async LoadUserData(): Promise<void> {
    if (this.SecUserId == null) return; //! Exit If UserId is null

    // TODO: Load SecUser Data From DB
    this.SecUserData = await this._tenantService.GetUserByIdUsingPromise(
      this.SecUserId
    );
  }

  async LoadServiceType(): Promise<void> {
    //* Load All Service Types
    this.ServiceTypeList = await this._tenantService.GetAllServiceTypes();
  }

  async LoadStatus(): Promise<void> {
    //* Load All States
    this.StatusList = await this._tenantService.GetAllStatus();
  }

  async LoadPriorities(): Promise<void> {
    //* Load All Priorities
    this.PriorityList = await this._tenantService.GetAllPriorities();
  }

  async loadBuildings(): Promise<void> {
    //* Load Building
    if (this.isAuthorize([Roles.ADMIN]))
      this.BuildingList = await this._tenantBuilding.GetAllBuildings();
  }

  async loadFlats(): Promise<void> {
    if (this.isAuthorize([Roles.ADMIN]))
      this.FlatsList = await this._tenantBuilding.GetAllFlat();

    if (this.isNotAuthorize([Roles.ADMIN])) {
      const { buildingId } = this.SecUserData;

      if (!buildingId) return; //! Exit If buildingId is null

      //* Load Flats Base on Building Id
      this.FlatsList = await this._tenantBuilding.GetAllFlat([
        {
          QueryParam: "BuildingId",
          value: buildingId,
          method: ParamMethod.FILTER,
          filterOperator: FilterOperator.EQUAL,
        },
      ]);
    }
  }

  loadQueryParamList(): void {
    const temp: QueryParamModel[] = [];

    const { buildingId } = this.SecUserData;
    if (!buildingId) return; //! Exit If buildingId is null

    switch (this.SecUserRole) {
      case Roles.TENANT:
        temp.push({
          QueryParam: "CreatedById",
          value: this.SecUserId,
          method: ParamMethod.FILTER,
          filterOperator: FilterOperator.EQUAL,
        });
        break;
      case Roles.MAINTAINER_OFFICER:
        temp.push({
          QueryParam: "BuildingId",
          value: buildingId,
          method: ParamMethod.FILTER,
          filterOperator: FilterOperator.EQUAL,
        });
        break;
    }

    const filterOptions = this.FilterForm.value;

    for (const QueryParam in filterOptions) {
      if (Object.prototype.hasOwnProperty.call(filterOptions, QueryParam)) {
        const value = filterOptions[QueryParam];
        console.log(value);

        if (value)
          temp.push({
            QueryParam,
            value,
            method: ParamMethod.FILTER,
            filterOperator: FilterOperator.EQUAL,
          });
      }
    }

    temp.push({
      QueryParam: "createdDate",
      value: "",
      method: ParamMethod.SORT,
      sortOperator: SortOperator.DECS
    })

    this.queryParamList = temp;
  }

  async loadServiceRequests(): Promise<void> {
    this.ServiceRequestList = await this._tenantService.GetAllServiceRequest(
      this.queryParamList
    );
  }

  private loadGridData(): void {
    const data = [];

    this.ServiceRequestList.forEach((SR: ServiceRequestModel) => {
      const obj = {
        id: SR.id,
        title: SR.title,
        description: SR.description,
        flat: this.FlatsList.find((flat: FlatModel) => flat.id == SR.flatId)
          ?.name,
        serviceType: this.ServiceTypeList.find(
          (ST: ServiceTypeModel) => ST.id == SR.serviceTypeId
        )?.name,
        status: this.StatusList.find(
          (Status: StatusModel) => Status.id == SR.statusId
        )?.name,
        building: "",
      };

      if (this.isAuthorize([Roles.ADMIN]))
        obj.building = this.BuildingList.find(
          (building: BuildingModel) => building.id == SR.buildingId
        )?.name;

      data.push(obj);
    });

    this.GridData = data;
  }

  onEditClick(event): void {
    const Id: number = event.row.data.id;
    const URL = `/app/services/service-request-edit`;

    this.router.navigate([URL, Id]);
  }

  async OnFilterFormSubmit(): Promise<void> {
    // TODO 1: Load Service Request
    await this.loadQueryParamList();

    // TODO 2: Load Service Request
    await this.loadServiceRequests();

    // TODO 3: Load Grid Data
    await this.loadGridData();
  }

  async resetFilterFormSubmit(): Promise<void> {
    // TODO 1: Reset Form
    this.FilterForm.reset();

    // TODO 2: Load Service Request
    await this.loadQueryParamList();

    // TODO 3: Load Service Request
    await this.loadServiceRequests();

    // TODO 4: Load Grid Data
    await this.loadGridData();
  }
}
