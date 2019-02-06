const auth = firebase.auth();
var choosedSubject;
auth.onAuthStateChanged(function(user){
  if(user){
    var userId = auth.currentUser.uid;
    var database = firebase.database();
    database.ref("users/teachers/"+userId+"/subjects").once('value').then(function(snapshot){
      objSubjects = snapshot.val()
      div = document.getElementById('block')

      for (var key in objSubjects) {

            if (objSubjects.hasOwnProperty(key)) {
              var btnSubject = document.createElement('button')
              var btnName = document.createTextNode(key)
              var br = document.createElement('br')
              btnSubject.appendChild(btnName);
              btnSubject.setAttribute("id",key)
              btnSubject.setAttribute("class","subject")
              div.appendChild(btnSubject)
              div.appendChild(br)
            }
          }
        }
    ).then(function(){

      div.addEventListener('click',function(){
        if((event.currentTarget!==event.target)&&(event.target.className =="subject"))
        {
          console.log(event.target.id);
          choosedSubject=event.target.id
          objAcademicUnits = objSubjects[event.target.id]["academicUnits"]
          for (var key in objAcademicUnits) {
            if (objAcademicUnits.hasOwnProperty(key)) {
              var btnAcademicUnit = document.createElement('button')
              var btnName = document.createTextNode(key)
              var btnSubject = document.getElementById(event.target.id)
              btnAcademicUnit.appendChild(btnName);
              btnAcademicUnit.setAttribute("id",key)
              btnAcademicUnit.setAttribute("class","academicUnit")
              div.insertBefore(btnAcademicUnit,btnSubject.nextSibling)
            }
          }
        }
        if(event.currentTarget!==event.target && event.target.className =="academicUnit"){
          location.assign("http://localhost:3000/ChoosedSubjectT?choosedSubject="+choosedSubject+"&academicUnit="+event.target.id)
        }
        event.stopPropagation();
      })

    })
  }
})
