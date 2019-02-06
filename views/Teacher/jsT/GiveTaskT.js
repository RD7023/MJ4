var arrQueryInfo = window.location.href.split("?")[1].split("&")
var subject = decodeURIComponent(arrQueryInfo[0].split("=")[1])
var group = decodeURIComponent(arrQueryInfo[1].split("=")[1])
var speciality = decodeURIComponent(arrQueryInfo[2].split("=")[1])
var department = decodeURIComponent(arrQueryInfo[3].split("=")[1])


const btnSend = document.getElementById('btnSend')

btnSend.addEventListener('click',function(){
  var title = document.getElementById('title').value;
  var text = document.getElementById('text').value;
  var deadline = document.getElementById('deadline').value;
  var database = firebase.database();
  database.ref("departments/"+department+"/specialities/"+speciality+"/groups/"+group+"/Subjects/"+subject+"/tasks/"+deadline).set({
    title:title,
    text:text
  })
})
