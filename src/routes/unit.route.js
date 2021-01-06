import express from "express";
import checkAuth from "../middleware/check-auth";
import unitController from "../controllers/unit";

const router = express.Router();

router.route("/").post(unitController.addUnit);

export default router;
