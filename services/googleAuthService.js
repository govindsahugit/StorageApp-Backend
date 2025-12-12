import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
});

export const verifyToken = async (idToken) => {
  const loginTicket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_AUTH_CLIENT_ID,
  });

  const userData = loginTicket.getPayload();
  return userData;
};
