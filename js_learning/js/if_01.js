const btn = document.getElementById('btn');
const inputArea01 = document.getElementById('fullName');
const inputArea02 = document.getElementById('inquiry');
const clickSubmit = () => {
  submitSuccess.innerHTML = "";
  errorCreate01.innerHTML = "";
  errorCreate02.innerHTML = "";
  if (inputArea01.value === "" && inputArea02.value === "") {
    errorCreate01.innerHTML = "名前が入力されていません";
    errorCreate02.innerHTML = "お問い合わせ内容が入力されていません";
  } else if (inputArea01.value === "") {
    errorCreate01.innerHTML = "名前が入力されていません";
  } else if (inputArea02.value === "") {
    errorCreate02.innerHTML = "お問い合わせ内容が入力されていません";
  } else {
    submitSuccess.innerHTML = "投稿しました";
  }
  fullName.value = "";
  inquiry.value = "";
};
btn.addEventListener('click', clickSubmit, false);