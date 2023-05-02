
//ボタン押下時の挙動
let btn = document.getElementById('btn');
btn.addEventListener('click',function(){
  const inputArea01 = document.getElementById('fullName');
  const inputArea02 = document.getElementById('inquiry');
  if (inputArea01.value === "") {
    alert("名前が入力されていません！");
  } else if (inputArea02.value === "") {
      alert("お問い合わせ内容が入力されていません！");
    } else {
      alert("投稿しました");
    }
  }
);