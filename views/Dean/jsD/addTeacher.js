const txtDepartment = document.getElementById('txtDepartment');
const txtLastName = document.getElementById('txtLastName')
const txtFirstName = document.getElementById('txtFirstName')
const txtFatherName = document.getElementById('txtFatherName')
const txtEmail = document.getElementById('txtEmail')
const btnConfirm = document.getElementById('btnConfirm')

btnConfirm.addEventListener('click',function(){

  var database = firebase.database();

  var department = txtDepartment.value;
  var lastName = txtLastName.value;
  var firstName = txtFirstName.value;
  var fatherName= txtFatherName.value;
  var email= txtEmail.value;

  email = email.replace(".","(DOT)")

  database.ref('notRegistratedTeachers/'+email).set({
    department: department,
    name: lastName + " " + firstName + " " +fatherName
  })
})
