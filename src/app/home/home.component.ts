//* Core Module
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

//* Animation Library
import { appModuleAnimation } from "@shared/animations/routerTransition";

//* Services
import { ClientService } from "@shared/Services/Client-Service";
import { SecUserService } from "@shared/Services/sec-user.service";

import { TenantServicesService } from "@shared/Services/tenant-services.service";
import { TenantBuildingService } from "@shared/Services/tenant-building.service";

import {
  RoleAuthorizerUtility,
  Roles,
} from "@shared/utility/role-authorizer.utility";

//* Models
import { PagedRequestModel } from "@shared/Dto/paged-Request-model";
import { StateCardTabModel } from "@app/UI/state-card-tab/tab.interface";

import { BuildingModel } from "@shared/interface/Building.interface";
import { FlatModel } from "@shared/interface/Flat.interface";
import { FloorModel } from "@shared/interface/Floor.interface";
import { StatusModel } from "@shared/interface/Status.interface";
import { ServiceTypeModel } from "@shared/interface/ServiceType.interface";
import { ServiceRequestModel } from "@shared/interface/ServiceRequest.interface";
import {
  FilterOperator,
  ParamMethod,
  QueryParamModel,
  SortOperator,
} from "@shared/interface/QueryParam.interface";

import { SecUserModel } from "@app/Models/user-interface";
import { ToastrService } from "ngx-toastr";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  animations: [appModuleAnimation()],
})
export class HomeComponent extends RoleAuthorizerUtility implements OnInit {
  public readonly allowedPageSizes = [5, 10, 15, "all"];
  public readonly displayModes = [
    { text: "Display Mode 'full'", value: "full" },
    { text: "Display Mode 'compact'", value: "compact" },
  ];
  public displayMode = "compact";
  public showPageSizeSelector = true;
  public showInfo = true;
  public showNavButtons = true;

  // User Data
  public SecUserData: SecUserModel;
  public SecUserName: string;
  public SecUserRole: number;
  public SecUserId: number;
  public OrganizationId: number;

  // Tenant Request Service
  public ServiceRequestList: ServiceRequestModel[];
  public BuildingList: BuildingModel[];
  public FloorList: FloorModel[];
  public FlatList: FlatModel[];
  public StatusList: StatusModel[];
  public ServiceTypeList: ServiceTypeModel[];

  public ServiceRequestCount: number = 0;
  public BuildingCount: number = 0;
  public FloorCount: number = 0;
  public FlatCount: number = 0;

  public pagedDto: PagedRequestModel = new PagedRequestModel();

  public serviceRequestCardData: StateCardTabModel[] = [];

  public HighPriorityGridData = [];
  public OpenStatusGridData = [];

  public ShowBuildingColumnsInGrid: boolean = this.isAuthorize([Roles.ADMIN]);
  public ShowFlatColumnsInGrid: boolean = this.isAuthorize([
    Roles.MAINTAINER_OFFICER,
  ]);

  constructor(
    private _SecUserService: SecUserService,
    public _ClientService: ClientService,
    private _tenantService: TenantServicesService,
    private _tenantBuilding: TenantBuildingService,
    private router: Router,
    private _toster : ToastrService 
  ) {
    super();
    this.onEditClick = this.onEditClick.bind(this);
  }

