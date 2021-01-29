import express from "express";
import checkAuth from "../middleware/check-auth";

import sigatureApprovalController from "../controllers/signatureApproval";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, sigatureApprovalController.addApproval)
  .get(checkAuth, sigatureApprovalController.getApprovedMeetings);

  router.route("/:id").get(checkAuth, sigatureApprovalController.getApprovalById);

export default router;
