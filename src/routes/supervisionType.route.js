import express from "express";
import checkAuth from "../middleware/check-auth";
import supervisionTypeController from "../controllers/supervisionType";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, supervisionTypeController.addSupervisionType)
  .get(checkAuth, supervisionTypeController.allSupervisionTypes);

router
  .route("/:id")
  .get(checkAuth, supervisionTypeController.getSupervisionTypeById);
export default router;
