import { Request as Req, Response as Res } from "express";
import { users } from "../data/users";
import { TUserParams } from "../routes/userRoutes";

export const index = (req: Req, res: Res) => {
  res.status(200).json(users);
};

export const create = (req: Req, res: Res) => {
  res.status(200).json(users);
};

export const store = (req: Req, res: Res) => {
  res.status(200).json(users);
};

export const show = (req: Req<TUserParams>, res: Res) => {
  const userData = users.find((user) => user.id === +req.params.id);
  if (!userData) return res.status(204).json("No content");
  res.status(200).json(userData);
};

export const edit = (req: Req<TUserParams>, res: Res) => {
  res.status(200).json(users);
};

export const update = (req: Req<TUserParams>, res: Res) => {
  res.status(200).json(users);
};

export const destroy = (req: Req<TUserParams>, res: Res) => {
  res.status(200).json(users);
};
