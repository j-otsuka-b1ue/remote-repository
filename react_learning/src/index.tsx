import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { paths } from "./utils/paths";
import { FormPage } from "./pages/form/FormPage";
import { ArticlePostPage } from "./pages/general/articles/ArticlePostPage";
import { ArticleDetailPage } from "./pages/general/articles/ArticleDetailPage";
import { NotFound } from "./pages/general/articles/NotFoundPage";
import { Login } from "./pages/general/articles/LoginPage";
import { General } from "./pages/general/general";
import { Registration } from "./pages/general/articles/RegistrationPage";
import { MyPage } from "./pages/general/articles/MyPage";
import { Provider } from "react-redux";
import { UpdateMemberInfoPage } from "./pages/general/articles/UpdateMemberInfoPage";
import { ArticleShowListsPage } from "./pages/general/articles/ArticleShowListsPage";

import store from "./utils/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={paths.top} element={<App />} />
          <Route path={paths.form} element={<FormPage />} />
          <Route path={paths.article.post} element={<ArticlePostPage />} />
          <Route path={paths.mainRoutes.loginform} element={<Login />} />
          <Route path={paths.mainRoutes.toppage} element={<General />} />
          <Route path={paths.mainRoutes.registration} element={<Registration />} />
          <Route path={paths.article.detail + "/:articleId"} element={<ArticleDetailPage />} />
          <Route path={paths.mainRoutes.mypage} element={<MyPage />} />
          <Route path={paths.mainRoutes.updatememberinfo} element={<UpdateMemberInfoPage />} />
          <Route path={paths.articles.lists + "/:page"} element={<ArticleShowListsPage />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
