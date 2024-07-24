import { Router } from "express";
import * as accountController from "../controllers/accounts";
import * as accountMiddleware from "../middlewares/account";
import { authenticateToken } from "../middlewares/cookie";

const accountRouter = Router();
accountRouter.post(
  "/register",
  accountMiddleware.validateRegister,
  accountController.registerUser
);

accountRouter.post(
  "/login",
  accountMiddleware.validateLogin,
  accountController.loginUser
);
accountRouter.get(
  "/user-basic-info",
  authenticateToken,
  accountController.getUserBasicInfo
);
accountRouter.get(
  "/user-info",
  authenticateToken,
  accountController.getUserInfo
);
accountRouter.patch(
  "/update-user-username",
  authenticateToken,
  accountController.updateUsername
);
accountRouter.patch(
  "/update-user-password",
  authenticateToken,
  accountController.updatePassword
);
accountRouter.patch(
  "/update-user-email",
  authenticateToken,
  accountController.updateEmail
);
accountRouter.patch(
  "/update-user-mobileNumber",
  authenticateToken,
  accountController.updateMobileNumber
);
accountRouter.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("refresh");
  res.status(200).send({ message: "Logged out successfully" });
});
export default accountRouter;
