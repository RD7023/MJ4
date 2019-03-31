var database = firebase.database();
database.ref("departments/list").once("value").then(function (snapshot) {

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
      div.appendChild(br)
    }
  }
}).then(function(){
  div.addEventListener('click',function(){
    if(event.currentTarget!==event.target)
    {
      console.log(event.target.id);
      window.location.assign('http://localhost:3000/ChoosedDepartmentD?department='+event.target.id)
    }
    event.stopPropagation();
  })
})
