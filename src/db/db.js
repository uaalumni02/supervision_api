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

  static async findUser(model, username) {
    try {
      const user = await model.findOne({ username });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async saveUser(model, user) {
    try {
      const newUser = await model({ ...user });
      return newUser.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllUsers(model) {
    try {
      const allUsers = await model.find({});
      return allUsers;
    } catch (error) {
      throw error;
    }
  }
  static async removeUser(model, id) {
    try {
      const deleteUser = await model.findOneAndDelete({ _id: id });
      return {};
    } catch (error) {
      throw error;
    }
  }
}

export default Db;
