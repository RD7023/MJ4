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

//
//ПОСТАВИТИ ОЦІНКУ
//
const btnSetMarks = document.getElementById('btnSetMarks')
btnSetMarks.addEventListener('click',function(){
  location.assign("http://localhost:3000/SetMarksT?subject="+subject+"&group="+group+"&speciality="+speciality+"&department="+department)
})


//
//ОЦІНКИ НА ПОПЕРЕДНІЙ КЛАСНІЙ РОБОТІ
//
var database = firebase.database()
var div = document.getElementById('divStudentsList')
database.ref("term/holidays").once('value').then(function(snapshot){
  var termBeginning = snapshot.val().lastEnd
//отримуємо теперішній час
  var currentDate = new Date()
  console.log(currentDate);
//час пари =>потрібний результат
  var paraDate = new Date()

// отримуємо поточний день
  var currentDay =currentDate.getDay()
  console.log(currentDay);
  if(currentDay<1||currentDay>5)
  {
    while(paraDate.getDay()!=5){
      paraDate.setDate(paraDate.getDate()-1)
      console.log(paraDate);
    }
    currentDay=5
  }
  console.log(paraDate);
//визначення поточної пари

var currenPara;
//перша пара
var para1 = new Date()
para1.setHours(8)
para1.setMinutes(30)
//друга пара
var para2 = new Date()
para2.setHours(10)
para2.setMinutes(10)
//третя пара
var para3 = new Date()
para3.setHours(11)
para3.setMinutes(50)
//четверта пара
var para4 = new Date()
para4.setHours(13)
para4.setMinutes(30)
//пята пара
var para5 = new Date()
para5.setHours(15)
para5.setMinutes(5)
//шоста пара
var para6 = new Date()
para6.setHours(16)
para6.setMinutes(40)

if(currentDate<para1){
  currentPara = 5
  currentDay--;
  paraDate.setDate(paraDate.getDate()-1)
  console.log(paraDate);
  if(currentDay<0){
    currentDay=5
    while(paraDate.getDay()!=5){
      paraDate.setDate(paraDate.getDate()-1)
    }
  }
}else if (currentDate<para2) {
  currentPara=0;
}else if (currentDate<para3) {
  currentPara=1;
}else if (currentDate<para4) {
  currentPara=2
}else if (currentDate<para5) {
  currentPara=3
}else if (currentDate<para6) {
  currentPara=4
}else {
  currentPara=5
}

console.log(currentPara);

console.log(paraDate);


//Отримуємо тип тижня(чисельник/знаменник)
  var currentWeek = Math.floor((currentDate -termBeginning)/(7*24*60*60*1000))
  var typeWeek;
  if ((currentWeek%2)==0) {
    typeWeek = "Numerator";
  }
  else{
    typeWeek = "Denominator";
  }
  //Шукаємо дату минулої пари
  database.ref("departments/"+department+"/specialities/"+speciality+"/groups/"+group+"/Schedule").once('value').then(function(snapshot2){
    var objSchedule = snapshot2.val();
    bool = true;
    counter=0;

    console.log(objSchedule[currentDay]);
    while(bool){
      if (counter>100) {
        bool=false
      }
      counter++;
      console.log(currentDay);
      currentSubject = objSchedule[currentDay][typeWeek][currentPara]
      if(currentSubject==(subject+"|Практика"))
        {

          bool=false;



          console.log(currentPara);
          console.log(paraDate);
          console.log(currentWeek);
          console.log(typeWeek);
        //Отримуємо порядковий номер пари
        //Порахуємо кількість пар в чисельнику
         var counterNumerator=0;
         var counterDenominator = 0
         for (var key in objSchedule) {
           if (objSchedule.hasOwnProperty(key)) {
             for (var i = 0; i < 6; i++) {
               if (objSchedule[key]["Numerator"][i]==subject+'|Практика') {
                 counterNumerator++
               }
               if (objSchedule[key]["Denominator"][i]==subject+'|Практика') {
                 counterDenominator++
               }
             }
           }
         }
         console.log(counterNumerator);
         console.log(counterDenominator);

         var paraNumber = counterNumerator*Math.round(currentWeek/2)+counterDenominator*Math.floor(currentWeek/2)
         for (var i=1;i<paraDate.getDay(); i++) {
             for (var j = 0; j < currentPara; j++) {
               if (objSchedule[i][typeWeek][j]===subject+"|Практика") {
                 paraNumber++
               }
             }
           }
          paraNumber++
          database.ref("departments/"+department+"/specialities/"+speciality+"/groups/"+group+"/Students").once("value").then(function(snapshot3){
            var objStudents = snapshot3.val()

            //Заголовок до списку студентів
            var labelParaDate = document.createElement('label')
            var textParaDate = document.createTextNode(paraDate)
            var br = document.createElement('br')
            labelParaDate.appendChild(textParaDate)
            div.appendChild(labelParaDate)
            div.appendChild(br)

            //Заповнюємо список
            for (var key in objStudents) {
              if (objStudents.hasOwnProperty(key)) {
                var labelName = document.createElement("label")
                var textName = document.createTextNode(key)
                var inputMark = document.createElement('input')
                var br = document.createElement('br')
                inputMark.setAttribute('id',objStudents[key]["id"])
                labelName.appendChild(textName)
                div.appendChild(labelName)
                div.appendChild(inputMark)
                div.appendChild(br)
              }
            }
            //Кнопка підтвердити
            var btnConfirm = document.createElement('button')
            var textConfirm = document.createTextNode("Підтвердити")
            btnConfirm.appendChild(textConfirm)
            div.appendChild(br)
            div.appendChild(btnConfirm)

            //Взяти інфу з розкладу
            btnConfirm.addEventListener('click',function(){
              paraIndex = paraNumber-1;
              for (var key in objStudents) {
                if (objStudents.hasOwnProperty(key)) {
                  var mark = document.getElementById(objStudents[key]["id"]).value;
                  database.ref('users/students/'+objStudents[key]["id"]+"/subjects/"+subject+"/marks/classWork/"+paraIndex).set({
                    studentPoint:mark
                  })
                }
              }
            })

          })
          //Ми дістали порядковий номер пари
          //  paraDate => відкриваєм список студентів => добавляєм всьо шо надо
        }
        else{
          currentPara--;
          if (currentPara<0) {
            currentPara=5
            currentDay--;
            paraDate.setDate(paraDate.getDate()-1)
            if (currentDay<1) {
              if(typeWeek === "Numerator")
              {
                currentWeek--;
                typeWeek = "Denominator"
              }
              if(typeWeek === "Denominator")
              {
                currentWeek--;
                typeWeek = "Numerator"
              }
              currentDay=5
              while(paraDate.getDay()!=5){
                paraDate.setDate(paraDate.getDate()-1)
              }
            }
          }

        }
    }

  })
})
