import express from "express";
import checkAuth from "../middleware/check-auth";
import supervisionTypeUnitsController from "../controllers/supervisionTypesUnits";

const router = express.Router();

router.route("/").get(checkAuth, supervisionTypeUnitsController.allData);

export default router;
