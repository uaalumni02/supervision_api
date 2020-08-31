import Db from "../db/db";
import Meeting from "../models/meeting";
import moment from "moment";
import { checkAuth } from "../middleware/auth/auth";

// import validator from "../validator/meeting";
import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";

class AddMeetingData {
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
      // const { error } = validator.validateAsync(id);
      // if (error) {
      //   return Response.responseValidationError(res, Errors.INVALID_ID);
      // }
      const isAuthorized = checkAuth(req);
      if (isAuthorized) {
        const meetingToDelete = await Db.removeMeeting(Meeting, id);
        return !meetingToDelete
          ? Response.responseNotFound(res, Errors.INVALID_MEETING)
          : Response.responseOk(res, meetingToDelete);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default AddMeetingData;
