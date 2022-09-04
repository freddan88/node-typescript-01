import { Request as Req, Response as Res } from "express";
import { outRange } from "../data/httpMessages";
import { CustomError } from "../utils/customError";
import { TParams } from "../routes/userRoutes";
import { users } from "../data/users";

export const index = (req: Req, res: Res) => {
  res.status(200).json(users);
};

export const create = (req: Req, res: Res) => {
  res.status(200).json(users);
};

export const store = (req: Req, res: Res) => {
  res.status(200).json(users);
};

export const show = (req: Req<TParams>, res: Res) => {
  const userData = users.find((user) => user.id === +req.params.id);
  if (!userData) throw new CustomError(outRange, [req.params.id]);
  res.status(200).json(userData);
};

export const edit = (req: Req<TParams>, res: Res) => {
  res.status(200).json(users);
};

export const update = (req: Req<TParams>, res: Res) => {
  res.status(200).json(users);
};

export const destroy = (req: Req<TParams>, res: Res) => {
  res.status(200).json(users);
};
