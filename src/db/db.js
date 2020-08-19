import { model } from "mongoose";

class Db {
  static async addSupervisionType(model, data) {
    try {
      const supervisionType = await model({ ...data });
      return supervisionType.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllSupervisionTypes(model) {
    try {
      const allSupervisionTypes = await model.find({});
      return allSupervisionTypes;
    } catch (error) {
      throw error;
    }
  }
  static async getSupervisionTypeById(model, id) {
    try {
      const supervisionType = await model.findById(id);
      return supervisionType;
    } catch (error) {
      throw error;
    }
  }
}

export default Db;
