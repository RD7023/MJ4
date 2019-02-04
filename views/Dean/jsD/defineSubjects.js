var txtDepartment = document.getElementById('txtDepartment')
var txtSpeciality = document.getElementById('txtSpeciality')
var txtGroup = document.getElementById('txtGroup')

var btnAddSubject = document.getElementById('btnAddSubject')

var btnConfirm = false;
var counter = 0;

btnAddSubject.addEventListener('click',function(){
  counter++;
  if(!btnConfirm){
    btnConfirm = document.createElement('button')
    btnConfirm.innerHTML = "Підтвердити";
    document.body.appendChild(btnConfirm)
  }
  btnConfirm.addEventListener('click',function(){
    var database = firebase.database();
    var objSubjects = {};
    for(i=1;i<counter+1;i++){
      var arrSubChairElements = document.getElementsByClassName(i+'')
      var currentSubject = arrSubChairElements[0].value;
      var currentChair = arrSubChairElements[1].value;
      objSubjects[currentSubject]={chair:currentChair}
      console.log(objSubjects)
    }
    var department = txtDepartment.value;
    var speciality = txtSpeciality.value;
    var group = txtGroup.value;
    database.ref('departments/'+department+'/specialities/'+speciality+"/groups/"+group+'/SubjectsForSchedule').set({
      list:objSubjects
    })
  })

  var txtSubject = document.createElement('INPUT')
  txtSubject.setAttribute("class", counter+'');
  txtSubject.setAttribute("placeholder",counter+ ".Предмет");
  document.body.appendChild(txtSubject)
  var txtChair = document.createElement('INPUT')
  txtChair.setAttribute("class", counter+'');
  txtChair.setAttribute("placeholder",counter+ ".Кафедра");
  document.body.appendChild(txtChair)
})
