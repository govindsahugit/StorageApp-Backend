import { model, Schema } from "mongoose";

const directorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
      default: 0,
    },
    path: [
      {
        type: Schema.Types.ObjectId,
        ref: "Directory",
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      select: "name email",
    },
    parentDirId: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "Directory",
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    strict: "throw",
    versionKey: false,
    timestamps: true,
  }
);

const Directory = model("Directory", directorySchema);

export default Directory;
