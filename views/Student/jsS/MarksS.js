

var auth = firebase.auth()

auth.onAuthStateChanged(function(user){
  if(user){
    const userId = auth.currentUser.uid;
    console.log(userId);
    //Отримуємо інформацію з стрічки запиту
    var arrInfo = window.location.href.split("?")[1].split("&")
    var subject = decodeURIComponent(arrInfo[0].split('=')[1])
    var database = firebase.database();
    database.ref('users/students/'+userId+"/subjects/"+subject+"/marks").once('value').then(function(snapshot){
      var objMarks = snapshot.val()
      console.log(objMarks);
      //Класні роботи
      if (objMarks.classWork) {
        console.log(23);
        var arrClassWork = objMarks.classWork;
        var body = document.getElementsByTagName('body')[0]
        var elementHeader = document.createElement('h2')
        var textHeader = document.createTextNode('Робота на парах:')
        elementHeader.appendChild(textHeader)
        body.appendChild(elementHeader)

        var allMarksLabel = document.createElement('label')
        console.log("arrClassWork");
        console.log(arrClassWork);
        for (var i = 0; i < arrClassWork.length; i++) {
          if (i!=arrClassWork.length-1) {
            console.log(23);
            if (arrClassWork[i]) {
              allMarksLabel.innerHTML = allMarksLabel.innerHTML+arrClassWork[i].studentPoint+", "
            }

          }
          else {
            console.log(23);
            allMarksLabel.innerHTML = allMarksLabel.innerHTML+arrClassWork[i].studentPoint+";"
          }

        }
        body.appendChild(allMarksLabel)
      }


      //Модулі
      if (objMarks.modules) {
        var arrModules = objMarks.modules;
        var divModules = document.getElementById('modules')

        var elementHeader = document.createElement('h2')
        var textHeader = document.createTextNode('Модулі:')
        elementHeader.appendChild(textHeader)
        divModules.appendChild(elementHeader)


        for (var i = 0; i < arrModules.length; i++) {
          var elementModule = document.createElement('h3')
          var j = i+1;
          var textModule = document.createTextNode("модуль "+j+" - "+arrModules[i].studentPoint+" б.")
          elementModule.appendChild(textModule)
          divModules.appendChild(elementModule)
          }

      }


        //Колоквіуми
        if (objMarks.colloquiums) {
          var arrColloquiums = objMarks.colloquiums;
          var divColloquiums = document.getElementById('colloquiums')

          var elementHeader = document.createElement('h2')
          var textHeader = document.createTextNode('Колоквіуми:')
          elementHeader.appendChild(textHeader)
          divColloquiums.appendChild(elementHeader)


          for (var i = 0; i < arrColloquiums.length||0; i++) {
            var elementColloquium = document.createElement('h3')
            var j = i+1;
            var textColloquium = document.createTextNode("модуль "+j+" - "+arrColloquiums[i].studentPoint+" б.")
            elementColloquium.appendChild(textColloquium)
            divColloquiums.appendChild(elementColloquium)
            }
        }


        //Екзамен
        if (objMarks.exam) {
          var objExam = objMarks.exam;
          var divExam = document.getElementById('exam')

          var elementHeader = document.createElement('h2')
          var textHeader = document.createTextNode('Екзамен - '+objExam.studentPoint +" б.")
          elementHeader.appendChild(textHeader)
          divExam.appendChild(elementHeader)
        }
    })

  }
})
