import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ServiceTypeModel } from "@shared/interface/ServiceType.interface";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { TenantServicesService } from "@shared/Services/tenant-services.service";
import { ToastrService } from "ngx-toastr";

interface gridRowModel {
  name: string;
  description: string;
}

@Component({
  selector: "app-service-type",
  templateUrl: "./service-type.component.html",
  styleUrls: ["./service-type.component.css"],
})
export class ServiceTypeComponent implements OnInit {
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

  public modalRef?: BsModalRef;
  @ViewChild("EditServiceTypeModal") public ServiceTypeModal: TemplateRef<any>;

  public GridData = [];
  public GridDataRowCount = 0;

  public ServiceTypeList: ServiceTypeModel[];

  public ServiceTypeDataForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });
  public ServiceTypeDataUpdateForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });

  // UserData
  private SecUserId;

  // UserData
  private CurrentlySelectedId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    public _tenantService: TenantServicesService,
    private _toster : ToastrService 
  ) {
    this.SecUserId = +localStorage.getItem("userId");
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  async ngOnInit(): Promise<void> {
    await this.loadServiceTypes();
    await this.loadGridData();
  }

  async loadServiceTypes(): Promise<void> {
    this.ServiceTypeList = await this._tenantService.GetAllServiceTypes();
  }

  private loadGridData(): void {
    const data = [];

    this.ServiceTypeList.forEach((ST) => {
      const name = ST.name;
      const description = ST.description;

      data.push({
        id: ST.id,
        name,
        description,
      } as gridRowModel);
    });

    this.GridData = data;
  }

  onEditClick(event): void {
    const name = event.row.data.name;
    const description = event.row.data.description;
    this.CurrentlySelectedId = event.row.data.id;

    this.ServiceTypeDataUpdateForm.get("name").setValue(name);
    this.ServiceTypeDataUpdateForm.get("description").setValue(description);
    this.modalRef = this.modalService.show(this.ServiceTypeModal);
  }

  async onDeleteClick(event): Promise<void> {
    this.CurrentlySelectedId = event.row.data.id;

    const byDefault = {
      isActive: false,
      isDeleted: true,
    };

    const message = await this._tenantService.UpdateServiceType(
      this.CurrentlySelectedId,
      byDefault
    );

    this._toster.info(message);
    await this.loadServiceTypes();
    await this.loadGridData();
  }

  async OnFormSubmit(): Promise<void> {
    if (this.ServiceTypeDataForm.invalid)
    return null;  
    //return abp.message.error("Error, Form Invalid");

    const byDefault = {
      createdById: this.SecUserId,
      createdDate: new Date().toJSON(),
      isActive: true,
      isDeleted: false,
    };

    const serviceType = { ...this.ServiceTypeDataForm.value, ...byDefault };

    await this._tenantService.CreateServiceType(serviceType);
    this._toster.info("Service Type Created");
    this.ServiceTypeDataForm.reset();
    await this.loadServiceTypes();
    await this.loadGridData();
  }

  async OnUpdateFormSubmit(): Promise<void> {
    if (this.ServiceTypeDataUpdateForm.invalid)
    return null;
      //return abp.message.error("Error, Form Invalid");

    const byDefault = {
      lastModifiedById: this.SecUserId,
    };

    const serviceType = {
      ...this.ServiceTypeDataUpdateForm.value,
      ...byDefault,
    };

    const message = await this._tenantService.UpdateServiceType(
      this.CurrentlySelectedId,
      serviceType
    );

    this._toster.info(message);
    this.ServiceTypeDataUpdateForm.reset();
    await this.loadServiceTypes();
    await this.loadGridData();
    
    this.modalRef.hide();
  }
}
