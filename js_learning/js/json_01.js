
class Callapi {
  constructor(url) {
    this.url = url;
  }
  async getData (){
    const data = await fetch(this.url);
    const res = await data.json();
    const dogImage = document.createElement("img");
    document.body.appendChild(dogImage);
    dogImage.src = res.message;
  }
}
const clickGetData = document.getElementById('click');
display.addEventListener('click', () => {
  const getdata = new Callapi('https://dog.ceo/api/breeds/image/random');
  getdata.getData();
}, false);