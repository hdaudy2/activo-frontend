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
import { FloorType } from "@shared/interface/FloorType.interface";
import { ParkingSlotModel } from "@shared/interface/ParkingSlot.interface";
import { ToastrService } from "ngx-toastr";

interface gridRowModel {
  name: string;
  building: string;
  floor: string;
}

@Component({
  selector: "app-flat-list",
  templateUrl: "./flat-list.component.html",
  styleUrls: ["./flat-list.component.css"],
})
export class FlatListComponent extends RoleAuthorizerUtility implements OnInit {
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

  public AddFLatDateForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    floorId: new FormControl(""),
  });

  public AllotParkingSlotDateForm = new FormGroup({
    floorId: new FormControl(""),
    parkingSlotId: new FormControl(""),
  });

  public GridData = [];
  public GridDataRowCount = 0;

  public backToViewBuildingURL: string;

  private queryParamList: QueryParamModel[] = [];

  @ViewChild("EditFlatModel") public templateRef: TemplateRef<any>;
  @ViewChild("ManageParkingSpace")
  public ManageParkingSpaceModal: TemplateRef<any>;
  @ViewChild("AllotParkingSlotModel")
  public ParkingTemplateRef: TemplateRef<any>;

  public modalRef?: BsModalRef;

  private BuildingId: number;

  public Building: BuildingModel;
  public FloorList: FloorModel[] = [];
  public ResidenceFloorList: FloorModel[] = [];
  public ParkingFloorList: FloorModel[] = [];
  public ParkingSlotList: ParkingSlotModel[] = [];

  public FlatsList: FlatModel[] = [];

  private currentlySelectedFlatId: number;

  // ----------------------------------------------
  public flat: FlatModel;
  public floor: FloorModel;
  public slot: ParkingSlotModel;

  public parkingStatus: boolean;

  // ----------------------------------------------

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private _tenantBuilding: TenantBuildingService,
    private _toster : ToastrService 
  ) {
    super();
    this.onEditClick = this.onEditClick.bind(this);
    this.onManageParking = this.onManageParking.bind(this);
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.BuildingId = +params["buildingId"];
    });

    this.backToViewBuildingURL = `/app/buildings/edit/${this.BuildingId}`;

    await this.loadBuildings();
    await this.loadQueryParamList();
    await this.loadFloors();
    await this.loadFlats();
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

  async loadFlats(): Promise<void> {
    this.FlatsList = await this._tenantBuilding.GetAllFlat(this.queryParamList);
  }

  async loadParkingSlots(queryParam?: QueryParamModel[]): Promise<void> {
    this.ParkingSlotList = await this._tenantBuilding.GetAllParkingSlot(
      queryParam
    );
  }

  private loadGridData(): void {
    const data = [];

    this.FlatsList.forEach((flat) => {
      const name = flat.name;
      const building = this.Building.name;
      const floor = this.FloorList?.find((el) => el.id == flat.floorId);

      data.push({
        id: flat.id,
        name,
        building,
        floor: floor?.name,
        floorId: floor?.id,
      } as gridRowModel);
    });

    this.GridData = data;
  }

  onEditClick(event): void {
    this.currentlySelectedFlatId = event.row.data.id;
    this.AddFLatDateForm.get("name").setValue(event.row.data.name);
    this.AddFLatDateForm.get("floorId").setValue(event.row.data.floorId);

    this.modalRef = this.modalService.show(this.templateRef);
  }

  onFloorChange(value): void {
    const query: QueryParamModel[] = [
      {
        QueryParam: "BuildingId",
        value: this.BuildingId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
      {
        QueryParam: "floorId",
        value: value,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
      {
        QueryParam: "isAllotted",
        value: false,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
    ];

    this.loadParkingSlots(query);
  }

  async onManageParking(event): Promise<void> {
    this.currentlySelectedFlatId = event.row.data.id;
    this.flat = await this._tenantBuilding.GetFlatById(
      this.currentlySelectedFlatId
    );

    if (this.flat.parkingSlotId) {
      this.slot = await this._tenantBuilding.GetParkingSlotById(
        this.flat.parkingSlotId
      );
      this.floor = await this._tenantBuilding.GetFloorById(this.slot.floorId);
    }

    this.parkingStatus = this.flat?.parkingSlotId ? true : false;

    this.modalRef = this.modalService.show(this.ManageParkingSpaceModal);
  }

  async OnFilterFormSubmit(): Promise<void> {
    // TODO 1: Load Service Request
    await this.loadQueryParamList();
    // TODO 2: Load Flats
    await this.loadFlats();
    // TODO 3: Load Grid Data
    await this.loadGridData();
  }

  async resetFilterFormSubmit(): Promise<void> {
    // TODO 1: Reset Form
    this.FilterForm.reset();
    // TODO 2: Load Service Request
    await this.loadQueryParamList();
    // TODO 3: Load Service Request
    await this.loadFlats();
    // TODO 4: Load Grid Data
    await this.loadGridData();
  }

  async onAddFlatDataFormSubmit(): Promise<void> {
    if (this.AddFLatDateForm.invalid)
    return null;  
    //return abp.message.error("Error, Form Invalid");

    const flat = { ...this.AddFLatDateForm.value };

    await this._tenantBuilding.UpdateFlats(this.currentlySelectedFlatId, flat);
    this._toster.info("Flat Updated");

    this.modalRef.hide();
    await this.loadFlats();
    await this.loadGridData();
  }

  async onAllotParkingSlotDateFormSubmit(): Promise<void> {
    if (this.AllotParkingSlotDateForm.invalid)
    return null;
      //return abp.message.error("Error, Form Invalid");

    const flat = { ...this.AllotParkingSlotDateForm.value };

    await this._tenantBuilding.UpdateFlats(this.currentlySelectedFlatId, {
      parkingSlotId: flat.parkingSlotId,
    });

    await this._tenantBuilding.UpdateParkingSlot(flat.parkingSlotId, {
      isAllotted: true,
    });

    this._toster.info("Parking Slot Alloted");

    this.modalRef.hide();
    this.AllotParkingSlotDateForm.reset();
  }

  async RemoveSlot(): Promise<void> {
    if (this.slot) {
      await this._tenantBuilding.UpdateParkingSlot(this.slot.id, {
        isAllotted: false,
      });
    }
    if (this.flat) {
      await this._tenantBuilding.UpdateFlats(this.flat.id, {
        parkingSlotId: null,
      });
    }

    this._toster.info("Parking Slot Removed");

    this.modalRef.hide();
    this.AllotParkingSlotDateForm.reset();
  }
}
