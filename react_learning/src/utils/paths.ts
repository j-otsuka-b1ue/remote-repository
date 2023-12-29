export const paths = {
  top: "/",
  form: "/form",
  blackJack: "/blackJack",
  general: "/general",

  article: {
    add: "/general/articles/add",
    notfound: "/general/articles/NotFound",
    loginform: "/general/articles/Login",
    toppage: "/general/articles/TopPage",
  },
  articles: {
    index: "/general/articles",
    detail: (id: string) => `/general/articles/${id}`,
  },
};
