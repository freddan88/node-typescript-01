import { Request as Req, Response as Res, NextFunction as Next } from "express";

type TStatus = {
  code: number;
  description: string;
};

type TStatuses = {
  [key: number]: TStatus;
};

const httpStatuses: TStatuses = {
  204: { code: 204, description: "No Content" },
  400: { code: 400, description: "Bad Request" },
  500: { code: 500, description: "Internal Server Error" },
};

const errorMiddleware = (
  err: { status: number; message: string },
  req: Req,
  res: Res,
  next: Next
) => {
  res.status(err.status || 500);
  res.json({
    error: true,
    status: err.status,
    message: err.message || httpStatuses[err.status].description,
  });
};

export default errorMiddleware;
