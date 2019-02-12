firebase.auth().onAuthStateChanged(function(user){
  if(user){
  console.log(firebase.auth().currentUser.uid);
  }
  else{
    location.replace("http://localhost:3000/login");
  }
})
var logoutBtn=document.getElementById('logoutBtn');

logoutBtn.addEventListener('click',function(){

  firebase.auth().signOut();
})

var btnSubjects = document.getElementById('btnSubjects')

btnSubjects.addEventListener('click',function(){
  document.location.assign("http://localhost:3000/SubjectsT")
})

var btnComments = document.getElementById('btnComments')

btnComments.addEventListener('click',function(){
  document.location.assign("http://localhost:3000/CommentsT")
})
