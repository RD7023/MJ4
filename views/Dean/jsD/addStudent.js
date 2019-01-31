




const txtNumberZ = document.getElementById('txtNumberZ');
const txtGroup = document.getElementById('txtGroup');
const txtSpeciality = document.getElementById('txtSpeciality');
const txtDepartment = document.getElementById('txtDepartment');
const btnConfirm = document.getElementById('btnConfirm')
console.log(23);
btnConfirm.addEventListener("click",function(){
  var database =firebase.database();
  console.log(23)

  var numberZ = txtNumberZ.value;
  var group = txtGroup.value;
  var speciality = txtSpeciality.value;
  var department = txtDepartment.value;

  database.ref('notRegistratedStudents/'+numberZ).set({
    group: group,
    speciality: speciality,
    department: department
  })
})
