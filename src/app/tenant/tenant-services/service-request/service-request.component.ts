import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { SecUserService } from "@shared/Services/sec-user.service";
import { TenantServicesService } from "@shared/Services/tenant-services.service";
import { TenantBuildingService } from "@shared/Services/tenant-building.service";

import { BuildingModel } from "@shared/interface/Building.interface"
import { FlatModel } from "@shared/interface/Flat.interface";
import { StatusModel } from "@shared/interface/Status.interface";
import { ServiceTypeModel } from "@shared/interface/ServiceType.interface";
import { PriorityModel } from "@shared/interface/Priority.interface";

import { SecUserModel } from "@app/Models/user-interface";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-service-request",
  templateUrl: "./service-request.component.html",
  styleUrls: ["./service-request.component.css"],
})
export class ServiceRequestComponent implements OnInit {
  public ServiceRequestForm = new FormGroup({
    Code: new FormControl(``),
    Title: new FormControl("", [Validators.required]),
    Description: new FormControl("", [Validators.required]),
    ServiceTypeId: new FormControl("", [Validators.required]),
    ClientId: new FormControl(null),
    BuildingId: new FormControl(""),
    FlatId: new FormControl(""),
    Asset: new FormControl("", [Validators.required]),
    PriorityId: new FormControl("", [Validators.required]),
    MaintainerComments: new FormControl(""),
    StatusId: new FormControl(""),
    IsActive: new FormControl(""),
    IsDeleted: new FormControl(""),
    CreatedById: new FormControl(""),
    CreatedByDate: new FormControl(""),
    LastModifiedById: new FormControl(null),
    LastModifiedDate: new FormControl(null),
    CompletedById: new FormControl(null),
    CompletedDate: new FormControl(null),
  });

  // DropDowns
  public PriorityList: PriorityModel[] = [];
  public ServiceTypeList: ServiceTypeModel[] = [];
  public StatusList: StatusModel[] = [];

  // UserData
  private SecUserId = parseInt(localStorage.getItem("userId"));
  private SecUserData: SecUserModel;
  private SecUserBuildingObj: BuildingModel;
  private SecUserFlatObj: FlatModel;

  constructor(
    public SecUserService: SecUserService,
    private _tenantService: TenantServicesService,
    private _tenantBuilding: TenantBuildingService,
    private _toster : ToastrService 
  ) {}

  ngOnInit(): void {
    this.ServiceRequestForm.reset();
    this.LoadUserData();
    this.FillDropDowns();
  }

  // ...............................................................
  private async LoadUserData(): Promise<void> {
    if (this.SecUserId == null) return; //! Exit If UserId is null

    // TODO 1: Load SecUser Data From DB
    this.SecUserData = await this._tenantService.GetUserByIdUsingPromise(
      this.SecUserId
    );

    const { buildingId, flatId } = this.SecUserData;

    // TODO 2.1: Load Building Data From DB
    if (buildingId)
      this.SecUserBuildingObj =
        await this._tenantBuilding.GetBuildingById(buildingId);

    // TODO 2.2: Load Floor Data From DB
    if (flatId)
      this.SecUserFlatObj = await this._tenantBuilding.GetFlatById(
        flatId
      );

    // TODO 2: Fill Out Form Fields
    this.FillFromFields();
  }
  // ...............................................................
  // ...............................................................
  private async FillDropDowns(): Promise<void> {
    //* Fill Priority DropDown
    this.PriorityList = await this._tenantService.GetAllPriorities();

    //* Fill ServiceTypes DropDown
    this.ServiceTypeList =
      await this._tenantService.GetAllServiceTypes();
  }

  private FillFromFields(): void {
    const values = {
      BuildingId: this.SecUserBuildingObj?.name,
      FlatId: this.SecUserFlatObj?.name,
    };

    this.ServiceRequestForm.patchValue(values);
  }
  // ...............................................................
  // ...............................................................
  public async OnServiceRequestFormSubmit(): Promise<void> {
    if (this.ServiceRequestForm.invalid)
    return null;
      //return abp.message.error("Error, Form Invalid");
    const ServiceRequest = { ...this.ServiceRequestForm.value };

    ServiceRequest.Code = `${Math.floor(Math.random() * 999)}`;
    ServiceRequest.CreatedById = this.SecUserData.id;
    ServiceRequest.IsActive = true;
    ServiceRequest.IsDeleted = false;
    ServiceRequest.StatusId = 1;

    ServiceRequest.BuildingId = this.SecUserBuildingObj.id;
    ServiceRequest.FlatId = this.SecUserFlatObj.id;

    await this._tenantService.CreateServiceRequest(ServiceRequest);

    this._toster.info("Service Request Created");

    this.ServiceRequestForm.reset();
    this.FillFromFields();
  }
  // ...............................................................
}
