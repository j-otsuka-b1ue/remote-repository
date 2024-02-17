export const paths = {
  top: "/",
  form: "/form",
  blackJack: "/blackJack",
  general: "/general",

  mainRoutes: {
    toppage: "/general",
    loginform: "/general/Login",
    notfound: "/general/articles/NotFound",
    registration: "/general/Registration",
    mypage: "/general/MyPage",
    // 他のメインルート...
  },
  article: {
    add: "/general/articles/add",
  },
  articles: {
    index: "/general/articles",
    detail: (id: string) => `/general/articles/${id}`,
  },
};
