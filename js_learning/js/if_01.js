const btn = document.getElementById('btn');
const inputArea01 = document.getElementById('fullName');
const inputArea02 = document.getElementById('inquiry');
btn.addEventListener('click', clickEvent, false);
function clickEvent () {
  if (inputArea01.value === "") {
    errorCreate01.innerHTML = "名前が入力されていません";
  } else if (inputArea02.value === "") {
    errorCreate02.innerHTML = "お問い合わせ内容が入力されていません";
  } else {
    submitSuccess.innerHTML = "投稿しました";
  }
};