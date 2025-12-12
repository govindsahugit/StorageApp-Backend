import express from "express";
import { isOwner, isOwnerOrAdmin } from "../middlewares/authMiddleware.js";
import {
  createUserDir,
  deleteUserDir,
  readUserDirData,
  renameUserDir,
} from "../controllers/adminUserDirectoryController.js";
import { renameLimiter } from "../utils/limiter.js";
import { throttle } from "../utils/helpers.js";

const router = express.Router();

router.get("/get/user/data/:id", isOwnerOrAdmin, readUserDirData);

router.post("/create/user/dir/{:parentDirId}", isOwner, createUserDir);

router.patch(
  "/rename/user/dir/:id",
  renameLimiter,
  throttle(1),
  isOwner,
  renameUserDir
);

router.delete("/delete/user/dir/:id", isOwner, deleteUserDir);

export default router;
