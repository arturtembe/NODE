
import { Request, Response, Router } from "express";
import { CreatedContactoController } from "../../modules/controllers/contacto/create.contacto.controller";

const routes=Router();

// GET

// VARIABLE
const createdContactoController = new CreatedContactoController();

// POST
routes.post("/send", createdContactoController.handle);

export default routes;