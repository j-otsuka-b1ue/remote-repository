class Callapi {
  constructor(url,times) {
    this.url = url;
    this.times = times;
  }
  async getData (){
    const data = await fetch(this.url + this.times);
    const res = await data.json();
    const dogImage = document.createElement("img");
    document.body.appendChild(dogImage);
    dogImage.src = res.message;
  }
}
const clickGetData = document.getElementById('click');
clickGetData.addEventListener('click', () => {
  const getdata = new Callapi('https://dog.ceo/api/breeds/image/random/', '3');
  getdata.getData();
}, false);