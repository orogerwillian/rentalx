import {Router} from "express";
import {
    CreateSpecificationController
} from "../modules/cars/useCases/specification/create/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

export {specificationsRoutes};