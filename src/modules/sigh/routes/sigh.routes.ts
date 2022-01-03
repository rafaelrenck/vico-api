import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../config/upload";
import { ListActiveHealthInsurancesController } from "../useCases/listActiveHealthInsurances/ListActiveHealthInsurancesController";
import { ListAppointmentsController } from "../useCases/listAppointments/ListAppointmentsController";
import { LoadArchiveController } from "../useCases/loadArchive/LoadArchiveController";
import { UploadArchiveController } from "../useCases/uploadArchive/uploadArchiveController";

const sighRoutes = Router();

const uploadArchive = multer(uploadConfig.upload("archive"));

const listActiveHealthInsurancesController =
  new ListActiveHealthInsurancesController();
const listAppointmentsController = new ListAppointmentsController();
const loadArchiveController = new LoadArchiveController();
const uploadArchiveController = new UploadArchiveController();

sighRoutes.get(
  "/health_insurances",
  listActiveHealthInsurancesController.handle
);

sighRoutes.get("/appointments", listAppointmentsController.handle);

sighRoutes.post(
  "/archive/upload",
  uploadArchive.single("file"),
  uploadArchiveController.handle
);

sighRoutes.get("/archive/:id", loadArchiveController.handle);

export { sighRoutes };
