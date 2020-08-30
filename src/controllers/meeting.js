import Db from "../db/db";
import Meeting from "../models/meeting";
import moment from "moment";

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
    try {
      const meetingInfo = await Db.addMeeting(Meeting, meetingData);
      return Response.responseOkCreated(res, meetingInfo);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default AddMeetingData