import { paths } from "./utils/paths";
import { Link } from "react-router-dom";

// 開発環境の時だけmswのモックサーバーが動くようにしている
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

function App() {
  return (
    <div className="App">
      <h1 className="font-bold text-black-300 mb-9">ようこそReact課題へ！</h1>
      <nav className="leading-10">
        <li>
          <Link to={paths.form}>Reactフォーム課題</Link>
        </li>
        <li>
          <Link to={paths.blackJack}>Reactブラックジャック課題</Link>
        </li>
        <li>
          <Link to={paths.general}>React総合課題</Link>
        </li>
      </nav>
    </div>
  );
}

export default App;
