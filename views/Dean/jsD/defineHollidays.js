function weeksBetween(d1, d2) {
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

var btnConfirm = document.getElementById('btnConfirm')
var lastEnd = document.getElementById('lastEnd')
var nextBeg = document.getElementById('nextBeg')

btnConfirm.addEventListener('click',function(){
  var lastEndVal = Date.parse(lastEnd.value);
  var nextBegVal = Date.parse(nextBeg.value);
  var weeks =Math.floor((nextBegVal-lastEndVal)/(7 * 24 * 60 * 60 * 1000));
  console.log(weeks);
  var database = firebase.database();
  database.ref('term').set({
    holidays:{
      lastEnd:lastEndVal,
      nextBeg:nextBegVal
    },
    weeks:weeks
  })
})
