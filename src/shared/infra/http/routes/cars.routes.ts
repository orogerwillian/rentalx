import { Router } from "express";
import multer from "multer";

import ensureAuthenticated from "@middlewares/ensureAuthenticated";
import ensureAdmin from "@middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/car/listAvaliable/ListAvailableCarsController";
import {
  CreateCarSpecificationController
} from "@modules/cars/useCases/carSpecification/CreateCarSpecificationController";
import { CreateCarController } from "@modules/cars/useCases/car/create/CreateCarController";
import { UploadCarImagesController } from "@modules/cars/useCases/car/uploadImage/UploadCarImagesController";
import uploadConfig from "@config/upload";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);


export { carsRoutes };