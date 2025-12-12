import express from "express";
import {
  changeUserRole,
  deleteUserByAdmin,
  getAllUsers,
  hardDeleteUserByAdmin,
  logoutUserByAdmin,
  recoverUser,
} from "../controllers/adminController.js";
import {
  CheckAuth,
  isAdmin,
  isAdminOrManager,
  isOwner,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", CheckAuth, isAdminOrManager, getAllUsers);

router.post(
  "/admin/logout/user/:id",
  CheckAuth,
  isAdminOrManager,
  logoutUserByAdmin
);

router.delete("/admin/delete/user/:id", CheckAuth, isAdmin, deleteUserByAdmin);

router.delete(
  "/admin/hard/delete/user/:id",
  CheckAuth,
  isAdmin,
  hardDeleteUserByAdmin
);

router.patch("/admin/recover/user/:id", CheckAuth, isOwner, recoverUser);

router.patch(
  "/admin/change/role/user/:id",
  CheckAuth,
  isAdminOrManager,
  changeUserRole
);

export default router;
