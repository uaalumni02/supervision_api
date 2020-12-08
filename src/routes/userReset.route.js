import express from "express";
import checkAuth from "../middleware/check-auth";
import checkIsAdmin from "../middleware/check-isAdmin";

import userController from "../controllers/user";

const router = express.Router();

router.route("/").post(userController.userPasswordReset);

// router
//   .route("/:id")
//   .patch( userController.userPasswordReset)

export default router;
