import { Router } from "express";
import * as controller from "../controllers/user.controller";
import { UserMiddleware } from "../middlewares";

export const user = Router();
const userMiddleware = new UserMiddleware();

user.get("/", userMiddleware.validateToken, controller.users);
user.post("/signup", controller.signup);
user.post("/login", controller.login);
user.post("/refresh", controller.refresh);
user.post("/validate", controller.validate);
user.put("/like/:user_id", userMiddleware.validateToken, controller.likeUser);
user.put(
  "/update/:user_id",
  userMiddleware.validateToken,
  controller.updateUser
);
user.delete(
  "/delete/:user_id",
  userMiddleware.validateToken,
  controller.deleteUser
);

user.get("/:user_id", userMiddleware.validateToken, controller.getUserData);
user.post("/create", userMiddleware.validateToken, controller.signup);
