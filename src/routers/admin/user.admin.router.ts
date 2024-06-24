
import { Router } from "express";
import { UserController } from "../../modules/controllers/user/user.controller";
import passport from "passport";

const routes=Router();

// VRIABLE
const userController = new UserController();

// POST
routes.post("/login", 
userController.validLogin,
passport.authenticate('local'), 
userController.handle);

export default routes;