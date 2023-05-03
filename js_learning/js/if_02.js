let judge = document.getElementById('judge');
judge.addEventListener('click',function() {
  const score = document.getElementById('score');
  if(score.value < 59) {
    alert('あなたの成績は不可です');
  } else if(score.value >= 60 && score.value <= 69) {
    alert('あなたの成績は可です');
  } else if(score.value >= 70 && score.value <= 79) {
    alert('あなたの成績は良です');
  } else if(score.value >= 80 && score.value <= 89) {
    alert('あなたの成績は優です'); 
  } else {
    alert('あなたの成績は秀です');
  }
});