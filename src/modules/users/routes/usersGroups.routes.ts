import { Router } from "express";

import { AddUserGroupController } from "../useCases/addUserGroup/AddUserGroupController";

const usersGroupsRoutes = Router();

const addUserGroupController = new AddUserGroupController();

usersGroupsRoutes.post("/:userId/:groupId", addUserGroupController.handle);

export { usersGroupsRoutes };
