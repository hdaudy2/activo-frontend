import { Roles } from "../utility/role-authorizer.utility";

export enum ParamMethod {
  SORT = "sort",
  FILTER = "filters",
  LIMIT = "pageSize",
  OFFSET = "page",
}

export enum FilterOperator {
  EQUAL = "==",
  NOTEQUAL = "!=",
  CONTAINS = "@=",
  GREATER_THEN = ">",
  LESS_THEN = "<",
  GREATER_EQUAL_TO = ">=",
  LESS_EQUAL_TO = ">=",
  START_WITH = "_=",
  END_WITH = "_-=",
}

export enum SortOperator {
  ASC = "",
  DECS = "-",
}

export interface QueryParamModel {
  QueryParam?: string;
  value?: string | number | boolean;
  method?: ParamMethod;
  filterOperator?: FilterOperator;
  sortOperator?: SortOperator;
  auth?: Roles[];
  valid?: boolean;
}
