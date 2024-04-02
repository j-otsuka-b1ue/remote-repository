import { rest } from "msw";
import { v4 as uuidv4 } from 'uuid';

let tempStorage = {
  email: "",
  password: "",
  name: "",
  representative_image: "",
  userId: "",
}
// https://mswjs.io/
// ここにinterface仕様書のAPIを作っていく
export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    const requestBody = req.body as {
      name: string,
      email: string,
      password: string,
      password_confirmation: string,
      representative_image: string | null,
    };
    // ログイントークンとユーザーIDを生成する
    const accessToken = uuidv4(), userId = uuidv4();

    const getDate = new Date();

    const { email, password } = requestBody;

    // クライアント側から送られてきたログインIDとパスワードを一時的に保持
    tempStorage.email = email;
    tempStorage.password = password;

    tempStorage = {
      email: requestBody.email,
      password: requestBody.password,
      name: requestBody.name,
      representative_image: requestBody.representative_image ?? "",
      userId: userId,
    }
    
    return res(
      ctx.status(200),
      ctx.status(400),
      ctx.status(401),
      ctx.status(404),
      ctx.status(500),
      ctx.json({
        user: {
          user_id: userId,
          name: requestBody.name,
          email: requestBody.email,
          password: requestBody.password,
          representative_image: requestBody.representative_image,
          created_at: getDate,
          updated_at: getDate,
          deleted_at: null,
          token: accessToken,
        },
        loginResponseJSON: {
          email: tempStorage.email,
          password: tempStorage.password,
        },
      })
    );
  }),
  rest.get("/user/:userId", (req, res, ctx) => {
    // URLからuserIdを抽出
    const { userId } = req.params;

    // tempStorageに保存されているuserIdと比較
    if (tempStorage.userId === userId) {
      // 一致する場合はuserIdと紐付いているメールアドレスと名前をレスポンスとして返す
      return res(
        ctx.status(200),
        ctx.json({
          userId: tempStorage.userId,
          email: tempStorage.email,
          name: tempStorage.name,
          representative_image: tempStorage.representative_image,
        })
      );
    } else {
      return res(
        ctx.status(404),
      )
    }
  }),
  rest.post("/logout", (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),
  rest.get("/user", (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem("is-authenticated");
    if (!isAuthenticated) {
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
  rest.post("/user", (req, res, ctx) => {
    return res(
      ctx.status(201),
    );
  }),
];
