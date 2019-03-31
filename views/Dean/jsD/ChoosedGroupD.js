var department = decodeURIComponent(window.location.href.split("?")[1].split("&")[0].split("=")[1].replace("_"," "))
var speciality = decodeURIComponent(window.location.href.split("?")[1].split("&")[1].split("=")[1].replace("_"," "))
var group = decodeURIComponent(window.location.href.split("?")[1].split("&")[2].split("=")[1].replace("_"," "))
console.log(group);
var database = firebase.database();
database.ref("departments/"+department+"/specialities/"+speciality+"/groups/"+group+"/Students").once("value").then(function(snapshot){
  var objStudents = snapshot.val();

  div = document.getElementById('block')
  var br = document.createElement('br')

  for (var variable in objStudents) {
    if (objStudents.hasOwnProperty(variable)) {
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
})
