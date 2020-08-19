import Db from "../db/db";
import SupervisionType from "../models/supervisionType";

import validator from "../validator/supervisionType";
import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";

class Supervision {
  static async addSupervisionType(req, res) {
    const supervisionTypeData = { ...req.body };
    try {
      const { error } = validator.validate(supervisionTypeData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const supervisionName = await Db.addSupervisionType(
        SupervisionType,
        supervisionTypeData
      );
      return Response.responseOkCreated(res, supervisionName);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async allSupervisionTypes(req, res) {
    try {
      const allSupervisionTypes = await Db.getAllSupervisionTypes(
        SupervisionType
      );
      return Response.responseOk(res, allSupervisionTypes);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getSupervisionTypeById(req, res) {
    const { id } = req.params;
    try {
      const { error } = validator.validateAsync({ id });
      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }
      const supervisionById = await Db.getSupervisionTypeById(
        SupervisionType,
        id
      );
      return Response.responseOk(res, supervisionById);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
}

export default Supervision;
