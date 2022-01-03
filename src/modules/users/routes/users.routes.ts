import { Router } from "express";

import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { ListActiveUsersController } from "../useCases/listActiveUsers/ListActiveUsersController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listActiveUsersController = new ListActiveUsersController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get("/", listActiveUsersController.handle);

export { usersRoutes };
