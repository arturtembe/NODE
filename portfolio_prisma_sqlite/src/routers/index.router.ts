
import { Router } from "express";
import homeRoutes from "./home.router";
import adminRoutes from "./admin.routers";

const routes=Router();

// HOME
routes.use(homeRoutes);

// ADMIN
routes.use("/admin", adminRoutes);


export default routes;