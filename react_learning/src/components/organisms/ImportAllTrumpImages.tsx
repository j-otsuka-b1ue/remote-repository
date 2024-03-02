// すべての画像をimportする
function importAllImages(r: __WebpackModuleApi.RequireContext): { [key: string]: string}  {
  let images: { [key: string]: string} = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item).default;
  });
  return images;
}

const images = importAllImages(require.context('../../images/trump_cards', false, /\.(png)$/));

// ディレクトリ内の画像をすべて読み込む
export const ReturnImages = () => {
  return (
    <div>
      {Object.keys(images).map((key, index) => (
        <img key={index} src={images[key]} alt={`Card ${key}`} />
      ))}
    </div>
  );
}