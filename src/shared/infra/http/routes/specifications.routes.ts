import {Router} from "express";

import {CreateSpecificationController} from "@modules/cars/useCases/specification/create/CreateSpecificationController";
import ensureAuthenticated from "@middlewares/ensureAuthenticated";
import ensureAdmin from "@middlewares/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

export {specificationsRoutes};