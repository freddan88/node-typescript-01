import { Request as Req, Response as Res } from "express";
import { users } from "../data/users";

export const index = (req: Req, res: Res) => {
  res.status(200).json(users);
};
