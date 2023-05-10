const judge = document.getElementById('judge');
const score = document.getElementById('score');
judge.addEventListener('click', judgeResult, false);
function judgeResult () {
  if (score.value === "") {
    result.innerHTML = "点数が入力されていません！";
  } else if (score.value < 59) {
    result.innerHTML = "あなたの成績は不可です";
  } else if (60 <= score.value && score.value <= 69) {
    result.innerHTML = "あなたの成績は可です";
  } else if (70 <= score.value && score.value <= 79) {
    result.innerHTML = "あなたの成績は良です";
  } else if (80 <= score.value && score.value <= 89) {
    result.innerHTML = "あなたの成績は優です";
  } else {
    result.innerHTML = "あなたの成績は秀です";
  }};