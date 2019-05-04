const btnSend=document.getElementById('send')
const txtEmail = document.getElementById('email')
btnSend.addEventListener('click',function(){

  var email = txtEmail.value;
  firebase.auth().sendPasswordResetEmail(email).then(function(){
    alert("email was sent");
    window.location.assign("http://localhost:3000/login");
  })

})
