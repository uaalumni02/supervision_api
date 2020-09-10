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
  static async getUserById(model, id) {
    try {
      const user = await model.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async addMeeting(model, data) {
    try {
      const newMeeting = await model({ ...data });
      return newMeeting.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllMeetings(model) {
    try {
      const allMeetings = await model.find({});
      return allMeetings;
    } catch (error) {
      throw error;
    }
  }
  static async getsupervisionByAttendee(model, attendees) {
    try {
      const supervison = await model
        .find({ attendees })
        .populate("units supervisionType attendees")
        .exec();
      return supervison;
    } catch (error) {
      throw error;
    }
  }
  static async removeMeeting(model, id) {
    try {
      const deleteMeeting = await model.findOneAndDelete({ _id: id });
      return {};
    } catch (error) {
      throw error;
    }
  }
  static async updateMeeting(model, meetingId, meetingData) {
    console.log("-----------> body",meetingData)
    try {
      const filter = { _id: meetingId };
      const updatedMeeting = await model.findOneAndUpdate(filter, meetingData, {
        new: true,
      });
      console.log("--->updated data",updatedMeeting)
      return updatedMeeting;
    } catch (error) {
      throw error;
    }
  }
}

export default Db;
