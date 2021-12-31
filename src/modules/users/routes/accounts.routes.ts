import { Router } from "express";

import { checkToken } from "../../../middlewares/checkToken";
import { LoginController } from "../useCases/login/LoginController";
import { MyProfileController } from "../useCases/myProfile/MyProfileController";

const accountsRoutes = Router();

const signInController = new LoginController();
const myProfileController = new MyProfileController();

accountsRoutes.post("/login", signInController.handle);

accountsRoutes.get("/me", checkToken, myProfileController.handle);

export { accountsRoutes };
