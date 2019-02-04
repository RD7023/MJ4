firebase.auth().onAuthStateChanged(function(user){
  if (user) {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref("users/students/"+userId).once("value").then(function(snapshot){
     if(snapshot.val()){
       //Студент є
       var department = snapshot.val().department;
       var speciality = snapshot.val().speciality;
       var group = snapshot.val().group;

       var btnTopTeachers = document.getElementById('btnTopTeachers')
       btnTopTeachers.addEventListener('click',function(){

         window.location.assign("http://localhost:3000/TopTeachers?"+department.replace(" ","_"))
       })

       firebase.database().ref("departments/"+department+"/specialities/"+speciality+"/groups/"+group+"/Teachers").once("value").then(function(snapshot){
         var teachersDiv = document.getElementById("Teachers");
         var counter = 0;
         for (var key in snapshot.val())
          {
            counter++;
            var button = document.createElement("button");
            var buttonText = document.createTextNode(key);
            button.appendChild(buttonText);
            button.setAttribute("id",snapshot.val()[key].id)


            var br = document.createElement("br")
            var teachersDiv = document.getElementById("Teachers");
            teachersDiv.appendChild(button)
            teachersDiv.appendChild(br)
          }

          //Для багатьох кнопок один обробник
        teachersDiv.addEventListener('click',function(event){
          if(event.currentTarget!==event.target)
          {
            console.log(event.target.id);
            department =department.replace(" ","_")
            window.location.assign('http://localhost:3000/ChoosedTeacher?teacherId='+event.target.id+'&department='+department.replace(" ","_"))
          }
          event.stopPropagation();
        })
       })
     }
    })
  }
})
