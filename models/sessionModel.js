import mongoose, { model } from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    expiry: {
      type: Number,
      default: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60,
    },
  },
  {
    versionKey: false,
    strict: "throw",
  }
);

const Session = model("Session", sessionSchema);

export default Session;
