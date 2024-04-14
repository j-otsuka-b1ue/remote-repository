export const paths = {
  top: "/",
  form: "/form",
  blackJack: "/blackJack",
  general: "/general",

  mainRoutes: {
    toppage: "/general",
    loginform: "/general/Login",
    notfound: "/general/NotFound",
    registration: "/general/Registration",
    mypage: "/general/MyPage",
    updatememberinfo: "/general/UpdateMemberInfo"
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
