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
      val = document.getElementById(i+'').value
      objSubjects[val]=val;
    }
    var department = txtDepartment.value;
    var speciality = txtSpeciality.value;
    var group = txtGroup.value;
    database.ref('departments/'+department+'/'+speciality+"/"+group+'/Subjects').set({
       list:objSubjects
    })
  })

  var txtSubject = document.createElement('INPUT')
  txtSubject.setAttribute("id", counter+'');
  document.body.appendChild(txtSubject)

})
