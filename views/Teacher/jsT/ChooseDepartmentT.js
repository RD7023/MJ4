const auth = firebase.auth();

auth.onAuthStateChanged(function(user){
  if (user) {
    var userId = auth.currentUser.uid;
    var database = firebase.database();
    database.ref('users/teachers/'+userId+"/subjects").once("value").then(function(snapshot){
      var objSubjects = snapshot.val();
      console.log(objSubjects);
      let setDepartments = new Set();
      for (var key in objSubjects) {
        if (objSubjects.hasOwnProperty(key)) {
          var objGroups =objSubjects[key]["academicUnits"];
          console.log(objGroups);
          for (var key in objGroups) {
            if (objGroups.hasOwnProperty(key)) {
              setDepartments.add(key.split("|")[2])
            }
          }
        }
      }
      console.log(setDepartments);
      var divDepartments = document.getElementById('divDepartments')
      setDepartments.forEach((value, valueAgain, set) => {
        var btnElement = document.createElement('button')
        var btnText = document.createTextNode(value)
        btnElement.setAttribute("id",value)
        btnElement.appendChild(btnText)
        divDepartments.appendChild(btnElement)
      });
      divDepartments.addEventListener('click',function(){
        if(event.currentTarget!==event.target){
          window.location.assign("http://localhost:3000/RatingTeachersT?department="+event.target.id)
        }
          event.stopPropagation();
      })
    })

  }
  else {
    //
  }
})
