var department = decodeURIComponent(window.location.href.split("?")[1].split("&")[0].split("=")[1].replace("_"," "))
var speciality = decodeURIComponent(window.location.href.split("?")[1].split("&")[1].split("=")[1].replace("_"," "))
console.log(department);
console.log(speciality);
var database = firebase.database();
database.ref("departments/"+department+"/specialities/"+speciality+"/groups/list").once("value").then(function (snapshot) {
  // TODO: Create lists  of groups with the adding group
  var objGroups = snapshot.val();
  console.log(objGroups);
  div = document.getElementById('block')
  var br = document.createElement('br')

  for (var variable in objGroups) {
    if (objGroups.hasOwnProperty(variable)) {
      console.log(variable);

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
      window.location.assign('http://localhost:3000/ChoosedGroupD?department='+department+"&speciality="+speciality+"&group="+event.target.id)
    }
    event.stopPropagation();
  })
})
