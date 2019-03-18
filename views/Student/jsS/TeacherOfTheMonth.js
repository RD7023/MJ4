//Отримуємо факультет з рядка запиту
var department  =  decodeURIComponent(window.location.href.split('?')[1]).replace("_"," ");

var database = firebase.database();
database.ref("departments/"+department+"/teacher of the month").once("value").then(function(snapshot) {
  var teacherId = snapshot.val().id;
  var teacherAllTimeRating = (-1)*snapshot.val().allTimeRating;
  database.ref("users/teachers/"+teacherId).once("value").then(function (snapshot2) {
    var teacherName = snapshot2.val().name;

    var div1 = document.getElementById('block1')
    p = document.createElement("p")
    text = document.createTextNode(teacherName)
    p.appendChild(text)
    div1.appendChild(p)

    var div2 = document.getElementById('block2')
    h2=document.createElement("h2")
    text = document.createTextNode("Рейтинг")
    h2.appendChild(text)
    p = document.createElement("p")
    text = document.createTextNode(Math.round(10*teacherAllTimeRating )/10)
    p.appendChild(text)
    div2.appendChild(h2)
    div2.appendChild(p)
  })
})
