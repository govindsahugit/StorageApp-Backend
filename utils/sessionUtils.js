import redisClient from "../config/redis.js";

export const setSession = async (user) => {
  const sessionId = crypto.randomUUID();
  const sessionKey = `session:${sessionId}`;

  await redisClient.json.set(sessionKey, "$", {
    userId: user._id,
    rootDirId: user.rootDirId,
    role: user.role,
  });

  await redisClient.expire(sessionKey, 60 * 60 * 24 * 7);

  return { sessionId };
};

export const getUserSessions = async (userId) => {
  const sessionKeys = [];
  const { total, documents: sessions } = await redisClient.ft.search(
    "userIdIdx",
    `@userId:{${userId}}`,
    {
      RETURN: [],
    }
  );
  sessions.forEach((session) => sessionKeys.push(session.id));

  return { total, sessionKeys, sessions };
};

export const deleteUserSessions = async (userId) => {
  const { sessionKeys } = await getUserSessions(userId);
  if (sessionKeys.length) await redisClient.del(sessionKeys);
  return { keys: { ...sessionKeys } };
};
