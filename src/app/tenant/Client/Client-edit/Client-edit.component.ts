import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {  BsModalRef } from "ngx-bootstrap/modal";
import { CountryService } from "@shared/Services/country-service";
import { StateService } from "@shared/Services/state-service";
import { CityService } from "@shared/Services/City-Service";
import { CountryModel } from "@shared/Dto/country-model";
import { StateModel } from "@shared/Dto/state-model";
import { CityModel } from "@shared/Dto/city-model";
import {
  FilterOperator,
  ParamMethod,
  QueryParamModel,
} from "@shared/interface/QueryParam.interface";

import {
  RoleAuthorizerUtility,
  Roles,
} from "@shared/utility/role-authorizer.utility";
import { ClientModel } from "@shared/interface/Client.interface";
import { TenantClientService } from "@shared/Services/tenant-client.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-Client",
  templateUrl: "./Client-edit.component.html",
  styleUrls: ["./Client-edit.component.css"],
})
export class ClientEditComponent
  extends RoleAuthorizerUtility
  implements OnInit {
  public AddClientDataForm = new FormGroup({
    name: new FormControl(""),
    cityId: new FormControl(""),
    stateId: new FormControl(""),
    countryId: new FormControl(""),
    code: new FormControl(""),
    phoneNumber: new FormControl(""),
    contactPerson: new FormControl(""),
    mobileNumber: new FormControl(""),
    email: new FormControl(""),
    website: new FormControl(""),
    address1: new FormControl(""),
    address2: new FormControl(""),
    countryName: new FormControl(""),
    creationTime: new FormControl(""),
    creatorUserId: new FormControl(""),
    date: new FormControl(""),
    deleterUserId: new FormControl(""),
    deletionTime: new FormControl(""),
    description: new FormControl(""),
    isActive: new FormControl(""),
    isDeleted: new FormControl(""),
    isProjectExist: new FormControl(""),
    lastModificationTime: new FormControl(""),
    lastModifierUserId: new FormControl(""),
    multisite: new FormControl(""),
    organizationCode: new FormControl(""),
    organizationId: new FormControl(""),
    organizationName: new FormControl(""),
    overAllEmployees: new FormControl(""),
    personContactNumber: new FormControl(""),
    position: new FormControl(""),
    postalCode: new FormControl(""),
    prefixId: new FormControl(""),
    siteAddress: new FormControl(""),
    siteCity: new FormControl(""),
    siteCount: new FormControl(""),
    siteCountry: new FormControl(""),
    siteName: new FormControl(""),
    stateName: new FormControl(""),
  });

  
  KeyPress(event) {
    let value: string = (event.target as HTMLInputElement).value;
    if (value.length == 3) (event.target as HTMLInputElement).value += "-";
    if (value.length == 7) (event.target as HTMLInputElement).value += "-";
  }
  public modalRef?: BsModalRef;
  public BuildingId: number;
  public ClientId:number;


  public ShowSaveButton: boolean = this.isAuthorize([Roles.ADMIN]);
  public DisableFields: boolean = this.isNotAuthorize([Roles.ADMIN]);

  // Objects
  public Client: ClientModel;
  public CountryList: CountryModel[];
  public StateList: StateModel[];
  public CityList: CityModel[];


  // UserData
  private QueryParam: QueryParamModel[];

  constructor(
    private route: ActivatedRoute,
    private CountryService: CountryService,
    private StateService: StateService,
    private CityService: CityService,
    private _tenantClient: TenantClientService,
    private _toster : ToastrService 
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.ClientId = +params["id"];
    });

    if (this.DisableFields) this.AddClientDataForm.disable();

    this.QueryParam = [
      {
        QueryParam: "buildingId",
        value: this.BuildingId,
        method: ParamMethod.FILTER,
        filterOperator: FilterOperator.EQUAL,
      },
    ];

    await this.loadClients();
    await this.loadCountry();
    await this.loadState();
    await this.loadCity();

    this.FillFields();
  }

  

  async loadClients(): Promise<void> {
    this.Client = await this._tenantClient.GetClientId(this.ClientId);
  }

  async loadCountry(queryParam?: QueryParamModel[]): Promise<void> {
    this.CountryList = await this.CountryService.GetAllCountries(queryParam);
  }

  async loadState(queryParam?: QueryParamModel[]): Promise<void> {
    this.StateList = await this.StateService.GetAllStates(queryParam);
  }

  async loadCity(queryParam?: QueryParamModel[]): Promise<void> {
    this.CityList = await this.CityService.GetAllCities(queryParam);
  }

 

 

  private FillFields(): void {
    // update form fields;
    this.AddClientDataForm.patchValue(this.Client);
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

  async onAddClientDataFormSubmit(): Promise<void> {
    if (this.AddClientDataForm.invalid)
    return null;  
    //return this._toster.error("Error, Form Invalid");

    const UpdateClient = { ...this.AddClientDataForm.value };

    await this._tenantClient.UpdateClient(this.ClientId, UpdateClient);
    this._toster.success("Client Updated");
  }

 

}
