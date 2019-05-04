

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
const btnForgotPassword = document.getElementById('btnForgotPassword')

btnSignUp.addEventListener("click",function(){
  window.location.assign("http://localhost:3000/signUpD");
})

btnForgotPassword.addEventListener("click",function(){
  window.location.assign("http://localhost:3000/forgotPassword");
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
    firebase.database().ref('users/'+'students/'+userId).once('value').then(function(snapshot){
        if(snapshot.val())
        {
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
        else {

          firebase.database().ref('users/'+'teachers/'+userId).once('value').then(function(snapshot){

            if(snapshot.val())
            {
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
                window.location.replace("http://localhost:3000/HomeT")
              }).catch(function(error) {
                // Handle error
              });
            }
            else{
              firebase.database().ref('users/'+'deans/'+userId).once('value').then(function(snapshot){
                if(snapshot.val())
                {    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                      // Send token to your backend via HTTPS
                      // ...

                      document.cookie = "token="+idToken;
                      window.location.replace("http://localhost:3000/HomeD")
                    }).catch(function(error) {
                      // Handle error
                    });
                }
                })
            }
            })

        }


      })


      }
    })
