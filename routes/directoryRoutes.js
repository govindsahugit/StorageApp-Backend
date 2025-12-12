import express from "express";
import { checkParams } from "../middlewares/validageParamsMiddleware.js";
import {
  createDirectory,
  deleteDirectory,
  readDirectory,
  renameDirectory,
} from "../controllers/directoryController.js";
import { renameLimiter } from "../utils/limiter.js";
import { throttle } from "../utils/helpers.js";

const router = express.Router();

router.param("parentDirId", checkParams);
router.param("id", checkParams);

router.post("/{:parentDirId}", createDirectory);

router.get("/{:id}", readDirectory);

router.patch("/:id", renameLimiter, throttle(1), renameDirectory);

router.delete("/:id", deleteDirectory);

export default router;
