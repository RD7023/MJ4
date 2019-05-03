var arrInfo = window.location.href.split("?")[1].split("&");

var faculty = decodeURIComponent(arrInfo[0].split('=')[1]);
var group = decodeURIComponent(arrInfo[1].split('=')[1]);
var teacher =decodeURIComponent(arrInfo[2].split('=')[1]);
var lesson = decodeURIComponent(arrInfo[3].split('=')[1]);

var btnConfirm = document.getElementById('confirm')

btnConfirm.addEventListener('click',function () {
  var rating = document.getElementById('rating').value;
  var db = firebase.database();

  db.ref('Teachers/'+teacher+"/rating/current").transaction(function(actualCurrentObj){
    var newCurrentObj= {};
    console.log(actualCurrentObj);
    if (actualCurrentObj){
    newCurrentObj.numberVoices = 1+parseInt(actualCurrentObj.numberVoices)
    newCurrentObj.numberStars = parseInt(rating)+parseInt(actualCurrentObj.numberStars)
    newCurrentObj.overAll = -newCurrentObj.numberStars/newCurrentObj.numberVoices

    }
    else {
      newCurrentObj.numberVoices = 1
      newCurrentObj.numberStars = parseInt(rating)
      newCurrentObj.overAll=-newCurrentObj.numberStars
    }
      return newCurrentObj;
    }

  ).then(function(){

      db.ref('faculties/'+faculty+"/Teachers/"+teacher+"/rating/current").transaction(function(actualCurrentObj){
        var newCurrentObj= {};
        console.log(actualCurrentObj);
        if (actualCurrentObj){
        newCurrentObj.numberVoices = 1+parseInt(actualCurrentObj.numberVoices)
        newCurrentObj.numberStars = parseInt(rating)+parseInt(actualCurrentObj.numberStars)
        newCurrentObj.overAll = -newCurrentObj.numberStars/newCurrentObj.numberVoices

        }
        else {
          newCurrentObj.numberVoices = 1
          newCurrentObj.numberStars = parseInt(rating)
          newCurrentObj.overAll=-newCurrentObj.numberStars
        }
          return newCurrentObj;
        }).then(function () {
          db.ref('faculties/'+faculty+"/groups/"+group +"/Teachers/"+teacher+"/rating/current").transaction(function(actualCurrentObj){
            var newCurrentObj= {};
            console.log(actualCurrentObj);
            if (actualCurrentObj){
            newCurrentObj.numberVoices = 1+parseInt(actualCurrentObj.numberVoices)
            newCurrentObj.numberStars = parseInt(rating)+parseInt(actualCurrentObj.numberStars)
            newCurrentObj.overAll = -newCurrentObj.numberStars/newCurrentObj.numberVoices

            }
            else {
              newCurrentObj.numberVoices = 1
              newCurrentObj.numberStars = parseInt(rating)
              newCurrentObj.overAll=-newCurrentObj.numberStars
            }
              return newCurrentObj;

        })

  })
})
})
