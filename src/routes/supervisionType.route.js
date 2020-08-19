import express from "express";

import supervisionTypeController from "../controllers/supervisionType";

const router = express.Router();

router
  .route("/")
  .post(supervisionTypeController.addSupervisionType)
  .get(supervisionTypeController.allSupervisionTypes);

export default router;
