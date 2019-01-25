var txtUserFirstName = document.getElementById('txtUserFirstName')
var txtUserLastName = document.getElementById('txtUserLastName')
var txtEmail = document.getElementById('txtEmail')
var txtPassword = document.getElementById('txtPassword')
var btnSubmit= document.getElementById('btnSubmit')


btnSubmit.addEventListener("click",e=>{
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    var database =firebase.database();

    auth.createUserWithEmailAndPassword(email, pass).then(function () {
      userId=auth.currentUser.uid;
      userEmail = email;
      userName = txtUserFirstName.value+" "+txtUserLastName.value;

      database.ref('users/'+userId).set({
        name: userName,
        email: userEmail,
        type:"T"
      }).then(function(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         location.assign("http://localhost:3000/HomeT")
        }
      })});

})
})
