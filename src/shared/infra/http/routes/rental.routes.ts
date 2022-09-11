import { Router } from "express";
import ensureAuthenticated from "@middlewares/ensureAuthenticated";

import { CreateRentalController } from "@modules/rentals/useCases/create/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolution/DevolutionRentalController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post(
  "/",
  ensureAuthenticated,
  createRentalController.handle
);

rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { rentalRoutes };