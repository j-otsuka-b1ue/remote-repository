export const paths = {
  top: "/",
  form: "/form",
  blackJack: "/blackJack",
  general: "/general",

  article: {
    add: "/general/article/add",
  },
  articles: {
    index: "/general/articles",
    detail: (id: string) => `/general/articles/${id}`,
  },
};
