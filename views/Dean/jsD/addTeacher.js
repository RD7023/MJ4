const txtChair = document.getElementById('txtChair');
const txtLastName = document.getElementById('txtLastName')
const txtFirstName = document.getElementById('txtFirstName')
const txtFatherName = document.getElementById('txtFatherName')
const txtEmail = document.getElementById('txtEmail')
const btnConfirm = document.getElementById('btnConfirm')

btnConfirm.addEventListener('click',function(){

  var database = firebase.database();

  var chair = txtChair.value;
  var lastName = txtLastName.value;
  var firstName = txtFirstName.value;
  var fatherName= txtFatherName.value;
  var email= txtEmail.value;

  email = email.replace(".","(DOT)")

  database.ref('notRegistratedTeachers/'+email).set({
    chair: chair,
    name: lastName + " " + firstName + " " +fatherName
  })
})
