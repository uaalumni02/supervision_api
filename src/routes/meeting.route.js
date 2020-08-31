import express from "express";
import checkAuth from "../middleware/check-auth";
import checkIsAdmin from "../middleware/check-isAdmin";
import meetingController from "../controllers/meeting";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, meetingController.addMeeting)
  .get(checkAuth, meetingController.getAllMeetings);

router
  .route("/:attendees")
  .get(checkAuth, meetingController.getSupervisionByAttendee);

  router
  .route("/:id")
  .delete(checkAuth, checkIsAdmin, meetingController.deleteMeeting)

export default router;
