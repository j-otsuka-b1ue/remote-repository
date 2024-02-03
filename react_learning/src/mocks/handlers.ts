import { rest } from "msw";
import { v4 as uuidv4 } from 'uuid';

// https://mswjs.io/
// ここにinterface仕様書のAPIを作っていく
export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    const loginToken = uuidv4();
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({ access_token: loginToken })
    );
  }),
  rest.post("/logout", (req, res, ctx) => {
    // ユーザーの認証をセッションから削除
    sessionStorage.setItem("is-authenticated", "false");
    return res(
      ctx.status(200)
    );
  }),
  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
];
