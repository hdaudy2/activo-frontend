import { Component, Input, OnInit } from "@angular/core";
import { SecUserModel } from "@app/Models/user-interface";

import { BuildingModel } from "@shared/interface/Building.interface";
import { FlatModel } from "@shared/interface/Flat.interface";
import { FloorModel } from "@shared/interface/Floor.interface";
import { StatusModel } from "@shared/interface/Status.interface";
import { ServiceRequestModel } from "@shared/interface/ServiceRequest.interface";
import {
  FilterOperator,
  ParamMethod,
  QueryParamModel,
} from "@shared/interface/QueryParam.interface";

import { TenantServicesService } from "@shared/Services/tenant-services.service";
import { TenantBuildingService } from "@shared/Services/tenant-building.service";

import {
  RoleAuthorizerUtility,
  Roles,
} from "@shared/utility/role-authorizer.utility";

import { StateCardTabModel } from "../state-card-tab/tab.interface";

@Component({
  selector: "UI-widget-panel",
  template: `
    <div class="row col-md-12">
      <div class="col-sm-2" *ngIf="ShowBuildingNameWidget">
        <state-card-mini
          label="Building"
          [name]="BuildingObject?.name"
          link="#"
        >
        </state-card-mini>
      </div>
      <div class="col-sm-2" *ngIf="ShowBuildingStateWidget">
        <state-card-mini label="Buildings" [state]="BuildingCount" link="#">
        </state-card-mini>
      </div>
      <div class="col-sm-2" *ngIf="ShowFloorStateWidget">
        <state-card-mini label="Floors" [state]="FloorCount" link="#">
        </state-card-mini>
      </div>
      <div class="col-sm-2" *ngIf="ShowFlatNameWidget">
        <state-card-mini label="Flat" [name]="FlatObject?.name" link="#">
        </state-card-mini>
      </div>
      <div class="col-sm-2" *ngIf="ShowFlatStateWidget">
        <state-card-mini label="Flats" [state]="FlatCount" link="#">
        </state-card-mini>
      </div>
      <div
        class="col-xl-6 col-lg-6 col-sm"
        *ngIf="ShowServiceRequestStateWidget"
      >
        <state-card-expandable
          label="Service Request"
          [value]="ServiceRequestCount"
          [tabData]="ServiceRequestWidgetData"
        >
        </state-card-expandable>
      </div>
    </div>
  `,
  styleUrls: ["./widget-panel.component.css"],
})
export class WidgetPanelComponent
  extends RoleAuthorizerUtility
  implements OnInit
{
  // DATA
  public SecUserData: SecUserModel;
  public SecUserId: number;
  public SecUserRole: number;

  public BuildingObject: BuildingModel;
  public FlatObject: FlatModel;

  public ServiceRequestList: ServiceRequestModel[];
  public BuildingList: BuildingModel[];
  public FloorList: FloorModel[];
  public FlatList: FlatModel[];
  public StatusList: StatusModel[];

  public ServiceRequestCount: number;
  public BuildingCount: number;
  public FloorCount: number;
  public FlatCount: number;

  public ServiceRequestWidgetData: StateCardTabModel[] = [];

  // SHOW WIDGETS BASED ON AUTHORIZATION
  public ShowServiceRequestStateWidget: boolean = false;
  public ShowBuildingStateWidget: boolean = false;
  public ShowFloorStateWidget: boolean = false;
  public ShowFlatStateWidget: boolean = false;

  public ShowBuildingNameWidget: boolean = false;
  public ShowFlatNameWidget: boolean = false;

  constructor(
    private _tenantService: TenantServicesService,
    private _tenantBuilding: TenantBuildingService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.manageWidgetsBasedOnAuthorization();
    this.loadUserDataFromLocalStorage();

    await this.LoadUserData();
    await this.loadBuildings();
    await this.loadFloors();
    await this.loadFlats();
    await this.loadServiceRequests();

    await this.loadStatus();

    this.ServiceRequestCount = this.ServiceRequestList?.length;
    this.BuildingCount = this.BuildingList?.length;
    this.FloorCount = this.FloorList?.length;
    this.FlatCount = this.FlatList?.length;

    this.prepareServiceRequestWidgetData();
  }

  manageWidgetsBasedOnAuthorization(): void {
    if (this.isAuthorize([Roles.ADMIN])) {
      this.ShowServiceRequestStateWidget = true;
      this.ShowBuildingStateWidget = true;
      this.ShowFlatStateWidget = true;
    }
    if (this.isAuthorize([Roles.TENANT])) {
      this.ShowBuildingNameWidget = true;
      this.ShowFlatNameWidget = true;
      this.ShowServiceRequestStateWidget = true;
    }
    if (this.isAuthorize([Roles.MAINTAINER_OFFICER])) {
      this.ShowBuildingNameWidget = true;
      this.ShowFlatStateWidget = true;
      this.ShowServiceRequestStateWidget = true;
    }
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

  async loadBuildings(): Promise<void> {
    // TODO: Load Building
    if (this.isAuthorize([Roles.ADMIN]))
      this.BuildingList = await this._tenantBuilding.GetAllBuildings();

    if (!this.SecUserData) return; //! Exit If this.SecUserData is null

    const { buildingId } = this.SecUserData;

    if (!buildingId) return; //! Exit If buildingId is null

    if (this.isNotAuthorize([Roles.ADMIN]))
      this.BuildingObject = await this._tenantBuilding.GetBuildingById(
        buildingId
      );
  }

  async loadFloors(): Promise<void> {
    // TODO: Load Building
    if (this.isAuthorize([Roles.ADMIN]))
      this.FloorList = await this._tenantBuilding.GetAllFloor();
  }

  async loadFlats(): Promise<void> {
    if (!this.SecUserData) return; //! Exit If this.SecUserData is null

    const { buildingId, flatId } = this.SecUserData;

    // TODO: Load All Flats
    if (this.isAuthorize([Roles.ADMIN]))
      this.FlatList = await this._tenantBuilding.GetAllFlat();

    if (!buildingId) return; //! Exit If buildingId is null

    // TODO: Load Flats Base on Building Id
    if (this.isNotAuthorize([Roles.ADMIN])) {
      this.FlatList = await this._tenantBuilding.GetAllFlat([
        {
          QueryParam: "BuildingId",
          value: buildingId,
          method: ParamMethod.FILTER,
          filterOperator: FilterOperator.EQUAL,
        },
      ]);

      if (!flatId) return; //! Exit If flatId is null

      this.FlatObject = await this._tenantBuilding.GetFlatById(flatId);
    }
  }

  async loadStatus(): Promise<void> {
    // TODO: Load Status
    this.StatusList = await this._tenantService.GetAllStatus();
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

    this.ServiceRequestList = await this._tenantService.GetAllServiceRequest(
      queryParamList
    );
  }

  prepareServiceRequestWidgetData(): void {
    if (this.StatusList == null) return; //! Exit If this.StatusList is null

    this.StatusList.forEach((status) => {
      const obj: StateCardTabModel = {
        labelId: status.id,
        label: status.name,
        number: 0,
      };

      this.ServiceRequestWidgetData.push(obj);
    });

    this.ServiceRequestList.forEach((SR) => {
      switch (+SR.statusId) {
        case 1:
          this.ServiceRequestWidgetData.find((el) => el.labelId === 1).number++;
          break;
        case 2:
          this.ServiceRequestWidgetData.find((el) => el.labelId === 2).number++;
          break;
        case 3:
          this.ServiceRequestWidgetData.find((el) => el.labelId === 3).number++;
          break;
        case 4:
          this.ServiceRequestWidgetData.find((el) => el.labelId === 4).number++;
          break;
      }
    });
  }
}
