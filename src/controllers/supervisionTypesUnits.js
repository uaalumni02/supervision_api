import Db from "../db/db";
import SupervisionType from "../models/supervisionType";
import Unit from "../models/unit";

import * as Response from "../helpers/response/response";



class GetSupervisionTypeUnits {
    static async allData(req, res) {
        try {
          const getAllUnits = await Db.getAllUnits(Unit);
              const allSupervisionTypes = await Db.getAllSupervisionTypes(
        SupervisionType
      );
          return Response.responsesOk(res, getAllUnits, allSupervisionTypes);
        } catch (error) {
          return Response.responseServerError(res);
        }
      }
  }
  
  export default GetSupervisionTypeUnits