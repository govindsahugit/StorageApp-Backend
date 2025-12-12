import { model, Schema } from "mongoose";

const otSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

const OTP = model("OTP", otSchema);

export default OTP;
