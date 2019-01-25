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
