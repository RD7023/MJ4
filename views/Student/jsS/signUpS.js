// var txtUserFirstName = document.getElementById('txtUserFirstName')
// var txtUserLastName = document.getElementById('txtUserLastName')
var txtEmail = document.getElementById('txtEmail')
var txtPassword = document.getElementById('txtPassword')
var txtFaculty = document.getElementById('txtFaculty')
var txtGroup = document.getElementById('txtGroup')
var btnSubmit= document.getElementById('btnSubmit')
// var txtNumberZ = document.getElementById('txtNumberZ')

btnSubmit.addEventListener("click",e=>{
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    var faculty = txtFaculty.value;
    var group = txtGroup.value;

    var database =firebase.database();

    auth.createUserWithEmailAndPassword(email, pass).then(function () {
      const userId=auth.currentUser.uid;
      const userEmail = email;
      // const userNumberZ = txtNumberZ.value;

      // var userName = txtUserFirstName.value+" "+txtUserLastName.value;


        database.ref('users/'+"students/"+userId).set({
          email: userEmail,
          // numberZ: userNumberZ,
          // department: academicUnit.department,
          faculty: faculty,
          group: group,
          type:"S"
        }).then(function(){
          database.ref("faculties/"+faculty+"/groups/"+group+"/Students/"+userId).set({
            email: userEmail
          }).then(function(){
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                  // Send token to your backend via HTTPS
                  // ...

                  document.cookie = "token="+idToken;

                  // let token = JSON.stringify({ token: idToken});
                  // let request = new XMLHttpRequest();
                  // request.open("GET", "/HomeS", true);
                  // request.setRequestHeader("Content-Type", "application/json");
                  // console.log(idToken);
                  // request.send(token);
                  window.location.replace("http://localhost:3000/HomeS")
                }).catch(function(error) {
                  // Handle error
                });
              }
            })
          })
      })

})
})

//
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     location.assign("http://localhost:3000/HomeS")
//   }
// })
