
class Callapi {
  constructor(url) {
    this.url = url;
  }
  async getData (){
    const data = await fetch('https://dog.ceo/api/breeds/image/random');
    const res = await data.json();
  }
  displayDogimage () {
    const dogImage = document.createElement("img");
    document.body.appendChild(dogImage);
    dogImage.id = 'image';
    dogImage.src = 'https://dog.ceo/api/breeds/image/random';
  }
}
const clickGetData = document.getElementById('click');
display.addEventListener('click', () => {
  const getdata = new Callapi();
  const displaydogimage = new Callapi();
  getdata.getData();
  displaydogimage.displayDogimage();
}, false);