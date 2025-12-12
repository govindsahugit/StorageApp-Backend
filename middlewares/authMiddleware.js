import redisClient from "../config/redis.js";
import { getUserSessions } from "../utils/sessionUtils.js";

export const CheckAuth = async (req, res, next) => {
  const { sid } = req.signedCookies;

  if (!sid) {
    res.clearCookie("sid");
    return res.status(401).json({ error: "Not logged in!!" });
  }

  try {
    const session = await redisClient.json.get(`session:${sid}`);

    const sessions = await getUserSessions(session?.userId);
    if (sessions.length > 2) {
      await redisClient.del(sessions[0]);
    }

    if (!session?.userId)
      return res.status(401).json({ error: "Not logged in!" });

    req.user = {
      _id: session.userId,
      rootDirId: session.rootDirId,
      role: session.role,
    };
  } catch (error) {
    next(error);
  }
  next();
};

export const isAdminOrManager = async (req, res, next) => {
  const user = req.user;
  if (user.role !== 0) return next();
  res.status(403).json({
    error: "You do not have an access to manage users!",
  });
};

export const isOwner = async (req, res, next) => {
  const user = req.user;
  if (user.role !== 3)
    return res.status(403).json({
      error: "You do not have an access to perform owner operation!",
    });
  next();
};

export const isAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role < 2)
    return res.status(403).json({
      error: "You do not have an access to manage users!!",
    });

  next();
};

export const isOwnerOrAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role >= 2) return next();
  return res.status(401).json({
    error: "Unauthorized access!",
  });
};

export const isManager = async (req, res, next) => {
  const user = req.user;
  if (user.role !== 1)
    return res.status(403).json({
      error: "You do not have an access to manage users!",
    });
  next();
};
