import express from "express";
import {
  handleGitHubWebhook,
  handleRazorpayWebhook,
} from "../controllers/webhookController.js";

const router = express.Router();

router.post("/razorpay", handleRazorpayWebhook);

router.post("/razorpay", handleGitHubWebhook);

export default router;
