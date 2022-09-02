import { Response as Res } from "express";

type TStatus = {
  code: number;
  description: string;
};

type TStatuses = {
  [key: number]: TStatus;
};

export const apiStatuses: TStatuses = {
  204: { code: 204, description: "No Content" },
  400: { code: 400, description: "Bad Request" },
};

export const sendError = (res: Res, code: number) => {
  const httpStatus = code === 204 ? 400 : code;
  res.status(httpStatus).json(apiStatuses[code]);
};
