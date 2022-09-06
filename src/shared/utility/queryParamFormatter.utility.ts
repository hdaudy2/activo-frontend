import {
  QueryParamModel,
  ParamMethod,
} from "@shared/interface/QueryParam.interface";
import { Roles } from "./role-authorizer.utility";

interface paramInterface {
  [ParamMethod.SORT]: string[];
  [ParamMethod.FILTER]: string[];
  [ParamMethod.LIMIT]: string[];
  [ParamMethod.OFFSET]: string[];
}

const RoleId = +localStorage.getItem("roleId");

const isAuthorize = (Roles: Roles[]): boolean => Roles.includes(RoleId);
const isNotAuthorize = (Roles: Roles[]): boolean => !Roles.includes(RoleId);

export const QueryParamObjToUrl = (queryParams?: QueryParamModel[]): string => {
  queryParams = queryParams
    ?.map((param) => {
      const newParam = { ...param };

      if (newParam.auth?.length > 0) {
        newParam.valid = isAuthorize(newParam.auth);
      } else {
        newParam.valid = true;
      }

      return newParam;
    })
    .filter((param) => param.valid);

  let params: string = "";
  let paramsArr: string[] = [];

  const obj: paramInterface = {
    [ParamMethod.SORT]: [],
    [ParamMethod.FILTER]: [],
    [ParamMethod.LIMIT]: [],
    [ParamMethod.OFFSET]: [],
  };

  if (queryParams) {
    if (queryParams?.length > 0)
      queryParams?.forEach((el) => {
        switch (el.method) {
          case ParamMethod.SORT:
            obj[ParamMethod.SORT].push(`${el.sortOperator}${el.QueryParam}`);
            break;
          case ParamMethod.FILTER:
            obj[ParamMethod.FILTER].push(
              `${el.QueryParam}${el.filterOperator}${el.value}`
            );
            break;
          case ParamMethod.LIMIT:
            obj[ParamMethod.LIMIT].push(`${el.value}`);
            break;
          case ParamMethod.OFFSET:
            obj[ParamMethod.OFFSET].push(`${el.value}`);
            break;
        }
      });
  }

  if (obj.filters.length > 0)
    paramsArr.push(
      `${ParamMethod.FILTER}=${obj[ParamMethod.FILTER].join(",")}`
    );
  if (obj.pageSize.length > 0)
    paramsArr.push(`${ParamMethod.LIMIT}=${obj[ParamMethod.LIMIT].join(",")}`);
  if (obj.page.length > 0)
    paramsArr.push(
      `${ParamMethod.OFFSET}=${obj[ParamMethod.OFFSET].join(",")}`
    );
  if (obj.sort.length > 0)
    paramsArr.push(`${ParamMethod.SORT}=${obj[ParamMethod.SORT].join(",")}`);

  params = paramsArr.join("&");
  return params ? `?${params}` : params;
};
