
import { Request, Response, Router } from "express";
import { CreatedHabilidadeController } from "../../modules/controllers/habilidade/create.habilidade.controller";
import { GetHabilidadeReleaseDateController } from "../../modules/controllers/habilidade/view.habilidade.controller";
import { EditedHabilidadeController } from "../../modules/controllers/habilidade/edit.habilidade.controller";
import { DeletedHabilidadeController } from "../../modules/controllers/habilidade/delete.habilidade.controller";
import { isAuthenticated } from "../../middleware/passport.strategyc";
//import mongodbRoutes from "./mongodb.router";

const routes=Router();

// VRIABLE
const createdHabilidadeController = new CreatedHabilidadeController();
const editedHabilidadeController = new EditedHabilidadeController();
const getHabilidadeReleaseDateController = new GetHabilidadeReleaseDateController();
const deletedHabilidadeController = new DeletedHabilidadeController();

// GET isAuthenticated
routes.get("/", getHabilidadeReleaseDateController.handleAll);

routes.get("/add", createdHabilidadeController.handleAdd);

routes.get("/edit/:id", editedHabilidadeController.handleEdit);

routes.get("/delete/:id", deletedHabilidadeController.handle);

// POST
routes.post("/add", createdHabilidadeController.handle);
routes.post("/edit/:id", editedHabilidadeController.handle);

export default routes;