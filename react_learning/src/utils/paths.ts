export const paths = {
  top: "/",
  form: "/form",
  blackJack: "/blackJack",
  general: "/general",

  article: {
    add: "/general/articles/add",
    notfound: "/general/articles/NotFound"
  },
  articles: {
    index: "/general/articles",
    detail: (id: string) => `/general/articles/${id}`,
  },
};
