import express from "express";
import { CheckAuth } from "../middlewares/authMiddleware.js";
import {
  createNewPassword,
  createUser,
  getUserDetails,
  loginUser,
  loginWithGoogle,
  logouAll,
  logoutUser,
  sendOtp,
  verifyOtp,
} from "../controllers/userController.js";
import { authLimiter } from "../utils/limiter.js";
import { throttle } from "../utils/helpers.js";

const router = express.Router();

router.post("/user/register", authLimiter, throttle(1), createUser);

router.post("/user/login", authLimiter, throttle(1), loginUser);

router.get("/user/data", CheckAuth, getUserDetails);

router.post("/user/logout", logoutUser);

router.post(
  "/user/forgot/password",
  authLimiter,
  throttle(1),
  createNewPassword
);

router.post("/user/logout/all", CheckAuth, logouAll);

router.post("/user/send-otp", authLimiter, throttle(1), sendOtp);

router.post("/user/verify-otp", authLimiter, throttle(1), verifyOtp);

router.post("/user/google/login", authLimiter, throttle(1), loginWithGoogle);

export default router;
