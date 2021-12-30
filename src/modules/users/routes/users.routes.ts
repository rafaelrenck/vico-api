import { Router } from 'express';

import { checkToken } from "../../../middlewares/checkToken";
import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { ListActiveUsersController } from '../useCases/listActiveUsers/ListActiveUsersController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listActiveUsersController = new ListActiveUsersController();

usersRoutes.post("/", checkToken, createUserController.handle);

usersRoutes.get("/active", checkToken, listActiveUsersController.handle)

export { usersRoutes };
