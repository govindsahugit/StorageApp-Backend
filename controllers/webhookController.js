import Razorpay from "razorpay";
import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";
import { spawn } from "child_process";

export const PLANS = {
  plan_RpkRbZ15VUKwVv: {
    storageQuotaBytes: 2 * 1024 ** 3,
  },
  plan_RpkT5YPxO8Xepy: {
    storageQuotaBytes: 2 * 1024 ** 3,
  },
  plan_RpkUZZBhfeRzIu: {
    storageQuotaBytes: 5 * 1024 ** 3,
  },
  plan_RpkVvNRxSrioHR: {
    storageQuotaBytes: 5 * 1024 ** 3,
  },
  plan_RpkWmbpbzTwJ5a: {
    storageQuotaBytes: 10 * 1024 ** 3,
  },
  plan_RpkXniI9bBu7dG: {
    storageQuotaBytes: 10 * 1024 ** 3,
  },
};

export const handleRazorpayWebhook = async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  console.log(signature);
  const isSignatureValid = Razorpay.validateWebhookSignature(
    JSON.stringify(req.body),
    signature,
    process.env.RAZORPAY_WEBHOOK_SECRET
  );
  console.log(isSignatureValid);
  if (isSignatureValid) {
    if (req.body.event === "subscription.activated") {
      const rzpSubscription = req.body.payload.subscription.entity;
      const planId = rzpSubscription.plan_id;
      const subscription = await Subscription.findOne({
        razorpaySubscriptionId: rzpSubscription.id,
      });
      subscription.status = rzpSubscription.status;
      await subscription.save();
      const storageQuotaBytes = PLANS[planId].storageQuotaBytes;
      const user = await User.findById(subscription.userId);
      user.maxStorageInBytes = storageQuotaBytes;
      await user.save();
    }
  } else {
    console.log("Signature not verified");
  }
  res.end("OK");
};

export const handleGitHubWebhook = async((req, res, next) => {
  try {
    console.log(req.headers);
    console.log(req.body);

    res.end("OK");

    const bashChildProcess = spawn("bash", [
      "/home/ubuntu/deploy-frontend.mjs",
    ]);

    bashChildProcess.stdout.on("data", (data) => {
      process.stdout.write(data);
    });

    bashChildProcess.stderr.on("data", (data) => {
      process.stderr.write(data);
    });

    bashChildProcess.on("close", (code) => {
      if (code === 0) {
        console.log("Script executed successfully!");
      } else {
        console.log("Script execution failed!");
      }
    });

    bashChildProcess.on("error", (err) => {
      console.log("Error in spawning the process!");
      console.log(err);
    });
  } catch (error) {
    next(error);
  }
});
