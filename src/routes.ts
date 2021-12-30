import { Router } from "express";

import { checkToken } from "./middlewares/checkToken";
import { accountsRoutes } from "./modules/users/routes/accounts.routes";
import { groupsRoutes } from "./modules/users/routes/groups.routes";
import { usersRoutes } from "./modules/users/routes/users.routes";

const routes = Router();

routes.use(accountsRoutes);
routes.use('/users', checkToken, usersRoutes);
routes.use('/groups', checkToken, groupsRoutes);

export { routes };
