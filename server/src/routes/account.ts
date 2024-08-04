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
accountRouter.get("/validate", accountMiddleware.validateCurrentUser);
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


accountRouter.post(
  "/add-address",
  authenticateToken,
  accountMiddleware.validateAddress,
  accountController.addAddress
);
accountRouter.get(
  "/get-addresses",
  authenticateToken,
  accountController.getAddresses
);
accountRouter.post(
  "/set-address-default",
  authenticateToken,
  accountController.setAddressAsDefault
);

accountRouter.get(
  "/get-address",
  authenticateToken,
  accountController.getAddress
);

accountRouter.patch(
  "/update-address",
  authenticateToken,
  accountController.updateAddress
);
accountRouter.delete(
  "/delete-address",
  authenticateToken,
  accountController.deleteAddress
);



accountRouter.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("refresh");
  res.status(200).send({ message: "Logged out successfully" });
});
export default accountRouter;
