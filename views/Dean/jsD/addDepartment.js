var database = firebase.database()
var txtDepartment = document.getElementById('txtDepartment');
var btnConfirm = document.getElementById('btnConfirm');

btnConfirm.addEventListener("click",function(){
  var department = txtDepartment.value;
  database.ref("departments/list").update(
    {
      [department]: true
    }
  )
})
