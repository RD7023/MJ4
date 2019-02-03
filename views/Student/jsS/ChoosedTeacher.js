var teacherId = window.location.href.split("?")[1].split("=")[1]

console.log(teacherId);
var database = firebase.database();

database.ref('users/teachers/'+teacherId).once("value").then(function(snapshot){
  var teacherName = snapshot.val().name;
  var teacherNameElement = document.getElementById('teacherName');
  teacherNameElement.innerText = teacherName;
  var teacherRating = document.getElementById('rating');
  var teacherRatingVal = snapshot.val().rating.allTime.point;
  teacherRating.innerText = teacherRatingVal;

  var btnConfirm = document.getElementById('btnConfirm');
  btnConfirm.addEventListener('click',function(){
    var numbMark = document.getElementById('numbMark')
    var mark = numbMark.value;
    //Потрібно додати обмеження на величину оцінки 0<mark<5

    database.ref('users/teachers/'+teacherId+"/rating/current").transaction(function(actualCurrentObj){
      var newCurrentObj= {};
      if (actualCurrentObj){
      newCurrentObj.numberVoices = 1+parseInt(actualCurrentObj.numberVoices)
      newCurrentObj.numberStars = parseInt(mark)+parseInt(actualCurrentObj.numberStars)
      }
      else {
        newCurrentObj.numberVoices = 1
        newCurrentObj.numberStars = parseInt(mark)
      }
      return newCurrentObj;
    })
    database.ref('users/teachers/'+teacherId+"/rating/allTime").transaction(function(actualAllTimeObj){
      var newAllTimeObj= {};
      if (actualAllTimeObj){
      newAllTimeObj.numberVoices = 1+parseInt(actualAllTimeObj.numberVoices)
      newAllTimeObj.numberStars = parseInt(mark)+parseInt(actualAllTimeObj.numberStars)
      newAllTimeObj.point = newAllTimeObj.numberStars/newAllTimeObj.numberVoices;
      teacherRatingVal= newAllTimeObj.point;
      }
      else {
        newAllTimeObj.numberVoices = 1
        newAllTimeObj.numberStars = parseInt(mark)
        newAllTimeObj.point=parseInt(mark)
        teacherRatingVal= newAllTimeObj.point;
      }
      return newAllTimeObj;
    }).then(function(){
      teacherRating.innerText = teacherRatingVal;
    })

  })

})
