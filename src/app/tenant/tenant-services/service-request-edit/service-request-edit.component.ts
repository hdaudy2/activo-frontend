import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { SecUserService } from "@shared/Services/sec-user.service";
import { TenantServicesService } from "@shared/Services/tenant-services.service";
import { TenantBuildingService } from "@shared/Services/tenant-building.service";

import { BuildingModel } from "@shared/interface/Building.interface"
import { FlatModel } from "@shared/interface/Flat.interface";
import { StatusModel } from "@shared/interface/Status.interface";
import { ServiceTypeModel } from "@shared/interface/ServiceType.interface";
import { PriorityModel } from "@shared/interface/Priority.interface";
import { ServiceRequestModel } from "@shared/interface/ServiceRequest.interface";

import { SecUserModel } from "@app/Models/user-interface";
import { RoleAuthorizerUtility, Roles } from "@shared/utility/role-authorizer.utility";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-service-request-edit",
  templateUrl: "./service-request-edit.component.html",
  styleUrls: ["./service-request-edit.component.css"],
})
export class ServiceRequestEditComponent
  extends RoleAuthorizerUtility
  implements OnInit
{
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

  public ServiceRequestReviewForm = new FormGroup({
    reviews: new FormControl(""),
  });

  public ServiceRequestId: number = 0;

  // DropDowns
  public StatusList: StatusModel[] = [];

  // Data
  public SecUserData: SecUserModel;
  private SecUserId: number;
  public ServiceRequestData: ServiceRequestModel;

  public flatObj: FlatModel;
  public buildingObj: BuildingModel;
  public ServiceTypeObj: ServiceTypeModel;
  public PriorityObj: PriorityModel;

  // Show Properties
  ShowMaintainerComments: boolean = this.isAuthorize([
    Roles.ADMIN,
    Roles.MAINTAINER_OFFICER,
  ]);
  ShowUpdateButtons: boolean = this.isAuthorize([
    Roles.ADMIN,
    Roles.MAINTAINER_OFFICER,
  ]);
  DisableUpdateButtons: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public SecUserService: SecUserService,
    public _tenantService: TenantServicesService,
    private _tenantBuilding: TenantBuildingService,
    private _toster : ToastrService 
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.ServiceRequestId = +params["id"];
    });

    this.ServiceRequestForm.disable();
    this.ServiceRequestForm.get("MaintainerComments").enable();
    if (this.isNotAuthorize([Roles.TENANT]))
      this.ServiceRequestForm.get("StatusId").enable();
    this.ServiceRequestForm.reset();

    this.ServiceRequestReviewForm.disable();

    this.loadUserDataFromLocalStorage();
    await this.LoadUserData();
    await this.LoadData();
    await this.FillDropDowns();
  }

  private loadUserDataFromLocalStorage(): void {
    this.SecUserId = +localStorage.getItem("userId");
  }

  private async LoadUserData(): Promise<void> {
    if (this.SecUserId == null) return; //! Exit If UserId is null

    // TODO: Load SecUser Data From DB
    this.SecUserData = await this._tenantService.GetUserByIdUsingPromise(
      this.SecUserId
    );
  }

  // ...............................................................
  private async LoadData(): Promise<void> {
    // TODO 1: Load ServiceRequest Data From DB
    this.ServiceRequestData = await this._tenantService.GetServiceRequestById(
      this.ServiceRequestId
    );

    const { buildingId, serviceTypeId, flatId, priorityId, statusId } =
      this.ServiceRequestData;

    this.DisableUpdateButtons = statusId == 4;

    // TODO 2.1: Load Building Data From DB
    if (buildingId)
      this.buildingObj = await this._tenantBuilding.GetBuildingById(buildingId);

    // TODO 2.2: Load Service Type Data From DB
    if (serviceTypeId)
      this.ServiceTypeObj = await this._tenantService.GetServiceTypeById(
        serviceTypeId
      );

    // TODO 2.3: Load Flat Data From DB
    if (flatId) this.flatObj = await this._tenantBuilding.GetFlatById(flatId);

    // TODO 2.4: Load Priority Data From DB
    if (priorityId)
      this.PriorityObj = await this._tenantService.GetPriorityById(priorityId);

    // TODO 3: Fill FLat Field
    this.FillFields();
  }
  // ...............................................................
  // ...............................................................
  private async FillDropDowns(): Promise<void> {
    //* Fill Status DropDown
    this.StatusList = await this._tenantService.GetAllStatus();
  }
  private FillFields(): void {
    // values for ServiceRequestForm
    const values = {
      Title: this.ServiceRequestData?.title,
      Description: this.ServiceRequestData?.description,
      Asset: this.ServiceRequestData?.asset,
      StatusId: this.ServiceRequestData?.statusId,
      BuildingId: this.buildingObj?.name,
      ServiceTypeId: this.ServiceTypeObj?.name,
      FlatId: this.flatObj?.name,
      PriorityId: this.PriorityObj?.name,
    };

    // values for ServiceRequestReviewForm
    let reviews = this.ServiceRequestData.maintainerComments
      ?.split("|")
      .join("\r\n");

    // update form fields;
    this.ServiceRequestForm.patchValue(values);
    this.ServiceRequestReviewForm.get("reviews").setValue(reviews);
  }
  // ...............................................................
  // ...............................................................
  public OnServiceRequestFormBack(): void {
    this.router.navigate(["/app/services/service-request-list"]);
  }
  // ...............................................................
  // ...............................................................
  public async OnServiceRequestFormSubmit(): Promise<void> {
    let MaintainerComments = this.ServiceRequestData.maintainerComments;

    if (this.ServiceRequestForm.get("MaintainerComments").value) {
      if (this.ServiceRequestData.maintainerComments) {
        MaintainerComments = `${this.ServiceRequestData.maintainerComments}|${
          this.ServiceRequestForm.get("MaintainerComments").value
        } - ${localStorage.getItem("userName")?.replace(/['"]+/g, "")}`;
      } else {
        MaintainerComments =
          this.ServiceRequestForm.get("MaintainerComments").value;
      }
    }

    const updateServiceRequest = {
      MaintainerComments: MaintainerComments,
      StatusId: this.ServiceRequestForm.get("StatusId").value,
      LastModifiedById: +localStorage.getItem("userId"),
      LastModifiedDate: new Date().toJSON(),
    };

    if (!this.ServiceRequestForm.get("MaintainerComments").value)
      updateServiceRequest.MaintainerComments =
        this.ServiceRequestData.maintainerComments;

    if (this.ServiceRequestForm.get("StatusId").value == 4) {
      updateServiceRequest["CompletedById"] = +localStorage.getItem("userId");
      updateServiceRequest["CompletedDate"] = new Date().toJSON();
    }

    await this._tenantService.UpdateServiceRequest(
      this.ServiceRequestId,
      updateServiceRequest
    );
    this._toster.info("Service Request Updated");
    this.OnServiceRequestFormBack();
  }
  // ...............................................................
}
