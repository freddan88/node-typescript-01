import { Request as Req, Response as Res, NextFunction as Next } from "express";

const errorMiddleware = (err: any, req: Req, res: Res, next: Next) => {
  const { extraMessage, httpMessage, httpStatus, error } = err;
  const extra = error ? error.message : extraMessage;
  res.status(httpStatus);
  res.json({
    error: true,
    httpStatus,
    httpMessage,
    extraMessage: extra,
  });
};

export default errorMiddleware;
