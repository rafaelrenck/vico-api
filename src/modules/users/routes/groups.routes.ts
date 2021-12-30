import { Router } from 'express';

import { checkToken } from "../../../middlewares/checkToken";
import { CreateGroupController } from '../useCases/createGroup/CreateGroupController';
import { ListActiveGroupsController } from '../useCases/listActiveGroups/ListActiveGroupsController';

const groupsRoutes = Router();

const createGroupController = new CreateGroupController();
const listActiveGroupsController = new ListActiveGroupsController();

groupsRoutes.post("/", checkToken, createGroupController.handle);

groupsRoutes.get("/active", checkToken, listActiveGroupsController.handle)

export { groupsRoutes };
