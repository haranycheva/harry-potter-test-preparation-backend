import express from "express";
import authControllers from "../controllers/auth-conrollers.js";
import { authorization, upload } from "../middleware/index.js";
import { validateBody } from "../decorators/index.js";
import {
  editUserSchema,
  signinValidationSchema,
  userValidationSchema,
} from "../schema/user-schema.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  upload.single("avatar"),
  validateBody(userValidationSchema),
  authControllers.signup
);

authRouter.post(
  "/signin",
  validateBody(signinValidationSchema),
  authControllers.signin
);

authRouter.get("/getInfo", authorization, authControllers.getInfo);

authRouter.post("/logout", authorization, authControllers.logout);

authRouter.put(
  "/",
  upload.single("avatar"),
  authorization,
  validateBody(editUserSchema),
  authControllers.redactUser
);

export default authRouter;
