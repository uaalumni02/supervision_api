import express from "express";

import unitController from "../controllers/unit";

const router = express.Router();

router.route("/")
.post(unitController.addUnit)
.get(unitController.allUnits);

export default router;
