//Отримуємо інформацію з стрічки запиту
var arrInfo = window.location.href.split("?")[1].split("&")
var testInfo = decodeURIComponent(arrInfo[0].split('=')[1])
var subject = decodeURIComponent(arrInfo[2].split('=')[1])
var group = decodeURIComponent(arrInfo[3].split('=')[1])
var speciality = decodeURIComponent(arrInfo[4].split('=')[1])
var department = decodeURIComponent(arrInfo[5].split('=')[1])

var testType = decodeURIComponent(testInfo.split('|')[0])
var testIndex = decodeURIComponent(testInfo.split('|')[1])
var testMaxMark = decodeURIComponent(testInfo.split('|')[2])


var database = firebase.database()
database.ref("departments/"+department+"/specialities/"+speciality+"/groups/"+group+"/Students").once('value').then(function(snapshot){

  var objStudents = snapshot.val();
  var div = document.getElementById('students')

  for (var key in objStudents) {
    if (objStudents.hasOwnProperty(key)) {
      var buttonStudent = document.createElement('button')
      var textStudent = document.createTextNode(key)
      buttonStudent.appendChild(textStudent)
      var inputMark = document.createElement('input')
      inputMark.setAttribute('id',key)
      var br = document.createElement('br')

      div.appendChild(buttonStudent)
      div.appendChild(inputMark)
      div.appendChild(br)

    }
  }
  var btnSubmit = document.createElement('button')
  var textSubmit = document.createTextNode('Підтвердити')
  btnSubmit.appendChild(textSubmit)
  btnSubmit.setAttribute('id',"confirm")
  var br = document.createElement('br')
  div.appendChild(br)
  div.appendChild(btnSubmit)

  btnSubmit.addEventListener('click',function(){
    for (var key in objStudents) {
      if (objStudents.hasOwnProperty(key)) {

        var markElement = document.getElementById(key);
        var mark = markElement.value;
        var studentId = objStudents[key].id;
        database.ref('users/students/'+studentId+'/subjects/'+subject+'/marks/'+testType+"/"+testIndex).set({
          studentPoint:mark
        })

      }
    }
  })
})
