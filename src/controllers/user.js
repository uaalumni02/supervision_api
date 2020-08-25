import Db from "../db/db";
import User from "../models/user";
import Token from "../helpers/jwt/token";
import bcrypt from "../helpers/bcrypt/bcrypt";
import validator from "../validator/user";
import Errors from "../helpers/constants/constants";
import * as Response from "../helpers/response/response";


class UserData {
  static async addUser(req, res) {
    const { username, password, role } = req.body;
    try {
      const { error } = validator.validate(req.body);
      if (error) {
        return Response.responseValidationError(res, Errors.VALIDATION);
      }
      const user = await Db.findUser(User, username);
      if (user != null) {
        return Response.responseConflict(res, user);
      } else {
        const hash = await bcrypt.hashPassword(password, 10);
        const user = { ...req.body, password: hash };
        const { username, _id: userId, role } = await Db.saveUser(User, user);
        if (role == "admin" || role == "super admin") {
          const token = Token.sign({ username, userId, role });
          const userData = { username, userId, token, role };
          return Response.responseOkUserCreated(res, userData);
        }
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async userLogin(req, res) {
    const { username, password } = req.body;
    try {
      const { error } = validator.validate(req.body);
      if (error) {
        return Response.responseValidationError(res, Errors.VALIDATION);
      }
      const user = await Db.findUser(User, username);
      if (user == null) {
        return Response.responseBadAuth(res, user);
      }
      const isSamePassword = await bcrypt.comparePassword(
        password,
        user.password
      );
      if (isSamePassword && user.role) {
        const token = Token.sign({
          username: user.username,
          userId: user._id,
          role: user.role,
        });
        const userData = { user, token };
        return Response.responseOk(res, userData);
      } else {
        return Response.responseValidationError(res);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  // static async getAllUsers(req, res) {
  //   const userTypes = ['standard', 'admin', 'super admin'];
  //   try {
  //     const allUsers = await Db.getAllUsers(User);
  //     const adminStandardUsers = allUsers.filter(user => {
  //       return userTypes.includes(user.role) && user.username 
  //     })
  //     return Response.responseOk(res, adminStandardUsers);
  //   } catch (error) {
  //     return Response.responseNotFound(res);
  //   }
  // }
}

export default UserData;
