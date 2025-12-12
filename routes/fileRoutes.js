import express from "express";
import { checkParams } from "../middlewares/validageParamsMiddleware.js";
import {
  createFile,
  deleteFile,
  readFile,
  renameFile,
} from "../controllers/fileController.js";
import { throttle } from "../utils/helpers.js";
import { renameLimiter } from "../utils/limiter.js";

const router = express.Router();

router.param("parentDirId", checkParams);
router.param("id", checkParams);

router.post("/{:parentDirId}", throttle(2), createFile);

router.get("/:id", readFile);

router.delete("/:id", deleteFile);

router.patch("/:id", renameLimiter, throttle(1), renameFile);

export default router;
