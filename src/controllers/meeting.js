import Db from "../db/db";
import Meeting from "../models/meeting";
import moment from "moment";
import { checkAuth } from "../middleware/auth/auth";

import meetingSchema from "../validator/meeting";
import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";

import { checkUserForDelete, checkUserForEdit } from "../helpers/user/user";
class MeetingController {
  static async addMeeting(req, res) {
    const meetingData = { ...req.body };
    const meetingTimestamp = moment(
      meetingData.date,
      "YYYY-MM-DD hh:mmA"
    ).unix();
    meetingData.date = meetingTimestamp;
    try {
      const { error } = meetingSchema.validate(meetingData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }

      const meetingInfo = await Db.addMeeting(Meeting, meetingData);
      return Response.responseOkCreated(res, meetingInfo);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getAllMeetings(req, res) {
    // try {
    //   const allMeetings = await Db.getAllMeetings(Meeting);
    //   return Response.responseOk(res, allMeetings);
    // } catch (error) {
    //   return Response.responseServerError(res);
    // }
    const allMeetings = await Db.getAllMeetings(Meeting);
    if (allMeetings) {
      return Response.responseOk(res, allMeetings);
    } else {
      return Response.responseServerError(res);
    }
  }
  static async getSupervisionByAttendee(req, res) {
    const { attendee } = req.params;
    try {
      const supervisionByAttendee = await Db.getsupervisionByAttendee(
        Meeting,
        attendee
      );
      return Response.responseOk(res, supervisionByAttendee);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async deleteMeeting(req, res) {
    const { id } = req.params;
    const userId = req.userData.userId;
    try {
      const { error, value } = meetingSchema.validate({ id: id });
      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }
      const body = { isDeleted: true };
      const isAuthorized = checkAuth(req);
      if (isAuthorized) {
        const supervisionById = await Db.getMeetingById(Meeting, id);

        if (checkUserForDelete(userId, supervisionById)) {
          return Response.responseInvalidPermission(res);
        }

        const meetingToDelete = await Db.updateMeeting(Meeting, value.id, body);

        return !meetingToDelete
          ? Response.responseNotFound(res, Errors.INVALID_MEETING)
          : Response.responseOk(res, meetingToDelete);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }

  static async editMeeting(req, res) {
    const id = req.params.id;
    const userId = req.userData.userId;
    const meetingData = { ...req.body };
    try {
      const { error, value: IdValue } = meetingSchema.validate({ id });

      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }

      const isAuthorized = checkAuth(req);
      if (isAuthorized) {
        const { error, value } = meetingSchema.validateAsync(meetingData);

        if (error) {
          return Response.responseBadRequest(res, Errors.VALIDATION);
        }
        const meetingToUpdate = await Db.getMeetingById(
          Meeting,
          IdValue.id,
          value
        );
        if (checkUserForEdit(userId, meetingToUpdate)) {
          return Response.responseInvalidPermission(res);
        }
        const updateMeeting = await Db.updateMeeting(Meeting, id, meetingData);
        return Response.responseOk(res, updateMeeting);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }

  static async getSupervisionById(req, res) {
    const userId = req.userData.userId;

    const { id } = req.params;
    try {
      const supervisionById = await Db.getMeetingById(Meeting, id);

      if (
        supervisionById.attendees.join().includes(userId) ||
        userId == supervisionById.creator._id
      ) {
        return Response.responseOk(res, supervisionById);
      }
      return Response.responseInvalidPermission(res);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default MeetingController;
