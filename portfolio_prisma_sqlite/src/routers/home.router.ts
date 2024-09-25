
import { Router } from "express";
import contactoRoutes from "./home/contacto.home.router";
import { GetProjecto_Home_Controller } from "../modules/controllers/home/projecto.home.controller";
import { GetIndex_Home_Controller } from "../modules/controllers/home/index.home.controller";
import { GetHabilidade_Home_Controller } from "../modules/controllers/home/habilidade.home.controller";
import { GetContacto_Home_Controller } from "../modules/controllers/home/contacto.home.controller";
import { GetNotFound_Home_Controller } from "../modules/controllers/home/notfound.home.controllers";
import { UserController } from "../modules/controllers/user/user.controller";
const routes=Router();

// VARIABLE
const index_Home_Controller = new GetIndex_Home_Controller();
const projecto_Home_Controller = new GetProjecto_Home_Controller();
const habilidade_Home_Controller = new GetHabilidade_Home_Controller();
const contacto_Home_Controller = new GetContacto_Home_Controller();
const notfound_Home_Controller = new GetNotFound_Home_Controller();
const userController = new UserController();

// GET
routes.get("/", index_Home_Controller.viewIndexHome);
routes.get("/projecto", projecto_Home_Controller.viewProjectoHome);
routes.get("/habilidade", habilidade_Home_Controller.viewHabilidadeHome);
routes.get("/contacto", contacto_Home_Controller.viewContactoHome);

// User
routes.get("/login", userController.handleLogin);



// PAGE NOT FOUND
//routes.get("/notfound", notfound_Home_Controller.viewContactoHome);

// CONTACTO
routes.use("/contacto", contactoRoutes);

export default routes;