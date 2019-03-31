firebase.auth().onAuthStateChanged(function(user){
  if(user){
  console.log(firebase.auth().currentUser.uid);
  }
  else{
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.replace("http://localhost:3000/login");
  }
})
const logoutBtn=document.getElementById('logoutBtn');

logoutBtn.addEventListener('click',function(){
  firebase.auth().signOut();
})


const btnAddStudent = document.getElementById('btnAddStudent');

btnAddStudent.addEventListener("click",function(){
    window.location.assign("http://localhost:3000/addStudent")
})


const btnAddTeacher = document.getElementById('btnAddTeacher');

btnAddTeacher.addEventListener("click",function(){
    window.location.assign("http://localhost:3000/addTeacher")
})


const btnFillSchedule = document.getElementById('btnFillSchedule')
btnFillSchedule.addEventListener("click",function(){
  window.location.assign("http://localhost:3000/fillSchedule")
})

const btnAddChair = document.getElementById("btnAddChair")

btnAddChair.addEventListener("click",function(){
  window.location.assign("http://localhost:3000/addChair")
})

const btnAddDepartment = document.getElementById("btnAddDepartment")

btnAddDepartment.addEventListener("click",function(){
  window.location.assign("http://localhost:3000/addDepartment")
})

const btnDefineSubjects = document.getElementById("btnDefineSubjects")

btnDefineSubjects.addEventListener("click",function(){
  window.location.assign("http://localhost:3000/defineSubjects")
})

const btnDefineTeachers = document.getElementById("btnDefineTeachers")

btnDefineTeachers.addEventListener("click",function(){
  window.location.assign("http://localhost:3000/defineTeachers")
})

const btnDefineHollidays = document.getElementById("btnDefineHollidays")

btnDefineHollidays.addEventListener("click",function(){
  window.location.assign("http://localhost:3000/defineHollidays")
})

const btnStudents = document.getElementById("btnStudentsD")

btnStudents.addEventListener("click",function(){
  window.location.assign("http://localhost:3000/StudentsD")
})
