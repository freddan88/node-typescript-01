import { Request as Req, Response as Res, NextFunction as Next } from "express";

const errorMiddleware = (err: Error, req: Req, res: Res, next: Next) => {
  // console.log(res.statusMessage);
  // console.log(res.statusCode);
  // console.log(next.caller);
  console.error(err);
  res.status(res.statusCode || 500);
  res.json({
    error: true,
    status: res.statusCode,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
