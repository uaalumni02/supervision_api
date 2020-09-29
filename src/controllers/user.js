import Db from "../db/db";
import User from "../models/user";
import Token from "../helpers/jwt/token";
import bcrypt from "../helpers/bcrypt/bcrypt";
import validator from "../validator/user";
import Errors from "../helpers/constants/constants";
import * as Response from "../helpers/response/response";
import { checkAuth } from "../middleware/auth/auth";

class UserData {
  static async addUser(req, res) {
    const { username, password } = req.body;
    try {
      // const { error } = validator.validate(req.body);
      // if (error) {
      //   return Response.responseValidationError(res, Errors.VALIDATION);
      // }
      const user = await Db.findUser(User, username);
      if (user != null) {
        return Response.responseConflict(res, user);
      } else {
        const hash = await bcrypt.hashPassword(password, 10);
        const user = { ...req.body, password: hash };
        const { username, _id: userId, role, firstName, lastName, email } = await Db.saveUser(User, user);
        if (role == "standard") {
          const token = Token.sign({ username, userId, role });
          const userData = { username, userId, token, role, firstName, lastName, email  };
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

        const { _id: userId, username, firstName, lastName, email  } = user;
        const token = Token.sign({
          username,
          userId,
        });
        const userData = { username, userId, firstName, lastName, email, token};
        return Response.responseOkUserLoggedIn(res, userData);
      } else {
        return Response.responseInvalidCredentials(res);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getAllUsers(req, res) {
    try {
      const allUsers = await Db.getAllUsers(User);
      return Response.responseOk(res, allUsers);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const { error } = validator.validateAsync(id);
      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }
      const isAuthorized = checkAuth(req);
      if (isAuthorized) {
        const userToDelete = await Db.removeUser(User, id);
        return !userToDelete
          ? Response.responseNotFound(res, Errors.INVALID_USER)
          : Response.responseOk(res, userToDelete);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const { error } = validator.validateAsync(id);
      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }
      const userById = await Db.getUserById(User, id);
      return userById.length == 0
        ? Response.responseNotFound(res, Errors.INVALID_USER)
        : Response.responseOk(res, userById);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default UserData;
