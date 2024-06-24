
import { Router } from "express";
import { CreatedProjectoController } from "../../modules/controllers/projecto/create.projecto.controller";
import { GetProjectoReleaseDateController } from "../../modules/controllers/projecto/view.projecto.controller";
import uploadMulter from "../../middleware/multer.upload";
import { EditedProjectoController } from "../../modules/controllers/projecto/edit.projecto.controller";
import { DeletedProjectoController } from "../../modules/controllers/projecto/delete.projecto.controller";
import { isAuthenticated } from "../../middleware/passport.strategyc";

const routes=Router();

// VRIABLE
const createdProjectoController = new CreatedProjectoController();
const getProjectoReleaseDateController = new GetProjectoReleaseDateController();

const editedProjectoController = new EditedProjectoController();
const deletedProjectoController = new DeletedProjectoController();

// GET isAuthenticated
routes.get("/", getProjectoReleaseDateController.handleAll);

routes.get("/add", createdProjectoController.handleAdd);

routes.get("/edit/:id", editedProjectoController.handleEdit);

routes.get("/delete/:id", deletedProjectoController.handle);

// POST
routes.post("/add", createdProjectoController.handle);
routes.post("/edit/data/:id", editedProjectoController.edit_data);
routes.post("/edit/upload/:id", uploadMulter.single('files'), editedProjectoController.edit_Image);
routes.post("/edit/tecnologia/:id", editedProjectoController.edit_tecnologia);

export default routes;