import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { TenantBuildingService } from "@shared/Services/tenant-building.service";

import { BuildingModel } from "@shared/interface/Building.interface";
import { FlatModel } from "@shared/interface/Flat.interface";
import { FloorModel } from "@shared/interface/Floor.interface";

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
import { ToastrService } from "ngx-toastr";

interface gridRowModel {
  name: string;
  building: string;
  floor: string;
}

@Component({
  selector: "app-parkingSlot-list",
  templateUrl: "./parkingSlot-list.component.html",
  styleUrls: ["./parkingSlot-list.component.css"],
})
export class ParkingSlotListComponent extends RoleAuthorizerUtility implements OnInit {
  public readonly allowedPageSizes = [5, 10, 30, 50, 100, "all"];
  public readonly displayModes = [
    { text: "Display Mode 'full'", value: "full" },
    { text: "Display Mode 'compact'", value: "compact" },
  ];
  public displayMode = "compact";
  public showPageSizeSelector = true;
  public showInfo = true;
  public showNavButtons = true;

  public showEdit: boolean = true;

  public FilterForm = new FormGroup({
    floorId: new FormControl(""),
  });

  public AddParkingSlotDateForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    floorId: new FormControl(""),
  });

  public GridData = [];
  public GridDataRowCount = 0;

  public backToViewBuildingURL: string;

  private queryParamList: QueryParamModel[] = [];

  @ViewChild("EditFlatModel") public templateRef: TemplateRef<any>;
  public modalRef?: BsModalRef;

  private BuildingId: number;

  public Building: BuildingModel;
  public FloorList: FloorModel[] = [];
  public ResidenceFloorList: FloorModel[] = [];
  public ParkingFloorList: FloorModel[] = [];

  public ParkingSlotList: ParkingSlotModel[] = [];

  private currentlySelectId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private _tenantBuilding: TenantBuildingService,
    private _toster : ToastrService 
  ) {
    super();
    this.onEditClick = this.onEditClick.bind(this);
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.BuildingId = +params["buildingId"];
    });

    this.backToViewBuildingURL = `/app/buildings/edit/${this.BuildingId}`;

    await this.loadBuildings();
    await this.loadQueryParamList();
    await this.loadFloors();
    await this.loadParkingSlots();
    await this.loadGridData();
  }

  async loadBuildings(): Promise<void> {
    //* Load Building
    this.Building = await this._tenantBuilding.GetBuildingById(this.BuildingId);
  }

  loadQueryParamList(): void {
    const temp: QueryParamModel[] = [];

    temp.push({
      QueryParam: "BuildingId",
      value: this.BuildingId,
      method: ParamMethod.FILTER,
      filterOperator: FilterOperator.EQUAL,
    });

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

  async loadFloors(queryParam?: QueryParamModel[]): Promise<void> {
    this.FloorList = await this._tenantBuilding.GetAllFloor([
      {
        QueryParam: "BuildingId",
        value: this.BuildingId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
    ]);

    this.ResidenceFloorList = this.FloorList.filter(
      (el) => el.floorTypeId == FloorType.RESIDENCE
    );
    this.ParkingFloorList = this.FloorList.filter(
      (el) => el.floorTypeId == FloorType.PARKING
    );
  }

  async loadParkingSlots(): Promise<void> {
    this.ParkingSlotList = await this._tenantBuilding.GetAllParkingSlot(this.queryParamList);
  }

  private loadGridData(): void {
    const data = [];

    this.ParkingSlotList.forEach((slot) => {
      const name = slot.name;
      const building = this.Building.name;
      const floor = this.FloorList?.find((el) => el.id == slot.floorId);

      data.push({
        id: slot.id,
        name,
        building,
        floor: floor?.name,
        floorId: floor?.id,
      } as gridRowModel);
    });

    this.GridData = data;
  }

  onEditClick(event): void {
    this.currentlySelectId = event.row.data.id;
    this.AddParkingSlotDateForm.get("name").setValue(event.row.data.name);
    this.AddParkingSlotDateForm.get("floorId").setValue(event.row.data.floorId);

    this.modalRef = this.modalService.show(this.templateRef);
  }

  async OnFilterFormSubmit(): Promise<void> {
    // TODO 1: Load Service Request
    await this.loadQueryParamList();
    // TODO 2: Load Flats
    await this.loadParkingSlots();
    // TODO 3: Load Grid Data
    await this.loadGridData();
  }

  async resetFilterFormSubmit(): Promise<void> {
    // TODO 1: Reset Form
    this.FilterForm.reset();
    // TODO 2: Load Service Request
    await this.loadQueryParamList();
    // TODO 3: Load Service Request
    await this.loadParkingSlots();
    // TODO 4: Load Grid Data
    await this.loadGridData();
  }

  async onAddParkingSlotDataFormSubmit(): Promise<void> {
    if (this.AddParkingSlotDateForm.invalid)
    return null;  
    //return abp.message.error("Error, Form Invalid");

    const flat = { ...this.AddParkingSlotDateForm.value };

    await this._tenantBuilding.UpdateParkingSlot(this.currentlySelectId, flat);
    this._toster.info("Parking Updated");

    this.modalRef.hide();
    await this.loadParkingSlots();
    await this.loadGridData();
  }
}
