import Db from "../db/db";
import Unit from "../models/unit";

import validator from "../validator/unit";
import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";

class AddUnitData {
  static async addUnit(req, res) {
    const unitData = { ...req.body };
    try {
      const { error } = validator.validate(unitData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const unitInfo = await Db.addUnit(Unit, unitData);
      return Response.responseOkCreated(res, unitInfo);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async allUnits(req, res) {
    try {
      const getAllUnits = await Db.getAllUnits(Unit);
      return Response.responseOk(res, getAllUnits);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getUnitById(req, res) {
    const { id } = req.params;
    try {
      const { error } = validator.validateAsync({ id });
      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }
      const unitById = await Db.getUnitById(
        Unit,
        id
      );
      return Response.responseOk(res, unitById);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
}

export default AddUnitData;
