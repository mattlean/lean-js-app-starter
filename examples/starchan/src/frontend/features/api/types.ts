import { ServerErrorErrors } from "../../../backend/common/error/ServerError";

export interface APIInfoRes {
  info?: {
    threadCount?: number;
    totalPages?: number;
    hasNextPage?: number;
    hasPreviousPage?: number;
  };
}

export interface APIErrorRes extends APIInfoRes {
  errors?: ServerErrorErrors;
}

export interface APIRes<Type> extends APIErrorRes {
  data?: Type;
}
