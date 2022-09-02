import { Request as Req, Response as Res } from "express";
import { users } from "../data/users";
import { TParams } from "../routes/userRoutes";
import { sendError } from "../utils/apiStatuses";

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
  if (!userData) return sendError(res, 400);
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
