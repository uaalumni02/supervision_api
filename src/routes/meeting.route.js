import express from "express";
import checkAuth from "../middleware/check-auth";
// import checkIsAdmin from "../middleware/check-isAdmin";
import meetingController from "../controllers/meeting";

const router = express.Router();

router
  .route("/:attendee")
  .get(checkAuth, meetingController.getSupervisionByAttendee);

router
  .route("/")
  .post(checkAuth, meetingController.addMeeting)
  .get(checkAuth,meetingController.getAllMeetings);

router
  .route("/:id")
  .patch(checkAuth, meetingController.editMeeting)
  .delete(checkAuth, meetingController.deleteMeeting);

// router.route("/:id").get(checkAuth, meetingController.getSupervisionById);

export default router;
