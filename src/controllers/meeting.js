import Db from "../db/db";
import Meeting from "../models/meeting";
import moment from "moment";
import { checkAuth } from "../middleware/auth/auth";

import validator from "../validator/meeting";
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

    const attendees = meetingData.attendees;
    const multiplePeople = attendees.split(",");
    meetingData.attendees = multiplePeople;

    try {
      const { error } = validator.validateAsync(meetingData);
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
    try {
      const allMeetings = await Db.getAllMeetings(Meeting);
      return Response.responseOk(res, allMeetings);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async getSupervisionByAttendee(req, res) {
    const { attendees } = req.params;
    try {
      const supervisionByAttendee = await Db.getsupervisionByAttendee(
        Meeting,
        attendees
      );
      return Response.responseOk(res, supervisionByAttendee);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async deleteMeeting(req, res) {
    const { id } = req.params;
    try {
      const { error } = validator.validateAsync(id);
      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }
      const body = { isDeleted: true };
      const isAuthorized = checkAuth(req);
      if (isAuthorized) {
        const meetingToDelete = await Db.updateMeeting(Meeting, id, body);
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
    const meetingData = { ...req.body };
    const meetingTimestamp = moment(
      meetingData.date,
      "YYYY-MM-DD hh:mmA"
    ).unix();
    meetingData.date = meetingTimestamp;

    try {
      const { error } = validator.validate(id);
      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }
      const isAuthorized = checkAuth(req);
      if (isAuthorized) {
        const { error } = validator.validate(meetingData);
        if (error) {
          return Response.responseBadRequest(res, Errors.VALIDATION);
        }
        const meetingToUpdate = await Db.updateMeeting(
          Meeting,
          id,
          meetingData
        );
        return Response.responseOk(res, meetingToUpdate);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default MeetingController;
