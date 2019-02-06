//Отримуємо інформацію з стрічки запиту
var arrInfo = window.location.href.split("?")[1].split("&")
var annId = decodeURIComponent(arrInfo[0].split('=')[1])
var subject = decodeURIComponent(arrInfo[1].split('=')[1])
var group = decodeURIComponent(arrInfo[2].split('=')[1])
var speciality = decodeURIComponent(arrInfo[3].split('=')[1])
var department = decodeURIComponent(arrInfo[4].split('=')[1])

var body = document.getElementsByTagName('body')[0]
var titleElement = document.getElementById('title')
var textElement = document.getElementById('text')


var database = firebase.database();

database.ref('departments/'+department+"/specialities/"+speciality+"/groups/"+group+"/Subjects/"+subject+"/announcements/"+annId).once('value').then(function(snapshot){
  var objTask = snapshot.val()
  var title = objTask.title;
  var text = objTask.text;

  titleElement.innerHTML = title
  textElement.innerHTML = text
})
