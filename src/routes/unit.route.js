import express from "express";
import checkAuth from "../middleware/check-auth";
import unitController from "../controllers/unit";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, unitController.addUnit)
  .get(unitController.allUnits);

router.route("/:id").get(checkAuth, unitController.getUnitById);

export default router;
