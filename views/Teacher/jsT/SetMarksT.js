//Отримуємо інформацію з стрічки запиту
var arrInfo = window.location.href.split("?")[1].split("&")
var subject = decodeURIComponent(arrInfo[0].split('=')[1])
var group = decodeURIComponent(arrInfo[1].split('=')[1])
var speciality = decodeURIComponent(arrInfo[2].split('=')[1])
var department = decodeURIComponent(arrInfo[3].split('=')[1])

var database = firebase.database()

database.ref('departments/'+department+"/specialities/"+speciality+"/groups/"+group+"/Subjects/"+subject+"/marksStructure").once('value').then(function(snapshot){
var obj=snapshot.val();
console.log(obj);
//модулі
var arrModules=obj.modules;
var divModules = document.getElementById('modules')
for (var i = 0; i < arrModules.length; i++) {
  var button = document.createElement('button')
  var j = i+1
  var buttonText = document.createTextNode("модуль "+j)
  button.appendChild(buttonText)
  button.setAttribute("id",i+"|"+arrModules[i])
  divModules.appendChild(button)
}

divModules.addEventListener('click',function(){
  if(event.currentTarget!==event.target)
  {


    var name = "модуль"
    var infoToSend = "modules|"+event.target.id;
    console.log(infoToSend)
    location.assign('http://localhost:3000/ChoosedTestT?infoToSend='+infoToSend+'&name='+name+"&subject="+subject+"&group="+group+"&speciality="+speciality+"&department="+department)
  }
})

//колоквіуми
var arrColloquiums=obj.colloquiums;
var divColloquiums = document.getElementById('colloquiums')
for (var i = 0; i < arrModules.length; i++) {
  var button = document.createElement('button')
  var j = i+1
  var buttonText = document.createTextNode("колоквіум "+j)
  button.appendChild(buttonText)
  button.setAttribute("id",i+'|'+arrColloquiums[i])
  divColloquiums.appendChild(button)
}

divColloquiums.addEventListener('click',function(){
  if(event.currentTarget!==event.target)
  {


    var name = "колоквіум"
    var infoToSend = "colloquiums|"+event.target.id;
    console.log(infoToSend)
    location.assign('http://localhost:3000/ChoosedTestT?infoToSend='+infoToSend+'&name='+name+"&subject="+subject+"&group="+group+"&speciality="+speciality+"&department="+department)
  }
})

//Екзамен
var exam=obj.exam;
var divExam = document.getElementById('exam')

var button = document.createElement('button')
var buttonText = document.createTextNode("екзамен")
button.appendChild(buttonText)
button.setAttribute("id",'exam')
divExam.appendChild(button)

divExam.addEventListener('click',function(){
  if(event.currentTarget!==event.target)
  {


    var name = "екзамен"
    var infoToSend = "exam|"
    console.log(infoToSend)
    location.assign('http://localhost:3000/ChoosedTestT?infoToSend='+infoToSend+'&name='+name+"&subject="+subject+"&group="+group+"&speciality="+speciality+"&department="+department)
  }
})
})
