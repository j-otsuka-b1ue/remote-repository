import { rest } from "msw";
import { v4 as uuidv4 } from 'uuid';

let tempStorage = {
  email: "",
  password: "",
  nickname: "",
  representative_image: "",
  userId: "",
}

// 記事が作成された時点での情報の型定義
interface TempArticlePostStorage {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  nickname: string;
}

// 記事データを格納するための配列
let articles: TempArticlePostStorage[] = [];

// 記事一覧ページへのレスポンスデータの型定義
interface ArticleResponseData {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  from: number;
  to: number;
  data:
  {
    article_id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
  }[];
}

// https://mswjs.io/
// ここにinterface仕様書のAPIを作っていく
export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    const requestBody = req.body as {
      nickname: string,
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
      nickname: requestBody.nickname,
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
          nickname: requestBody.nickname,
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
          nickname: tempStorage.nickname,
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

  rest.put("/user/:userId", (req, res, ctx) => {
    const requestBody = req.body as {
      nickname: string | null,
      email: string | null,
      representative_image: string | null,
    }

    const { userId } = req.params;

    // ストレージに保存されているuserIdと一致した場合のみ更新処理を行う
    if (tempStorage.userId === userId) {
      tempStorage.email = requestBody.email ?? "";
      tempStorage.nickname = requestBody.nickname ?? "";
      tempStorage.representative_image = requestBody.representative_image ?? "";

      return res(
        ctx.status(200),
        ctx.json({
          email: tempStorage.email,
          nickname: tempStorage.nickname,
          representative_image: tempStorage.representative_image,
        })
      );
    } else {
      return res(
        ctx.status(500),
      )
    }
  }),
  rest.post("/articles", (req, res, ctx) => {

    const { title, content } = req.body as TempArticlePostStorage;

    // 新しい記事オブジェクトを作成
    const newArticle: TempArticlePostStorage = {
      id: articles.length + 1,
      title: title,
      content: content,
      created_at: new Date(),
      updated_at: new Date(),
      nickname: tempStorage.nickname,
    }

    // 記事を配列に追加
    articles.push(newArticle);

    // 生成されたidをレスポンスとしてクライアントに返す
    return res(
      ctx.status(200),
      ctx.json({
        article_id: newArticle.id,
      })
    )
  }),
  // 記事詳細取得API(指定されたidと合致する記事の情報をクライアント側に返す)
  rest.get("/articles/:article_id", (req, res, ctx) => {
    const articleId = parseInt(Array.isArray(req.params.article_id)
      ? req.params.article_id[0]
      : req.params.article_id, 10);

    const article = articles.find((article: TempArticlePostStorage) => article.id === articleId)

    if (article) {
      // 記事が見つかった場合、その記事データをレスポンスとして返す
      return res(
        ctx.status(200),
        ctx.json(article)
      );
    } else {
      return res(
        ctx.status(404),
      )
    }
  }),
  // 記事一覧取得API
  rest.get("/general/articles/lists", (req, res, ctx) => {
    // ページネーションのパラメータを取得
    const page = parseInt(req.url.searchParams.get("page") || "1", 10);
    const perPage = parseInt(req.url.searchParams.get("perPage") || "10", 10);

    // データの抽出とページネーションの処理を行う
    const startIndex = (page - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, articles.length);
    const paginatedArticles = articles.slice(startIndex, endIndex);

    const totalArticles = articles.length;
    const lastPage = Math.ceil(totalArticles / perPage);

    return res(
      ctx.status(200),
      ctx.json<ArticleResponseData>({
        total: articles.length,
        per_page: perPage,
        current_page: page,
        last_page: lastPage,
        first_page_url: `/articles?page=1`,
        last_page_url: `articles?page=${Math.ceil(articles.length / perPage)}`,
        next_page_url: page < Math.ceil(articles.length / perPage)
          ? `/articles?page=${page + 1}`
          : null,
        prev_page_url: page > 1 ? `/articles?page=${page - 1}` : null,
        path: "http://localhost:3000/general/articles/lists",
        from: startIndex + 1,
        to: endIndex,
        data: paginatedArticles.map(article => ({
          article_id: article.id,
          title: article.title,
          content: article.content,
          created_at: article.created_at,
          updated_at: article.updated_at,
        }))
      })
    )
  })
];