  async ngOnInit(): Promise<void> {
    this.checkPermission();
    this.loadUserDataFromLocalStorage();

    await this.LoadUserData();
    await this.loadBuildings();
    await this.loadFloors();
    await this.loadFlats();
    await this.loadServiceRequests();

    await this.loadStatus();
    await this.loadServiceType();

    this.ServiceRequestCount = this.ServiceRequestList?.length;
    this.BuildingCount = this.BuildingList?.length;
    this.FloorCount = this.FloorList?.length;
    this.FlatCount = this.FlatList?.length;

    this.pagedDto.organizationId = this.OrganizationId;

    // this.LoadHighPriorityGridData();
    // this.LoadOpenStatusGridData();

    const HighPriorityGridParams: QueryParamModel[] = [
      {
        QueryParam: "BuildingId",
        value: this.SecUserData.buildingId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
        auth: [Roles.MAINTAINER_OFFICER],
      },
      {
        QueryParam: "CreatedById",
        value: this.SecUserId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
        auth: [Roles.TENANT],
      },
      {
        QueryParam: "PriorityId",
        value: 1,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
      {
        QueryParam: "statusId",
        value: 4,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.NOTEQUAL,
      },
      {
        QueryParam: "CreatedDate",
        value: "",
        method: ParamMethod.SORT,
        sortOperator: SortOperator.DECS,
      },
      {
        method: ParamMethod.OFFSET,
        value: 1,
      },
      {
        method: ParamMethod.LIMIT,
        value: 20,
      },
    ];

    const OpenStatusGridParams: QueryParamModel[] = [
      {
        QueryParam: "BuildingId",
        value: this.SecUserData.buildingId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
        auth: [Roles.MAINTAINER_OFFICER],
      },
      {
        QueryParam: "CreatedById",
        value: this.SecUserId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
        auth: [Roles.TENANT],
      },
      {
        QueryParam: "StatusId",
        value: 1,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
      {
        QueryParam: "CreatedDate",
        value: "",
        method: ParamMethod.SORT,
        sortOperator: SortOperator.DECS,
      },
      {
        method: ParamMethod.OFFSET,
        value: 1,
      },
      {
        method: ParamMethod.LIMIT,
        value: 20,
      },
    ];

    this.HighPriorityGridData = await this.LoadGridData(HighPriorityGridParams);
    this.OpenStatusGridData = await this.LoadGridData(OpenStatusGridParams);
  }

  checkPermission(): void {
    var LoginUserId = localStorage.getItem("userId");
    this._SecUserService.CheckPermission(LoginUserId).subscribe((Response) => {
      if (Response.message == "1") {
        this._toster.success(
          "Your Password has been changed by another User!",
          "Please reset your password"
        );
      }
      if (Response.message == "3") {
        this._toster.warning("Please reset your password");
      }
    });
  }

  // Load Data Functions: START-----------------------------------

  loadUserDataFromLocalStorage(): void {
    this.SecUserName = localStorage.getItem("userName").split('"')[1];
    this.SecUserRole = +localStorage.getItem("roleId");
    this.SecUserId = +localStorage.getItem("userId");
    this.OrganizationId = +localStorage.getItem("organizationId");
  }

  async LoadUserData(): Promise<void> {
    if (this.SecUserId == null) return; //! Exit If UserId is null

    // TODO: Load SecUser Data From DB
    this.SecUserData = await this._tenantService.GetUserByIdUsingPromise(
      this.SecUserId
    );
  }

  async loadBuildings(): Promise<void> {
    // TODO: Load Building
    if (this.isAuthorize([Roles.ADMIN]))
      this.BuildingList = await this._tenantBuilding.GetAllBuildings();
  }

  async loadFloors(): Promise<void> {
    // TODO: Load Building
    if (this.isAuthorize([Roles.ADMIN]))
      this.FloorList = await this._tenantBuilding.GetAllFloor();
  }

  async loadFlats(): Promise<void> {
    const { buildingId } = this.SecUserData;

    // TODO: Load All Flats
    if (this.isAuthorize([Roles.ADMIN]))
      this.FlatList = await this._tenantBuilding.GetAllFlat();

    if (!buildingId) return; //! Exit If buildingId is null

    // TODO: Load Flats Base on Building Id
    if (this.isNotAuthorize([Roles.ADMIN]))
      this.FlatList = await this._tenantBuilding.GetAllFlat([
        {
          QueryParam: "BuildingId",
          value: buildingId,
          method: ParamMethod.FILTER,
          filterOperator: FilterOperator.EQUAL,
        },
      ]);
  }

  async loadStatus(): Promise<void> {
    // TODO: Load Status
    this.StatusList = await this._tenantService.GetAllStatus();
  }

  async loadServiceType(): Promise<void> {
    // TODO: Load Status
    this.ServiceTypeList = await this._tenantService.GetAllServiceTypes();
  }

  async loadServiceRequests(): Promise<void> {
    const { buildingId } = this.SecUserData;
    if (!buildingId) return; //! Exit If buildingId is null

    // TODO: Load Service Request Base on Building Id
    const queryParamList: QueryParamModel[] = [];

    switch (this.SecUserRole) {
      case Roles.TENANT:
        queryParamList.push({
          QueryParam: "CreatedById",
          value: this.SecUserId,
          method: ParamMethod.FILTER,
          filterOperator: FilterOperator.EQUAL,
        });
        break;
      case Roles.MAINTAINER_OFFICER:
        queryParamList.push({
          QueryParam: "BuildingId",
          value: buildingId,
          method: ParamMethod.FILTER,
          filterOperator: FilterOperator.EQUAL,
        });
        break;
    }

    this.ServiceRequestList = await this._tenantService.GetAllServiceRequest();
  }
  // Load Data Functions: END-----------------------------------
  // Load Data For Gird Cards: START-------------------------------
  async LoadGridData(queryParams: QueryParamModel[]): Promise<any> {
    const serviceRequestList = await this._tenantService.GetAllServiceRequest(
      queryParams
    );

    const data = [];

    serviceRequestList.forEach((SR: ServiceRequestModel) => {
      // SR Stands for Service Request
      const obj = {
        id: SR.id,
        title: SR.title,
        building: "",
        flat: "",
        issuedOn: new Date(SR.createdDate).toLocaleDateString(),
        serviceType: this.ServiceTypeList.find(
          (ST: ServiceTypeModel) => ST.id == SR.serviceTypeId
        )?.name,
        status: this.StatusList.find((ST: StatusModel) => ST.id == SR.statusId)
          ?.name,
      };

      if (this.isAuthorize([Roles.ADMIN]))
        obj.building = this.BuildingList.find(
          (building: BuildingModel) => building.id == SR.buildingId
        )?.name;

      if (this.isAuthorize([Roles.MAINTAINER_OFFICER]))
        obj.flat = this.FlatList.find(
          (flat: FlatModel) => flat.id == SR.flatId
        )?.name;

      data.push(obj);
    });

    return data;
  }
  // Load Data For Gird Cards: END---------------------------------
  // Load Data Functions: START---------------------------------
  async LoadHighPriorityGridData(): Promise<void> {
    const data = [];
    const paramObj: QueryParamModel[] = [];

    paramObj.push({
      QueryParam: "PriorityId",
      value: 1,
      method: ParamMethod.FILTER,
      filterOperator: FilterOperator.EQUAL,
    });

    if (this.isAuthorize([Roles.MAINTAINER_OFFICER]))
      paramObj.push({
        QueryParam: "BuildingId",
        value: this.SecUserData.buildingId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      });
    if (this.isAuthorize([Roles.TENANT]))
      paramObj.push({
        QueryParam: "CreatedById",
        value: this.SecUserId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      });

    const SRList = await this._tenantService.GetAllServiceRequest(paramObj);

    SRList.forEach((SR: ServiceRequestModel) => {
      // SR Stands for Service Request
      const obj = {
        id: SR.id,
        title: SR.title,
        building: "",
        flat: "",
        serviceType: this.ServiceTypeList.find(
          (ST: ServiceTypeModel) => ST.id == SR.serviceTypeId
        )?.name,
        status: this.StatusList.find((ST: StatusModel) => ST.id == SR.statusId)
          ?.name,
      };

      if (this.isAuthorize([Roles.ADMIN]))
        obj.building = this.BuildingList.find(
          (building: BuildingModel) => building.id == SR.buildingId
        )?.name;

      if (this.isAuthorize([Roles.MAINTAINER_OFFICER]))
        obj.flat = this.FlatList.find(
          (flat: FlatModel) => flat.id == SR.flatId
        )?.name;

      data.push(obj);
    });

    this.HighPriorityGridData = data;
  }
  async LoadOpenStatusGridData(): Promise<void> {
    const data = [];
    const paramObj: QueryParamModel[] = [];

    paramObj.push({
      QueryParam: "StatusId",
      value: 1,
      method: ParamMethod.FILTER,
      filterOperator: FilterOperator.EQUAL,
    });

    if (this.isAuthorize([Roles.MAINTAINER_OFFICER]))
      paramObj.push({
        QueryParam: "BuildingId",
        value: this.SecUserData.buildingId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      });
    if (this.isAuthorize([Roles.TENANT]))
      paramObj.push({
        QueryParam: "CreatedById",
        value: this.SecUserId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      });

    const SRList = await this._tenantService.GetAllServiceRequest(paramObj);

    SRList.forEach((SR: ServiceRequestModel) => {
      const obj = {
        id: SR.id,
        title: SR.title,
        building: "",
        flat: "",
        serviceType: this.ServiceTypeList.find(
          (ST: ServiceTypeModel) => ST.id == SR.serviceTypeId
        )?.name,
        status: this.StatusList.find((ST: StatusModel) => ST.id == SR.statusId)
          ?.name,
      };

      if (this.isAuthorize([Roles.ADMIN]))
        obj.building = this.BuildingList.find(
          (building: BuildingModel) => building.id == SR.buildingId
        )?.name;

      if (this.isAuthorize([Roles.MAINTAINER_OFFICER]))
        obj.flat = this.FlatList.find(
          (flat: FlatModel) => flat.id == SR.flatId
        )?.name;

      data.push(obj);
    });

    this.OpenStatusGridData = data;
  }
  // Load Data Functions: END-----------------------------------
  // Edit Button In Grid: START-----------------------------------
  onEditClick(event): void {
    const Id: number = event.row.data.id;
    const URL = `/app/services/service-request-edit`;

    this.router.navigate([URL, Id]);
  }
  // Edit Button In Grid: END-----------------------------------
}
