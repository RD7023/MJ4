// var db = firebase.database();
// db.ref('users/students/'+firebase.auth().currentUser.uid).once("value",function(snapshot){
//   faculty = snapshot.val().faculty;
//   group = snapshot.val().group;
// }).then(function(){
//   const btnRate = document.getElementById('btnRate')
//   btnRate.addEventListener('click',function(){
//     location.assign("http://localhost:3000/ChooseLesson?faculty="+faculty+"&group="+group)
//   })
// })


firebase.auth().onAuthStateChanged(function(user){
  if(user){
    db = firebase.database();
    db.ref('users/students/'+firebase.auth().currentUser.uid).once("value",function(snapshot){
      faculty = snapshot.val().faculty;
      group = snapshot.val().group;
    }).then(function(){
      const btnRate = document.getElementById('btnRate')
      btnRate.addEventListener('click',function(){
        location.assign("http://localhost:3000/ChooseLesson?faculty="+faculty+"&group="+group)
      })
    })
  }
  else{
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.replace("http://localhost:3000/login");
  }
})
const logoutBtn=document.getElementById('logoutBtn');

logoutBtn.addEventListener('click',function(){

  firebase.auth().signOut();
})

// const btnSchedule = document.getElementById('btnSchedule')
//
// btnSchedule.addEventListener('click',function(){
//   location.assign("http://localhost:3000/ScheduleChooseDay")
// })





// const btnSubjects = document.getElementById('btnSubjects')
//
// btnSubjects.addEventListener('click',function(){
//   location.assign("http://localhost:3000/SubjectsS")
// })




var ref = firebase.database().ref('Teachers').orderByChild('rating/current/overAll').limitToFirst(10);
ref.on('value',function(snapshot){
  var obj = snapshot.val();
  console.log(obj);
})
