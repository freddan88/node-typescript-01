import { Router } from "express";
import * as userController from "../controllers/userController";

export type TParams = {
  id: string;
};

const userRoutes = Router();

userRoutes.get("/", userController.index);

userRoutes.get("/:id", userController.show);

userRoutes.post("/", userController.store);

userRoutes.put("/:id", userController.update);

userRoutes.delete("/:id", userController.destroy);

export default userRoutes;
