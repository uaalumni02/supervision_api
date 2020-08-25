import express from "express";
import checkAuth from "../middleware/check-auth";
import supervisionTypeController from "../controllers/supervisionType";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, supervisionTypeController.addSupervisionType)
 


export default router;
