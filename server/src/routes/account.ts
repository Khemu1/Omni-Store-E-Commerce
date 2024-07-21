import { Router } from "express";
import * as accountController from "../controllers/accounts";
import * as accountMiddleware from "../middlewares/account";
import { authenticateToken } from "../middlewares/cookie";
import bodyParser from "body-parser";

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
  "/user-info",
  authenticateToken,
  accountController.getUserInfo
);
export default accountRouter;
