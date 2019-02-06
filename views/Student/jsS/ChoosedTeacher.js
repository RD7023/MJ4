//Отримуємо Id викладача через стрічку запиту
var teacherId = window.location.href.split("?")[1].split("&")[0].split("=")[1]
//Отримуємо факультет через стрічку запиту
var department = decodeURIComponent(window.location.href.split("?")[1].split("&")[1].split("=")[1].replace("_"," "))
console.log(department);
console.log(teacherId);
var database = firebase.database();

database.ref('users/teachers/'+teacherId).once("value").then(function(snapshot){
  var teacherName = snapshot.val().name;
  var teacherNameElement = document.getElementById('teacherName');
  teacherNameElement.innerText = teacherName;
  var teacherRating = document.getElementById('rating');
  if (snapshot.val().rating) {
    var teacherRatingVal = snapshot.val().rating.allTime.point;

  }else{
  var teacherRatingVal ="";
  }
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
      //збереження значення оцінки для запису в department->teachers
      newAllTimeObj.point = newAllTimeObj.numberStars/newAllTimeObj.numberVoices;
      mark = newAllTimeObj.point;
      teacherRatingVal= newAllTimeObj.point;
      }
      else {
        newAllTimeObj.numberVoices = 1
        newAllTimeObj.numberStars = parseInt(mark)
        newAllTimeObj.point=parseFloat(mark)
        //збереження значення оцінки для запису в department->teachers
        mark  = parseInt(mark)
        teacherRatingVal= newAllTimeObj.point;
      }
      return newAllTimeObj;
    }).then(function(){
      teacherRating.innerText = (Math.round(10*teacherRatingVal))/10;

      database.ref('departments/'+department+'/teachers/'+teacherName).update({

        allTimeRating:  mark*(-1)
      }).then(function() {
        console.log(23);
      })
    })

  })

})
