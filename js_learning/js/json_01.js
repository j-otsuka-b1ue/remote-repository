
class Callapi {
  constructor(url) {
    this.url = url;
  }
  async getData (){
    const data = await fetch('https://dog.ceo/api/breeds/image/random');
    const res = await data.json();
    const dogImage = document.createElement("img");
    document.body.appendChild(dogImage);
    dogImage.id = 'image';
    dogImage.src = res.message;
  }
}
const clickGetData = document.getElementById('click');
display.addEventListener('click', () => {
  const getdata = new Callapi();
  getdata.getData();
}, false);