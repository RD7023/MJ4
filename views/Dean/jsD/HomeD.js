firebase.auth().onAuthStateChanged(function(user){
  if(user){
  console.log(firebase.auth().currentUser.uid);
  }
  else{
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


const btnDefineSubjects = document.getElementById("btnDefineSubjects")

btnDefineSubjects.addEventListener("click",function(){
  window.location.assign("http://localhost:3000/defineSubjects")
})
