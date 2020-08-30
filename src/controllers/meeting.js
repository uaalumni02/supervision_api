import Db from "../db/db";
import Meeting from "../models/meeting";
import moment from "moment";

// import validator from "../validator/meeting";
import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";

//how to add multiple attendees *****

class AddMeetingData {
  static async addMeeting(req, res) {
    const meetingData = { ...req.body };
    const meetingTimestamp = moment(
      meetingData.date,
      "YYYY-MM-DD hh:mmA"
    ).unix();
    meetingData.date = meetingTimestamp;
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
}

export default AddMeetingData;
