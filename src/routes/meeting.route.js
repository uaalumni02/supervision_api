import express from "express";
import checkAuth from "../middleware/check-auth";
import meetingController from "../controllers/meeting";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, meetingController.addMeeting)
  .get(checkAuth, meetingController.getAllMeetings);

export default router;
