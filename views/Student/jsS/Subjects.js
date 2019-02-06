


var database = firebase.database();
const auth = firebase.auth();

auth.onAuthStateChanged(function(user){
  if(user){
    var userId = auth.currentUser.uid;

    //!!!!!!Якщо ми в майбутньому будемо мати department speciality group на HomeS сторінці то передамо інфу через query string
    var department;
    var speciality
    var group;
    database.ref("users/students/"+userId).once("value").then(function(snapshot){
      department = snapshot.val().department;
      speciality= snapshot.val().speciality;
      group= snapshot.val().group;

    }).then(function(){
      console.log(23)
      console.log(department);
      console.log(speciality)
      console.log(group)
      database.ref('departments/'+department+"/specialities/"+speciality+"/groups/"+group+"/SubjectsForSchedule/list").once('value').then(function(snapshot){
        console.log(23);
        objSubjects = snapshot.val();
        console.log(objSubjects);
        div = document.getElementById('block')
        for (var key in objSubjects) {
          if (objSubjects.hasOwnProperty(key)) {
            var btnSubject = document.createElement('button')
            var btnName = document.createTextNode(key)
            var br = document.createElement('br')
            btnSubject.appendChild(btnName);
            btnSubject.setAttribute("id",key)
            div.appendChild(btnSubject)
            div.appendChild(br)
          }

        }

      }).then(function(){

        div.addEventListener('click',function(){
          if(event.currentTarget!==event.target)
          {
            console.log(event.target.id);
            window.location.assign('http://localhost:3000/ChoosedSubject?subjectName='+event.target.id+'&group='+group+'&speciality='+speciality+'&department='+department)
          }
          event.stopPropagation();
        })
      })
    })

  }
})
// var userId = auth.currentUser.uid;
//
// //!!!!!!Якщо ми в майбутньому будемо мати department speciality group на HomeS сторінці то передамо інфу через query string
// var department;
// var speciality
// var group;
// database.ref("users/students/"+userId).once("value").then(function(snapshot){
//   deaprtment = snapshot.val().department;
//   speciality= snapshot.val().speciality;
//   group= snapshot.val().group;
//
// }).then(function(){
//   database.ref('departments/'+department+"/specialities/"+speciality+"/groups/"+group+"/SubjectsForChedule").on('child_added',function(snapshot){
//
//     console.log(snapshot.key);
//   })
// })
