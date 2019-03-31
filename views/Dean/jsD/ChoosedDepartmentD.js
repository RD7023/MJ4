var database = firebase.database();
var department = decodeURIComponent(window.location.href.split("?")[1].split("=")[1].replace("_"," "))
console.log(department);
database.ref("departments/"+department+"/specialities/list").once("value").then(function (snapshot) {
// TODO: Create lists  of specialities with the adding speciality
  var objDepartments = snapshot.val()
  console.log(objDepartments);
  div = document.getElementById('block')
  var br = document.createElement('br')
  for (var variable in objDepartments) {
    if (objDepartments.hasOwnProperty(variable)) {
      var btnDepartment=document.createElement("button")
      var btnText=document.createTextNode(variable)
      btnDepartment.appendChild(btnText)
      btnDepartment.setAttribute("id",variable)
      div.appendChild(btnDepartment)
      var br = document.createElement('br')
      div.appendChild(br)
    }
  }
}).then(function(){
  div.addEventListener('click',function(){
    if(event.currentTarget!==event.target)
    {
      console.log(event.target.id);
      window.location.assign('http://localhost:3000/ChoosedSpecialityD?department='+department+"&speciality="+event.target.id)
    }
    event.stopPropagation();
  })
})
