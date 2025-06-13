import { Router } from "express";
import {
  createUserController,
  deleteSpecificUsersController,
  loginUserController,
  readSpecificUsersController,
  realAllUsersController,
  updateSpecificUsersController,
} from "../controller/userController.js";

const userRouter = Router();

userRouter.route("/").post(createUserController).get(realAllUsersController);

userRouter.route("/login").post(loginUserController);

userRouter
  .route("/:id")
  .get(readSpecificUsersController)
  .patch(updateSpecificUsersController)
  .delete(deleteSpecificUsersController);

export default userRouter;
