const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");


btnSignUp.addEventListener("click",function(){
  window.location.assign("http://localhost:3000/whoU");
})


btnLogin.addEventListener("click",function(){

  var email = txtEmail.value;
  var password= txtPassword.value;

  firebase.auth().signInWithEmailAndPassword(email,password)
})

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    var userId = firebase.auth().currentUser.uid;
    console.log(userId)
    firebase.database().ref('users/'+userId).once('value').then(function(snapshot){

      var type = snapshot.val().type;
      if (type=="S"){
        window.location.replace("http://localhost:3000/HomeS")
      }
      if (type=="T"){
        window.location.replace("http://localhost:3000/HomeT")
      }
      if (type=="D"){
        window.location.replace("http://localhost:3000/HomeD")
      }})
  }
})
