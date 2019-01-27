var txtUserFirstName = document.getElementById('txtUserFirstName')
var txtUserLastName = document.getElementById('txtUserLastName')
var txtEmail = document.getElementById('txtEmail')
var txtPassword = document.getElementById('txtPassword')
var btnSubmit= document.getElementById('btnSubmit')
var txtNumberZ = document.getElementById('txtNumberZ')

btnSubmit.addEventListener("click",e=>{
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    var database =firebase.database();

    auth.createUserWithEmailAndPassword(email, pass).then(function () {
      const userId=auth.currentUser.uid;
      const userEmail = email;
      const userNumberZ = txtNumberZ.value;

      var userName = txtUserFirstName.value+" "+txtUserLastName.value;

      database.ref('notRegistratedStudents/'+userNumberZ).once('value').then(function(snapshot){
        academicUnit = snapshot.val()
      }).then(function(){
        database.ref('users/'+userId).set({
          name: userName,
          email: userEmail,
          numberZ: userNumberZ,
          department: academicUnit.department,
          speciality: academicUnit.speciality,
          group: academicUnit.group,
          type:"S"
        }).then(function(){
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              location.assign("http://localhost:3000/HomeS")
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
