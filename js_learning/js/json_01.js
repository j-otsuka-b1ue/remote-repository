
class Callapi {
  constructor(url) {
    this.url = url;
  }
  async getData (){
    const data = await fetch('https://dog.ceo/api/breeds/image/random')
    const res = await response.json();
  }
}
document.addEventListener('click', () => {
  //ここに取得してきた犬の画像を表示させるプログラムが必要なのですが、思いつきません…。
  //innerHTMLかもと思って調べたのですが、どのサイトにもローカルに保存してある画像ファイルを参照するやり方しか書いてありませんでした…。
})