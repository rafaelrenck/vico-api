import { Router } from "express";

import { checkToken } from "./middlewares/checkToken";
import { sighRoutes } from "./modules/sigh/routes/sigh.routes";
import { accountsRoutes } from "./modules/users/routes/accounts.routes";
import { groupsRoutes } from "./modules/users/routes/groups.routes";
import { usersRoutes } from "./modules/users/routes/users.routes";
import { usersGroupsRoutes } from "./modules/users/routes/usersGroups.routes";

const routes = Router();

routes.use(accountsRoutes);
routes.use("/users", checkToken, usersRoutes);
routes.use("/groups", checkToken, groupsRoutes);
routes.use("/users_groups", checkToken, usersGroupsRoutes);

routes.use("/sigh", checkToken, sighRoutes);

export { routes };
