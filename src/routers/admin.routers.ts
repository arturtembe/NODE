
import { Router } from "express";
import habilidadeRoutes from "./admin/habilidade.admin.router";
import projectoRoutes from "./admin/projecto.admin.router";
import userRoutes from "./admin/user.admin.router";

const routes=Router();

// MONGODB
routes.use("/habilidade", habilidadeRoutes);
routes.use("/projecto", projectoRoutes);
routes.use("/user", userRoutes);

export default routes;