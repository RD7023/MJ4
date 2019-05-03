function numeratorConvertBoolToString(numerator) {
  if (numerator)
  {
    return "Numerator";
  }
  else
  {
    return "Denominator"
  }
}


var db = firebase.database();

var arrInfo = window.location.href.split("?")[1].split("&");
var faculty = decodeURIComponent(arrInfo[0].split('=')[1]);
var group = decodeURIComponent(arrInfo[1].split('=')[1]);

var date = new Date();
var day = date.getDay()


var numerator;

var currenPara;
//перша пара
var para1 = new Date()
para1.setHours(8)
para1.setMinutes(30)
//друга пара
var para2 = new Date()
para2.setHours(10)
para2.setMinutes(10)
//третя пара
var para3 = new Date()
para3.setHours(11)
para3.setMinutes(50)
//четверта пара
var para4 = new Date()
para4.setHours(13)
para4.setMinutes(30)
//пята пара
var para5 = new Date()
para5.setHours(15)
para5.setMinutes(5)
//шоста пара
var para6 = new Date()
para6.setHours(16)
para6.setMinutes(40)

db.ref('term').once('value',function(snapshot) {
  var termBeginning = snapshot.val().beginning;
  var firstNumerator = snapshot.val().firstNumerator;
  var milisecondsNow = date.getTime();

  var weeks = Math.floor((milisecondsNow-termBeginning)/604800000)

  if(weeks%2===0)
  {
    numerator =firstNumerator;
  }
  else
  {
    numerator =!firstNumerator;
  }
}).then(function(){
  if(date<para1){
    currentPara=-1;
    }
  else if (date<para2) {
    currentPara=0;
  }else if (date<para3) {
    currentPara=1;
  }else if (date<para4) {
    currentPara=2
  }else if (date<para5) {
    currentPara=3
  }else if (date<para6) {
    currentPara=4
  }else {
    currentPara=5
  }

  db.ref('faculties/'+faculty+'/groups/'+group+'/Schedule/'+day+"/"+numeratorConvertBoolToString(numerator)).once('value',function (snapshot) {
    var arrLessons = snapshot.val();
    console.log(arrLessons);
    console.log(currentPara);
    for (var i = 0; i < currentPara; i++) {
        console.log(arrLessons[i]);
    }
  })
})
