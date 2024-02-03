import { paths } from "../../utils/paths";
import { Link } from "react-router-dom";

export const General: React.FC = () => {
  return (
    <div className="App">
      <h1 className="font-bold text-red-300">ようこそReact総合課題へ！</h1>

      <div className="mb-3">
        <p>
          この課題ではReact.jsとTypeScriptを用いたブログサービスを作ってもらいます
        </p>
        <p>
          実装の一例として記事投稿画面は実装済みであり、他の画面をあなたが進めていくことになります。
          開発途中のPJに入ったつもりで頑張って進めてみましょう
        </p>
      </div>
      <p className="mb-2">
        ※この画面は最終的にtop画面になります。修正するタイミングで既存実装を削除してください
      </p>
      <nav className="leading-10">
        <li>
          <Link to={paths.article.add}>記事投稿画面</Link>
        </li>
        <li>
          <Link to={paths.articles.detail("hoge")}>記事詳細画面(ダミー)</Link>
        </li>
      </nav>
    </div>
  );
};
