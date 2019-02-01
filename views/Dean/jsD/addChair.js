const txtChairName = document.getElementById('txtChairName');

const btnAddSubject = document.getElementById('btnAddSubject');

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
    var arrSubjects = []
    for(i=1;i<counter+1;i++){
      arrSubjects[i]=document.getElementById(i+'').value
    }
    chairName =txtChairName.value;
    database.ref("chairs/"+chairName+"/subjects").set({
       list:arrSubjects
    })
  })


  var txtSubject = document.createElement('INPUT')
  txtSubject.setAttribute("id", counter+'');
  document.body.appendChild(txtSubject)

})
