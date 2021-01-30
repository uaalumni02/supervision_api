import Db from "../db/db";
import SignatureApproval from "../models/signatureApproval";

import validator from "../validator/unit";
import * as Response from "../helpers/response/response";
import signatureApproval from "../models/signatureApproval";

class Approval {
  static async addApproval(req, res) {
    const approvalData = { ...req.body };
    try {
      const approvalInfo = await Db.addApproval(
        SignatureApproval,
        approvalData
      );
      return Response.responseOkCreated(res, approvalInfo);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getApprovedMeetings(req, res) {
    try {
      const allApprovals = await Db.getAllApprovals(SignatureApproval);
      return Response.responseOk(res, allApprovals);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async getApprovalById(req, res) {
    const { id } = req.params;
    try {
      const approvalById = await Db.getApprovalById(SignatureApproval, id);
      return Response.responseOk(res, approvalById);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default Approval;
