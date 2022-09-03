import { Request as Req, Response as Res, NextFunction as Next } from "express";

const errorHandler = (err: Error, req: Req, res: Res, next: Next) => {
  // console.log(res.statusCode);
  // console.log(res.statusMessage);
  console.error(err);
  res.status(res.statusCode || 500);
  res.json({
    error: true,
    status: res.statusCode,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
