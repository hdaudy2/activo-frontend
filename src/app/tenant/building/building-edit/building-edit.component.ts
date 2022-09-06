import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { TenantBuildingService } from "@shared/Services/tenant-building.service";
import { CountryService } from "@shared/Services/country-service";
import { StateService } from "@shared/Services/state-service";
import { CityService } from "@shared/Services/City-Service";

import { CountryModel } from "@shared/Dto/country-model";
import { StateModel } from "@shared/Dto/state-model";
import { CityModel } from "@shared/Dto/city-model";
import { BuildingModel } from "@shared/interface/Building.interface";
import { FloorModel } from "@shared/interface/Floor.interface";
import { FlatModel } from "@shared/interface/Flat.interface";
import {
  FilterOperator,
  ParamMethod,
  QueryParamModel,
} from "@shared/interface/QueryParam.interface";
import {
  FloorType,
  FloorTypeModel,
} from "@shared/interface/FloorType.interface";
import { ParkingSlotModel } from "@shared/interface/ParkingSlot.interface";
import {
  RoleAuthorizerUtility,
  Roles,
} from "@shared/utility/role-authorizer.utility";
import { SecUserService } from "@shared/Services/sec-user.service";
import { TenantServicesService } from "@shared/Services/tenant-services.service";
import { SecUserModel } from "@app/Models/user-interface";
import { ClientModel } from "@shared/interface/Client.interface";
import { TenantClientService } from "@shared/Services/tenant-client.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-building",
  templateUrl: "./building-edit.component.html",
  styleUrls: ["./building-edit.component.css"],
})
export class BuildingEditComponent
  extends RoleAuthorizerUtility
  implements OnInit
{
  public AddBuildingDataForm = new FormGroup({
    name: new FormControl(""),
    cityId: new FormControl(""),
    stateId: new FormControl(""),
    countryId: new FormControl(""),
    clientId: new FormControl(""),
  });

  public AddFloorDateForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    floorTypeId: new FormControl(""),
  });

  public AddFLatDateForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    floorId: new FormControl(""),
  });

  public AddParkingSlotDateForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    floorId: new FormControl(""),
  });

  public modalRef?: BsModalRef;
  public BuildingId: number;
  public FloorURL: string;
  public FlatURL: string;
  public ParkingSlotURL: string;

  public ShowSaveButton: boolean = this.isAuthorize([Roles.ADMIN]);
  public DisableFields: boolean = this.isNotAuthorize([Roles.ADMIN]);

  // Objects
  public Building: BuildingModel;
  public CountryList: CountryModel[];
  public ClientList: ClientModel[];
  public StateList: StateModel[];
  public CityList: CityModel[];
  public FloorList: FloorModel[];
  public FloorTypeList: FloorTypeModel[] = [];
  public ResidenceFloorList: FloorModel[] = [];
  public ParkingFloorList: FloorModel[] = [];
  public FlatList: FlatModel[];
  public ParkingSlotList: ParkingSlotModel[];

  // UserData
  private QueryParam: QueryParamModel[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private CountryService: CountryService,
    private ClientService : TenantClientService,
    private StateService: StateService,
    private CityService: CityService,
    private modalService: BsModalService,
    private _tenantBuilding: TenantBuildingService,
    private _tenantService: TenantServicesService,
    private _toster : ToastrService 
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.BuildingId = +params["id"];
    });

    if (!this.BuildingId) {
      const currentUser: SecUserModel =
        await this._tenantService.GetUserByIdUsingPromise(
          +localStorage.getItem("userId")
        );
        
      this.BuildingId = currentUser.buildingId;
    }

    if (this.DisableFields) this.AddBuildingDataForm.disable();

    this.FloorURL = `/app/buildings/${this.BuildingId}/floors`;
    this.FlatURL = `/app/buildings/${this.BuildingId}/flats`;
    this.ParkingSlotURL = `/app/buildings/${this.BuildingId}/parkingSlots`;

    this.QueryParam = [
      {
        QueryParam: "buildingId",
        value: this.BuildingId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
    ];

    await this.loadBuildings();
    await this.loadCountry();
    await this.loadClient();
    await this.loadState();
    await this.loadCity();
    await this.loadFloorType();

    await this.loadFloor(this.QueryParam);
    await this.loadFlat(this.QueryParam);
    await this.loadParkingSlot(this.QueryParam);

    this.FillFields();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async loadBuildings(): Promise<void> {
    this.Building = await this._tenantBuilding.GetBuildingById(this.BuildingId);
  }

  async loadCountry(queryParam?: QueryParamModel[]): Promise<void> {
    this.CountryList = await this.CountryService.GetAllCountries(queryParam);
  }
  async loadClient(queryParam?: QueryParamModel[]): Promise<void> {
    this.ClientList = await this.ClientService.GetAllClient(queryParam);
  }

  async loadState(queryParam?: QueryParamModel[]): Promise<void> {
    this.StateList = await this.StateService.GetAllStates(queryParam);
  }

  async loadCity(queryParam?: QueryParamModel[]): Promise<void> {
    this.CityList = await this.CityService.GetAllCities(queryParam);
  }

  async loadFloor(queryParam?: QueryParamModel[]): Promise<void> {
    this.FloorList = await this._tenantBuilding.GetAllFloor(queryParam);

    this.ResidenceFloorList = this.FloorList.filter(
      (el) => el.floorTypeId == FloorType.RESIDENCE
    );
    this.ParkingFloorList = this.FloorList.filter(
      (el) => el.floorTypeId == FloorType.PARKING
    );
  }

  async loadFloorType(): Promise<void> {
    this.FloorTypeList = await this._tenantBuilding.GetAllFloorType();
  }

  async loadFlat(queryParam?: QueryParamModel[]): Promise<void> {
    this.FlatList = await this._tenantBuilding.GetAllFlat(queryParam);
  }

  async loadParkingSlot(queryParam?: QueryParamModel[]): Promise<void> {
    this.ParkingSlotList = await this._tenantBuilding.GetAllParkingSlot(
      queryParam
    );
  }

  private FillFields(): void {
    // values for ServiceRequestForm
    const values = {
      name: this.Building?.name,
      cityId: this.Building?.cityId,
      stateId: this.Building?.stateId,
      countryId: this.Building?.countryId,
      clientId : this.Building?.clientId,
    };
    // update form fields;
    this.AddBuildingDataForm.patchValue(values);
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

  async onAddBuildingDataFormSubmit(): Promise<void> {
    if (this.AddBuildingDataForm.invalid)
    return null;
      //return abp.message.error("Error, Form Invalid");

    const updateBuilding = { ...this.AddBuildingDataForm.value };

    await this._tenantBuilding.UpdateBuilding(this.BuildingId, updateBuilding);
    this._toster.info("Building Updated");
  }

  async onAddFloorDataFormSubmit(): Promise<void> {
    if (this.AddFloorDateForm.invalid)
    return null;
      //return abp.message.error("Error, Form Invalid");

    const byDefault = {
      buildingId: this.BuildingId,
      isActive: true,
      isDeleted: false,
    };

    const floor = { ...this.AddFloorDateForm.value, ...byDefault };

    await this._tenantBuilding.CreateFloor(floor);
    this._toster.info("New Floor Added");

    this.modalRef.hide();
    await this.loadFloor(this.QueryParam);
    this.AddFloorDateForm.reset();
  }

  async onAddFlatDataFormSubmit(): Promise<void> {
    if (this.AddFLatDateForm.invalid)
    return null;
      //return abp.message.error("Error, Form Invalid");

    const byDefault = {
      buildingId: this.BuildingId,
      isActive: true,
      isDeleted: false,
    };

    const flat = { ...this.AddFLatDateForm.value, ...byDefault };

    await this._tenantBuilding.CreateFlat(flat);
    this._toster.info("New Flat Added");

    this.modalRef.hide();
    await this.loadFlat(this.QueryParam);
    this.AddFLatDateForm.reset();
  }

  async onAddParkingSlotDataFormSubmit(): Promise<void> {
    if (this.AddParkingSlotDateForm.invalid)
    return null;
      //return abp.message.error("Error, Form Invalid");

    const byDefault = {
      buildingId: this.BuildingId,
      isActive: true,
      isDeleted: false,
    };

    const parkingSLot = { ...this.AddParkingSlotDateForm.value, ...byDefault };

    await this._tenantBuilding.CreateParkingSlot(parkingSLot);
    this._toster.info("New Parking Slot Added");

    this.modalRef.hide();
    await this.loadParkingSlot(this.QueryParam);
    this.AddParkingSlotDateForm.reset();
  }
}
