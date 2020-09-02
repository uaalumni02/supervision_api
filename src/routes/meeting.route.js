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
  .route("/:id")
  .patch(checkAuth, checkIsAdmin, meetingController.editMeeting)
  .delete(checkAuth, checkIsAdmin, meetingController.deleteMeeting);

router
  .route("/:attendees")
  .get(checkAuth, meetingController.getSupervisionByAttendee);

export default router;
