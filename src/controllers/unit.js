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
}

export default AddUnitData;
