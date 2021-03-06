import Joi from "@hapi/joi";

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

  static async findUser(model, username, email) {
    try {
      const user = await model.find({ $or: [{ username }, { email }] });
      return user[0];
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
    try {
      const filter = { _id: meetingId };
      const updatedMeeting = await model.findOneAndUpdate(filter, meetingData, {
        new: true,
      });
      return updatedMeeting;
    } catch (error) {
      throw error;
    }
  }
  static async findUserReset(model, email) {
    try {
      const user = await model.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async saveResetString(model, userToReset, reset_token, currentTime) {
    try {
      const filter = { _id: userToReset._id };
      const addResetString = await model.findOneAndUpdate(
        filter,
        { reset_token, currentTime },
        {
          new: true,
        }
      );
      return addResetString;
    } catch (error) {
      throw error;
    }
  }
  static async findUserByResetString(model, reset_token) {
    try {
      const user = await model.findOne({ reset_token });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async saveUpdatedPassword(model, userToReset, password, reset_token) {
    try {
      const filter = { _id: userToReset._id };
      const updatedPassword = await model.findOneAndUpdate(
        filter,
        { password, reset_token: null, currentTime: null },
        {
          new: true,
        }
      );
      return updatedPassword;
    } catch (error) {
      throw error;
    }
  }
  static async userResetStringToUpdate(model, reset_token) {
    try {
      const user = await model.findOne(reset_token);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getMeetingById(model, id) {
    try {
      const meeting = await model
        .findById(id)
        .populate("units supervisionType attendees creator")
        .exec();
      return meeting;
    } catch (error) {
      throw error;
    }
  }
  static async addApproval(model, data) {
    try {
      const approval = await model({ ...data });
      return approval.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllApprovals(model) {
    try {
      const allApprovals = await model
        .find({})
        .populate("userId meetingId")
        .exec();
      return allApprovals;
    } catch (error) {
      throw error;
    }
  }
  static async getApprovalById(model, id) {
    try {
      const approval = await model
        .findById(id)
        .populate("userId meetingId")
        .exec();
      return approval;
    } catch (error) {
      throw error;
    }
  }
}

export default Db;
