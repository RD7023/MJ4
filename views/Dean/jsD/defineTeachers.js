const txtDepartment = document.getElementById('txtDepartment')
const txtSpeciality = document.getElementById('txtSpeciality')
const txtGroup = document.getElementById('txtGroup')
const txtSubject = document.getElementById('txtSubject')
const txtLecturesTeacher = document.getElementById('txtLecturesTeacher')
const txtPracticesTeacher = document.getElementById('txtPracticesTeacher')
const btnAddTeachers = document.getElementById('btnAddTeachers')

btnAddTeachers.addEventListener('click',function(){

  var department = txtDepartment.value
  var speciality= txtSpeciality.value
  var group= txtGroup.value
  var subject= txtSubject.value
  var lecturesTeacher= txtLecturesTeacher.value
  var practicesTeacher= txtPracticesTeacher.value

  var database = firebase.database();
  database.ref('departments/'+department+"/"+speciality+"/"+group+"/Subjects/list/"+subject+"/teachers").set({
    lecturesTeacher:lecturesTeacher,
    practicesTeacher: practicesTeacher
  }).then(function(){
    txtSubject.value = "";
    txtLecturesTeacher.value = "";
    txtPracticesTeacher.value = "";
    var chair;

    database.ref('departments/'+department+"/"+speciality+"/"+group+"/Subjects/list/"+subject).once('value').then(function(snapshot){
      chair = snapshot.val().chair
      console.log(chair);
    }).then(function(){

      var lecturesTeacherId;
      var practicesTeacherId;

      database.ref('chairs/'+chair+"/teachers/"+lecturesTeacher).once('value').then(function(snapshot){
        lecturesTeacherId = snapshot.val().id
      }).then(function(){
        console.log(lecturesTeacherId);
        academicUnit = group+"|"+speciality+"|"+department;
        database.ref('users/teachers/'+lecturesTeacherId+"/subjects/"+subject+"/academicUnits").set({
          [academicUnit]:true
        }).then(function(){
          database.ref('departments/'+department+"/"+speciality+"/"+group+"/Teachers/"+lecturesTeacher).set({
              id:lecturesTeacherId
          })
        })
      })

      if (practicesTeacher!=lecturesTeacher){
          database.ref('chairs/'+chair+"/teachers/"+practicesTeacher).once('value').then(function(snapshot){
            practicesTeacherId = snapshot.val().id
          }).then(function(){
            academicUnit = group+"|"+speciality+"|"+department;
            database.ref('users/teachers/'+practicesTeacherId+"/subjects/"+subject+"/academicUnits").set({
              [academicUnit]:true
            }).then(function(){
              database.ref('departments/'+department+"/"+speciality+"/"+group+"/Teachers/"+practicesTeacher).set({
                  id:practicesTeacherId
              })
          })
     })
    }

  })
})
})
