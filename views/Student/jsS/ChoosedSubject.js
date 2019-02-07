document.getElementById("Announcements").style.display = "none";

//Отримуємо інформацію з стрічки запиту
var arrInfo = window.location.href.split("?")[1].split("&")

var subject = decodeURIComponent(arrInfo[0].split('=')[1])
var group = decodeURIComponent(arrInfo[1].split('=')[1])
var speciality = decodeURIComponent(arrInfo[2].split('=')[1])
var department = decodeURIComponent(arrInfo[3].split('=')[1])

var div = document.getElementById('Tasks')

var database = firebase.database()
database.ref('departments/'+department+"/specialities/"+speciality+"/groups/"+group+"/Subjects/"+subject+"/tasks").once('value').then(function(snapshot){
  var objTasks = snapshot.val()
  for (var key in objTasks) {
    if (objTasks.hasOwnProperty(key)) {
      var task = document.createElement('p')
      var textTask = document.createTextNode(key.replace("|"," ")+" | "+objTasks[key].title)
      task.setAttribute('id',key)
      task.appendChild(textTask)
      div.appendChild(task)
    }
  }
})

div.addEventListener('click',function(){
  if(event.currentTarget!==event.target){
    var taskId = event.target.id;
    location.assign('http://localhost:3000/ChoosedTask?taskId='+taskId+'&subject='+subject+'&group='+group+'&speciality='+speciality+'&department='+department)
  }
  event.stopPropagation()
})


var div2 = document.getElementById('Announcements')

var database = firebase.database()
database.ref('departments/'+department+"/specialities/"+speciality+"/groups/"+group+"/Subjects/"+subject+"/announcements").once('value').then(function(snapshot){
  var objAnn = snapshot.val()
  for (var key in objAnn) {
    if (objAnn.hasOwnProperty(key)) {
      var ann = document.createElement('p')
      var textAnn = document.createTextNode("| "+objAnn[key].title)
      var br = document.createElement('br')
      ann.setAttribute('id',key)
      ann.appendChild(textAnn)
      div2.appendChild(ann)
      div2.append(br)
    }
  }
})


div2.addEventListener('click',function(){
  if(event.currentTarget!==event.target){
    var annId = event.target.id;
    location.assign('http://localhost:3000/ChoosedAnn?annId='+annId+'&subject='+subject+'&group='+group+'&speciality='+speciality+'&department='+department)
  }
  event.stopPropagation()
})



const btnTasks = document.getElementById('btnTasks')
btnTasks.addEventListener('click',function(){
  document.getElementById("Announcements").style.display = "none";
  document.getElementById("Tasks").style.display ="block";
})


const btnAnnouncements = document.getElementById('btnAnnouncements')
btnAnnouncements.addEventListener('click',function(){
  document.getElementById("Tasks").style.display = "none";
  document.getElementById("Announcements").style.display = "block";
})

const btnMarks = document.getElementById('btnMarks')
btnMarks.addEventListener('click',function(){
  location.assign('http://localhost:3000/MarksS?subject='+subject)
})
