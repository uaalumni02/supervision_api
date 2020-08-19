import express from "express";

import unitController from "../controllers/unit";

const router = express.Router();

router.route("/").post(unitController.addUnit).get(unitController.allUnits);

router.route("/:id").get(unitController.getUnitById);

export default router;
