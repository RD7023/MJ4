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

const btnSchedule = document.getElementById('btnSchedule')

btnSchedule.addEventListener('click',function(){
  location.assign("http://localhost:3000/ScheduleChooseDay")
})


const btnTeachers = document.getElementById('btnTeachers')

btnTeachers.addEventListener('click',function(){
  location.assign("http://localhost:3000/TeachersS")
})


const btnSubjects = document.getElementById('btnSubjects')

btnSubjects.addEventListener('click',function(){
  location.assign("http://localhost:3000/SubjectsS")
})
