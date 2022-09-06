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
import { FloorTypeModel } from "@shared/interface/FloorType.interface";
import { ParkingSlotModel } from "@shared/interface/ParkingSlot.interface";
import { ToastrService } from "ngx-toastr";

interface gridRowModel {
  name: string;
  building: string;
  flatNo: number;
}

@Component({
  selector: "app-floor-list",
  templateUrl: "./floor-list.component.html",
  styleUrls: ["./floor-list.component.css"],
})
export class FloorListComponent
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

  public showEdit: boolean = true;

  public AddFloorDateForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    floorTypeId: new FormControl(""),
  });

  public GridData = [];
  public GridDataRowCount = 0;

  public backToViewBuildingURL: string;

  private queryParamList: QueryParamModel[] = [];

  @ViewChild("EditFloorModel") public templateRef: TemplateRef<any>;
  public modalRef?: BsModalRef;

  private BuildingId: number;

  public Building: BuildingModel;
  public FloorList: FloorModel[] = [];
  public FlatsList: FlatModel[] = [];
  public FloorTypeList: FloorTypeModel[] = [];
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
    await this.loadFloorType();
    await this.loadFlats();
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

    this.queryParamList = temp;
  }

  async loadFloors(): Promise<void> {
    this.FloorList = await this._tenantBuilding.GetAllFloor(
      this.queryParamList
    );
  }

  async loadFloorType(): Promise<void> {
    this.FloorTypeList = await this._tenantBuilding.GetAllFloorType();
  }

  async loadFlats(): Promise<void> {
    this.FlatsList = await this._tenantBuilding.GetAllFlat(this.queryParamList);
  }

  async loadParkingSlots(): Promise<void> {
    this.ParkingSlotList = await this._tenantBuilding.GetAllParkingSlot(this.queryParamList);
  }


  private loadGridData(): void {
    const data = [];

    this.FloorList.forEach((floor) => {
      const name = floor.name;
      const building = this.Building.name;
      const flatNo = this.FlatsList.filter(ftno => ftno.floorId == floor.id)?.length;
      const slotNo = this.ParkingSlotList.filter(psno => psno.floorId == floor.id)?.length;
      const floorType = this.FloorTypeList.find(ft => ft.id == floor.floorTypeId)?.name;

      data.push({
        id: floor.id,
        name,
        floorType,
        building,
        flatNo: flatNo ?? 0,
        slotNo: slotNo ?? 0,
        floorTypeId: floor.floorTypeId
      } as gridRowModel);
    });

    this.GridData = data;
  }

  onEditClick(event): void {
    this.currentlySelectId = event.row.data.id;
    this.AddFloorDateForm.get("name").setValue(event.row.data.name);
    this.AddFloorDateForm.get("floorTypeId").setValue(event.row.data.floorTypeId);

    this.modalRef = this.modalService.show(this.templateRef);
  }

  async onAddFloorDataFormSubmit(): Promise<void> {
    if (this.AddFloorDateForm.invalid)
    return null;  
    //return abp.message.error("Error, Form Invalid");

    const floor = { ...this.AddFloorDateForm.value };

    await this._tenantBuilding.UpdateFloor(this.currentlySelectId, floor);
    this._toster.info("Floor Updated");

    this.modalRef.hide();
    await this.loadFloors();
    await this.loadGridData();
  }
}
