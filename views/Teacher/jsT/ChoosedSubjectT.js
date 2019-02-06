//Отримуємо предмет спеціальність  групу факультет
const subject = decodeURIComponent(window.location.href.split("?")[1].split("&")[0].split("=")[1])
const academicUnit = decodeURIComponent(window.location.href.split("?")[1].split("&")[1].split("=")[1])
const group = academicUnit.split("|")[0]
const speciality = academicUnit.split("|")[1]
const department = academicUnit.split("|")[2]





//
//ВИЗНАЧЕННЯ СТРУКТУРИ ОЦІНОК
//
var modulesCounter = 0;
var colloquiumsCounter = 0;
const btnDefineMarksStructure = document.getElementById('btnDefineMarksStructure')
btnDefineMarksStructure.addEventListener('click',function(){
  div = document.createElement('div')
  div.setAttribute("id","block1")

  var addModule = document.createElement('button')
  var textAddModule = document.createTextNode("Додати модуль")
  var br = document.createElement('br')
  addModule.setAttribute('id','addModule')
  addModule.appendChild(textAddModule)
  div.appendChild(addModule)
  div.appendChild(br)


  var addColloquium = document.createElement('button')
  var textAddColloquium = document.createTextNode("Додати колоквіум")
  var br = document.createElement('br')
  addColloquium.appendChild(textAddColloquium)
  addColloquium.setAttribute('id','addColloquium')
  div.appendChild(addColloquium)
  div.appendChild(br)


  var setClassworkMaxPoint = document.createElement('button')
  var textClassworkMaxPoint = document.createTextNode("Визначити максимальну оцінку за роботу на парах за семестер")
  var br = document.createElement('br')
  setClassworkMaxPoint.appendChild(textClassworkMaxPoint)
  setClassworkMaxPoint.setAttribute('id','setClassworkMaxPoint')
  div.appendChild(setClassworkMaxPoint)
  div.appendChild(br)



  var setExamMaxPoint = document.createElement('button')
  var txtSetExamMaxPoint = document.createTextNode("Визначити кількість балів які виносяться на екзамен")
  var br = document.createElement('br')
  setExamMaxPoint.appendChild(txtSetExamMaxPoint)
  setExamMaxPoint.setAttribute('id','setExamMaxPoint')
  div.appendChild(setExamMaxPoint)
  div.appendChild(br)


  var setBonusPoint = document.createElement('button')
  var txtSetBonusPoint = document.createTextNode("Визначити кількість бонусних балів")
  var br = document.createElement('br')
  setBonusPoint.appendChild(txtSetBonusPoint)
  setBonusPoint.setAttribute('id','setBonusPoint')
  div.appendChild(setBonusPoint)
  div.appendChild(br)

  var btnConfirm = document.createElement('button')
  var txtBtnConfirm = document.createTextNode("Підтвердити")
  var br = document.createElement('br')
  btnConfirm.appendChild(txtBtnConfirm)
  btnConfirm.setAttribute('id','confirm')
  div.appendChild(br)
  div.appendChild(btnConfirm)



  var body = document.getElementsByTagName('body')[0]

  body.appendChild(div)

  div.addEventListener('click',function(){
    if(event.currentTarget!==event.target)
    {
      div = document.getElementById(event.currentTarget.id)
      if(event.target.id=="addModule")
      {
        modulesCounter++;
        var inputModuleMaxMark = document.createElement('input')
        inputModuleMaxMark.setAttribute('id','module'+modulesCounter)
        inputModuleMaxMark.setAttribute('placeholder',modulesCounter+".Модуль")
        inputModuleMaxMark.setAttribute('type',"number")
        div.insertBefore(inputModuleMaxMark,event.target.nextSibling)



      }
      if(event.target.id=="addColloquium")
      {
          colloquiumsCounter++;
          var inputColloquiumMaxMark = document.createElement('input')
          inputColloquiumMaxMark.setAttribute('id','colloquium'+colloquiumsCounter)
          inputColloquiumMaxMark.setAttribute('placeholder',colloquiumsCounter+".Коллоквіум")
          inputColloquiumMaxMark.setAttribute('type',"number")
          div.insertBefore(inputColloquiumMaxMark,event.target.nextSibling)

      }
      if(event.target.id=="setClassworkMaxPoint")
      {
        var inputClassWorkPoint = document.createElement('input')
        inputClassWorkPoint.setAttribute('id','classWork')
        inputClassWorkPoint.setAttribute('placeholder',"Класні роботи")
        inputClassWorkPoint.setAttribute('type',"number")
        div.insertBefore(inputClassWorkPoint,event.target.nextSibling)
      }
      if(event.target.id=="setExamMaxPoint")
      {
        var inputExamMaxPoint = document.createElement('input')
        inputExamMaxPoint.setAttribute('id','exam')
        inputExamMaxPoint.setAttribute('placeholder',"Екзамен")
        inputExamMaxPoint.setAttribute('type',"number")
        div.insertBefore(inputExamMaxPoint,event.target.nextSibling)
      }
      if(event.target.id=="setBonusPoint")
      {
        var inputSetBonusPoint = document.createElement('input')
        inputSetBonusPoint.setAttribute('id','bonus')
        inputSetBonusPoint.setAttribute('placeholder',"Бонус")
        inputSetBonusPoint.setAttribute('type',"number")
        div.insertBefore(inputSetBonusPoint,event.target.nextSibling)
      }
      if(event.target.id=="confirm")
      {
        var arrModules = [];
        for (var i = 0; i <modulesCounter ; i++) {
          j=i+1;
          arrModules[i] = document.getElementById('module'+j).value
        }
        var arrColloquiums = [];
        for (var i = 0; i < colloquiumsCounter; i++) {
          j=i+1;
          arrColloquiums[i] = document.getElementById('colloquium'+j).value
        }
        var classWorkVal = document.getElementById('classWork').value
        var exam = document.getElementById('exam').value
        var bonus = document.getElementById('bonus').value
        var database = firebase.database();
        database.ref('departments/'+department+"/specialities/"+speciality+"/groups/"+group+"/Subjects/"+subject+"/marksStructure").set({
          modules:arrModules,
          colloquiums:arrColloquiums,
          classWork:classWorkVal,
          exam:exam,
          bonus:bonus
        })
      }
    }
    event.stopPropagation();

  })
})



//
//ДАТИ ЗАВДАННЯ
//
const btnGiveTask = document.getElementById('btnGiveTask')
btnGiveTask.addEventListener('click',function(){
  location.assign("http://localhost:3000/GiveTaskT?subject="+subject+"&group="+group+"&speciality="+speciality+"&department="+department)
})

//
//ЗАЛИШИТИ ОГОЛОШЕННЯ
//
const btnLeftAnn = document.getElementById('btnLeftAnn')
btnLeftAnn.addEventListener('click',function(){
  location.assign("http://localhost:3000/LeftAnnT?subject="+subject+"&group="+group+"&speciality="+speciality+"&department="+department)
})
