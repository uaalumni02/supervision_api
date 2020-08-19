

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
  static async addUnit(model, data) {
    try {
      const units = await model({ ...data });
      return units.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllUnits(model) {
    try {
      const allUnits = await model.find({});
      return allUnits;
    } catch (error) {
      throw error;
    }
  }
  static async getUnitById(model, id) {
    try {
      const unit = await model.findById(id);
      return unit;
    } catch (error) {
      throw error;
    }
  }
}

export default Db;
