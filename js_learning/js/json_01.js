
class Callapi {
  constructor(url) {
    this.url = url;
  }
  async getData (){
    const data = await fetch(this.url);
    //インスタンス化した際の引数部分にURLを渡して、
    //そのURLを使ってfetchが出来るようにプログラムを組むってことだと思うんですが、
    //this.url がインスタンス化された際、引数部分のURLが代入され、
    //それをfetch出来るようにthis.urlとしてみたのですがエラーが出てしまいます。
    const res = await data.json();
    const dogImage = document.createElement("img");
    document.body.appendChild(dogImage);
    dogImage.src = res.message;
  }
}
const url1 = new URL('https://dog.ceo/api/breeds/image/random');
const clickGetData = document.getElementById('click');
display.addEventListener('click', () => {
  const getdata = new Callapi();
  getdata.getData();
}, false);