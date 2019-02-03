// var txtUserFirstName = document.getElementById('txtUserFirstName')
// var txtUserLastName = document.getElementById('txtUserLastName')
var txtEmail = document.getElementById('txtEmail')
var txtPassword = document.getElementById('txtPassword')
var btnSubmit= document.getElementById('btnSubmit')


btnSubmit.addEventListener("click",e=>{
    var email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    var database =firebase.database();


    database.ref('notRegistratedTeachers/'+email.replace('.',"(DOT)")).once('value').then(function(snapshot){
        var chair = snapshot.val().chair;
        var userName = snapshot.val().name;

        auth.createUserWithEmailAndPassword(email, pass).then(function () {
          userId=auth.currentUser.uid;
          userEmail = email;

          database.ref('users/'+'teachers/'+userId).set({

            name: userName,
            email: userEmail,
            chair: chair,
            type:"T"
          }).then(function(){


          database.ref('chairs/'+chair+'/teachers/'+userName).set({
            id:userId
          }).then(function () {

          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                location.assign("http://localhost:3000/HomeT")
               }
            })
          })


        });


        })
    })
  })
