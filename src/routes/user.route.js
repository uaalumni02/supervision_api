import express from "express";
import checkAuth from "../middleware/check-auth";
import checkIsAdmin from "../middleware/check-isAdmin";

import userController from "../controllers/user";

const router = express.Router();

router.post("/login", userController.userLogin);

router
  .route("/")
  .post(userController.addUser)
  .get(checkAuth, checkIsAdmin, userController.getAllUsers);

router
  .route("/:id")
  .delete(checkAuth, checkIsAdmin, userController.deleteUser)
  .get(checkAuth, checkIsAdmin, userController.getUserById);

export default router;
