import { Router } from "express";
import * as userController from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", userController.index);

export default userRoutes;
