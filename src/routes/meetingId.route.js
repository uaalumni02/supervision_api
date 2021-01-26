import express from "express";
import checkAuth from "../middleware/check-auth";
import meetingController from "../controllers/meeting";

const router = express.Router();


router.route("/:id").get(checkAuth, meetingController.getSupervisionById);


export default router;