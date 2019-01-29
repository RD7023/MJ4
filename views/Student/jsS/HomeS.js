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

const btnSchedule = document.getElementById('btnSchedule')

btnSchedule.addEventListener('click',function(){
  location.assign("http://localhost:3000/ScheduleChooseDay")
})
