import Db from "../db/db";
import Meeting from "../models/meeting";
import moment from "moment";
import { checkAuth } from "../middleware/auth/auth";

import meetingSchema from "../validator/meeting";
import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";

class MeetingController {
  static async addMeeting(req, res) {
    const meetingData = { ...req.body };
    const meetingTimestamp = moment(
      meetingData.date,
      "YYYY-MM-DD hh:mmA"
    ).unix();
    meetingData.date = meetingTimestamp;
    try {
      // const { error } = meetingSchema.validate(meetingData);
      // console.log(error)
      // if (error) {
      //   return Response.responseBadRequest(res, Errors.VALIDATION);
      // }

      const meetingInfo = await Db.addMeeting(Meeting, meetingData);
      return Response.responseOkCreated(res, meetingInfo);
    } catch (error) {
      console.log(error);
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
        const meetingToDelete = await Db.updateMeeting(Meeting, value.id, body);
        if (userId != meetingToDelete.creator) {
          return Response.responseInvalidPermission(res);
        }
        return !meetingToDelete
          ? Response.responseNotFound(res, Errors.INVALID_MEETING)
          : Response.responseOk(res, meetingToDelete);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async editMeeting(req, res) {
    const { id } = req.params;
    const meetingData = { ...req.body };
    const meetingTimestamp = moment(
      meetingData.date,
      "YYYY-MM-DD hh:mmA"
    ).unix();
    meetingData.date = meetingTimestamp;
    const userId = req.userData.userId;
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
        const meetingToUpdate = await Db.updateMeeting(
          Meeting,
          IdValue.id,
          value
        );
        if (userId != meetingToUpdate.creator) {
          return Response.responseInvalidPermission(res);
        }
        return Response.responseOk(res, meetingToUpdate);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }

  static async getSupervisionById(req, res) {
    const { id } = req.params;
    try {
      const supervisionById = await Db.getMeetingById(Meeting, id);
      // on front show error if non user or creator tries to access; only front end thing I need to do
      // put repetitive code in helpers; like the code that checks if the user is a creator
      // do some styling updates
      //try to deploy
      if (
        (supervisionById.attendees[0]._id =
          supervisionById.creator._id ||
          supervisionById.attendees.includes(supervisionById.creator._id))
      ) {
        return Response.responseOk(res, supervisionById);
      } else {
        return Response.responseInvalidPermission(res);
      }
    } catch (error) {
      console.log(error);
      return Response.responseServerError(res);
    }
  }
}

export default MeetingController;
