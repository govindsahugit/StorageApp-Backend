import { Types } from "mongoose";

export const checkParams = (req, res, next, params) => {
  if (!Types.ObjectId.isValid(params))
    return res.status(400).json({
      error: "Invalid Params ID!",
    });
  next();
};
