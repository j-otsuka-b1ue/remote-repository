const participant =[
  {name:'taro',age:15,address:'東京都千代田区'},
  {name:'hanako',age:18,address:'東京都杉並区'},
  {name:'john',age:25,address:'東京都渋谷区'},
  {name:'mac',age:30,address:'東京都新宿区'},
  {name:'post',age:40,address:'東京都足立区'},
  {name:'malone',age:28,address:'東京都品川区'},
  {name:'lil',age:34,address:'広島県広島市'},
  {name:'peep',age:33,address:'埼玉県大宮'},
  {name:'curt',age:29,address:'北海道札幌市'},
 ];
const btn = document.getElementById('btn');
const tableElem = document.getElementById('sample-table');
const tbodyElem = tableElem.createTBody();
const clickDisplayTable = () => {
  for(let i = 0;i < participant.length;i++){
    const trElem = tbodyElem.insertRow(-1);
    const tdNumber = trElem.insertCell(-1);
    tdNumber.appendChild(document.createTextNode(i+1));
    const tdName = trElem.insertCell(-1);
    tdName.appendChild(document.createTextNode(participant[i].name));
    const tdAge = trElem.insertCell(-1);
    tdAge.appendChild(document.createTextNode(participant[i].age));
    const tdAddress = trElem.insertCell(-1);
    tdAddress.appendChild(document.createTextNode(participant[i].address));
  }
  btn.remove();
 };
 btn.addEventListener('click', clickDisplayTable, false);