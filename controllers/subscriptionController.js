import rzpInstance from "../config/razorpay.js";
import Subscription from "../models/subscriptionModel.js";

export const createSubscription = async (req, res, next) => {
  try {
    const newSubscription = await rzpInstance.subscriptions.create({
      plan_id: req.body.planId,
      total_count: 120,
    });

    const subscription = new Subscription({
      razorpaySubscriptionId: newSubscription.id,
      userId: req.user._id,
    });

    await subscription.save();

    return res.status(201).json({ subscriptionId: newSubscription.id });
  } catch (error) {
    next(error);
  }
};
