import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

import { BuildingModel } from "@shared/interface/Building.interface";
import { FlatModel } from "@shared/interface/Flat.interface";
import { ParkingSlotModel } from "@shared/interface/ParkingSlot.interface";
import { FloorModel } from "@shared/interface/Floor.interface";
import { FloorTypeModel } from "@shared/interface/FloorType.interface";

import { QueryParamModel } from "@shared/interface/QueryParam.interface";

import { QueryParamObjToUrl } from "@shared/utility/queryParamFormatter.utility";

@Injectable({
  providedIn: "root",
})
export class TenantBuildingService {
  private URLTenantBuilding = `${environment.apiUrl}/api/TenantBuilding`;

  private Building = `${this.URLTenantBuilding}/building`;
  private Floor = `${this.URLTenantBuilding}/floor`;
  private FloorType = `${this.URLTenantBuilding}/floorType`;
  private Flat = `${this.URLTenantBuilding}/flat`;
  private ParkingSlot = `${this.URLTenantBuilding}/parkingSlot`;

  constructor(private http: HttpClient) {}

  // ---------------------------------------------------------
  // Building: Start
  GetAllBuildings(queryParams?: QueryParamModel[]): Promise<BuildingModel[]> {
    let params: string = QueryParamObjToUrl(queryParams);

    const URL: string = `${this.Building}${params}`;

    return this.http.get<BuildingModel[]>(URL).toPromise();
  }
  GetBuildingById(id: number): Promise<BuildingModel> {
    return this.http.get<BuildingModel>(`${this.Building}/${id}`).toPromise();
  }
  CreateBuilding(body: BuildingModel): Promise<any> {
    return this.http.post<any>(`${this.Building}`, body).toPromise();
  }
  UpdateBuilding(id: number, body: any): Promise<any> {
    return this.http.patch<any>(`${this.Building}/${id}`, body).toPromise();
  }
  // Building: End
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // Floor: Start
  GetAllFloor(queryParams?: QueryParamModel[]): Promise<FloorModel[]> {
    let params: string = QueryParamObjToUrl(queryParams);

    const URL: string = `${this.Floor}${params}`;
    return this.http.get<FloorModel[]>(URL).toPromise();
  }
  GetFloorById(id: number): Promise<FloorModel> {
    return this.http.get<FloorModel>(`${this.Floor}/${id}`).toPromise();
  }
  CreateFloor(body: FloorModel): Promise<any> {
    return this.http.post<any>(`${this.Floor}`, body).toPromise();
  }
  UpdateFloor(id: number, body: any): Promise<any> {
    return this.http.patch<any>(`${this.Floor}/${id}`, body).toPromise();
  }
  // Floor: End
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // FloorType: Start
  GetAllFloorType(queryParams?: QueryParamModel[]): Promise<FloorTypeModel[]> {
    let params: string = QueryParamObjToUrl(queryParams);

    const URL: string = `${this.FloorType}${params}`;
    return this.http.get<FloorTypeModel[]>(URL).toPromise();
  }
  GetFloorTypeById(id: number): Promise<FloorTypeModel> {
    return this.http.get<FloorTypeModel>(`${this.FloorType}/${id}`).toPromise();
  }
  CreateFloorType(body: FloorTypeModel): Promise<any> {
    return this.http.post<any>(`${this.FloorType}`, body).toPromise();
  }
  UpdateFloorType(id: number, body: any): Promise<any> {
    return this.http.patch<any>(`${this.FloorType}/${id}`, body).toPromise();
  }
  // FloorType: End
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // Flat: Start
  GetAllFlat(queryParams?: QueryParamModel[]): Promise<FlatModel[]> {
    let params: string = QueryParamObjToUrl(queryParams);

    const URL: string = `${this.Flat}${params}`;
    return this.http.get<FlatModel[]>(URL).toPromise();
  }

  GetFlatById(id: number): Promise<FlatModel> {
    return this.http.get<FlatModel>(`${this.Flat}/${id}`).toPromise();
  }

  CreateFlat(body: FlatModel): Promise<any> {
    return this.http.post<any>(`${this.Flat}`, body).toPromise();
  }

  UpdateFlats(id: number, body: any): Promise<any> {
    return this.http.patch<any>(`${this.Flat}/${id}`, body).toPromise();
  }
  // Flat: End
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ParkingSlot: Start
  GetAllParkingSlot(queryParams?: QueryParamModel[]): Promise<ParkingSlotModel[]> {
    let params: string = QueryParamObjToUrl(queryParams);

    const URL: string = `${this.ParkingSlot}${params}`;
    return this.http.get<ParkingSlotModel[]>(URL).toPromise();
  }

  GetParkingSlotById(id: number): Promise<ParkingSlotModel> {
    return this.http.get<ParkingSlotModel>(`${this.ParkingSlot}/${id}`).toPromise();
  }

  CreateParkingSlot(body: ParkingSlotModel): Promise<any> {
    return this.http.post<any>(`${this.ParkingSlot}`, body).toPromise();
  }

  UpdateParkingSlot(id: number, body: any): Promise<any> {
    return this.http.patch<any>(`${this.ParkingSlot}/${id}`, body).toPromise();
  }
  // ParkingSlot: End
  // ---------------------------------------------------------
}
