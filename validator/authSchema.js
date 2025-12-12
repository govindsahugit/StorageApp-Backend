import { z } from "zod/v4";

export const emailSchema = z.object({
  email: z.email("Please enter a valid email"),
});

export const otpSchema = z.object({
  otp: z
    .string("Please enter valid 4 digit OTP string")
    .max(4, "OTP should not be 4 digit long"),
});

export const loginSchema = emailSchema.extend({
  otp: otpSchema.shape.otp,
  password: z.string(),
});

export const registerSchema = loginSchema.extend({
  name: z
    .string()
    .min(3, "Name should be at least 3 characters long")
    .max(100, "Name should not be 100 characters long"),
});

export const newPassSchema = emailSchema.extend({
  newPassword: z.string(),
  otp: otpSchema.shape.otp,
});

export const verifyOtpSchema = emailSchema.extend({
  otp: otpSchema.shape.otp,
});

export const roleSchema = z.object({
  newRole: z.number(),
});
