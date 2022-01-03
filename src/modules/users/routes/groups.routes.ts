import { Router } from "express";

import { CreateGroupController } from "../useCases/createGroup/CreateGroupController";
import { ListActiveGroupsController } from "../useCases/listActiveGroups/ListActiveGroupsController";

const groupsRoutes = Router();

const createGroupController = new CreateGroupController();
const listActiveGroupsController = new ListActiveGroupsController();

groupsRoutes.post("/", createGroupController.handle);

groupsRoutes.get("/", listActiveGroupsController.handle);

export { groupsRoutes };
