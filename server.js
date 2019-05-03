const express = require('express');
var schedule = require('node-schedule');
const fs = require('fs');


const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

//Initialize Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./mj-4-68322-firebase-adminsdk-o1p4k-7e498be884.json');
var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mj-4-68322.firebaseio.com"
})



const app = express();


//Set view engine
app.set("view engine","ejs")

//Give us opportunity to send static files
app.use(express.static("views"))
app.set("views",__dirname+'/views')


//Give the server access to the user input
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(cookieParser())


//Реєстрація
app.get("/whoU",function (request,response) {

  response.render("Common/whoU.ejs")
})


app.get("/signUpS",function (request,response) {

  response.render("Student/signUpS.ejs")
})

app.get("/signUpT",function (request,response) {

  response.render("Teacher/signUpT.ejs")
})

app.get("/signUpD",function (request,response) {

  response.render("Dean/signUpD.ejs")
})


//Логін
app.get("/login",function(request,response){

  response.render("Common/login.ejs")
})









//Перевіряч студента
function isStudent(request,response,next){

  idToken = request.cookies['token']
  if(idToken){
  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    var db = admin.database();
    var ref = db.ref("users/students/"+uid);
    ref.on("value",function(snapshot){
      if(snapshot.val()){
        console.log(uid)
        console.log("Success");
        next()

      }
      else {
        response.redirect("/gendalf")
      }
    })

    }
    // ...
  ).catch(function(error) {
    // Handle error
  });
  }
  else {
    response.redirect("/gendalf")  }
}

//Дім Студента
app.get("/HomeS",isStudent,function(request,response){
    response.render("Student/HomeS.ejs")
})

function translateDayToUkrainian(day) {

  if (day == "Monday") {
    return 'Понеділок';
  }
  if (day == "Tuesday") {
    return 'Вівторок';
  }
  if (day == "Wednesday") {
    return 'Середа';
  }
  if (day == "Thursday") {
    return "Четвер";
  }
  if (day == "Friday") {
    return "П'ятниця";
  }
}

// //Розклад Студента
// app.get("/ScheduleChooseDay",isStudent,function(request,response){
//
//   response.render("Student/ScheduleChooseDay.ejs")
// })
//
// app.get("/Schedule-Monday",isStudent,function(request,response){
//   const choosedDay ="Monday";
//   response.render("Student/ChoosedDay.ejs",{
//     day: translateDayToUkrainian(choosedDay)
//   })
//
// })
//
// app.get("/Schedule-Tuesday",isStudent,function(request,response){
//   const choosedDay ="Tuesday";
//   response.render("Student/ChoosedDay.ejs",{
//     day: translateDayToUkrainian(choosedDay)
//   })
// })
//
// app.get("/Schedule-Wednesday",isStudent,function(request,response){
//   const choosedDay ="Wednesday";
//   response.render("Student/ChoosedDay.ejs",{
//     day: translateDayToUkrainian(choosedDay)
//   })
// })
//
// app.get("/Schedule-Thursday",isStudent,function(request,response){
//   const choosedDay ="Thursday";
//   response.render("Student/ChoosedDay.ejs",{
//     day: translateDayToUkrainian(choosedDay)
//   })
// })
//
// app.get("/Schedule-Friday",isStudent,function(request,response){
//   const choosedDay ="Friday";
//   response.render("Student/ChoosedDay.ejs",{
//     day: translateDayToUkrainian(choosedDay)
//   })
// })


//Вибрати предмет
app.get("/ChooseLesson",isStudent,function(request,response){
  response.render("Student/ChooseLesson.ejs")
})
//Оцінити викладача
app.get("/Rate",isStudent,function(request,response){
  var teacher = request.query.teacher.replace(/,/g,".");
  var lesson = request.query.lesson;
  response.render("Student/Rate.ejs",{
    teacher:teacher,
    lesson:lesson
  });
})

//Викладачі студента
app.get("/TeachersS",isStudent,function(request,response){
  response.render("Student/TeachersS.ejs")
})
//Вибраний викладач студента
app.get("/ChoosedTeacher",isStudent,function(request,response){

  response.render("Student/ChoosedTeacher.ejs")
})
//Tоп викладачів студента
app.get("/TopTeachers",isStudent,function(request,response){
  response.render("Student/TopTeachers.ejs")
})

//Викладач місяця студента
app.get("/TeacherOfTheMonth",isStudent,function(request,response){
  response.render("Student/TeacherOfTheMonth.ejs")
})

//Предмети студента
app.get("/SubjectsS",isStudent,function(request,response){
  response.render("Student/SubjectsS.ejs")
})
//Вибраний предмет студента
app.get("/ChoosedSubject",isStudent,function(request,response){
  var sbjName = request.query.subjectName;
  response.render("Student/ChoosedSubject.ejs",{
    subjectName:sbjName
  })
})
//Вибране завдання студента
app.get("/ChoosedTask",isStudent,function(request,response){
  var sbjName = request.query.subject;
  response.render("Student/ChoosedTask.ejs",{
    subject:sbjName
  })
})

//Вибране оголошення студента
app.get("/ChoosedAnn",isStudent,function(request,response){
  var sbjName = request.query.subject;
  response.render("Student/ChoosedAnn.ejs",{
    subject:sbjName
  })
})
//Оцінки студента
app.get("/MarksS",isStudent,function(request,response){
  var sbjName = request.query.subject;
  response.render("Student/MarksS.ejs",{
    subject:sbjName
  })
})







function isTeacher(request,response,next){

  idToken = request.cookies['token']
  if(idToken){
  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    var db = admin.database();
    var ref = db.ref("users/teachers/"+uid);
    ref.on("value",function(snapshot){
      if(snapshot.val()){
        console.log(uid)
        console.log("Success");
        next()

      }
      else {
        response.redirect("/gendalf")
      }
    })

    }
    // ...
  ).catch(function(error) {
    // Handle error
  });
  }
  else {
    response.redirect("/gendalf")  }
}


//Дім викладача
app.get("/HomeT",isTeacher,function(request,response){
  response.render("Teacher/HomeT.ejs")
})
//Відгуки про викладача
app.get("/CommentsT",isTeacher,function(request,response){
  response.render("Teacher/CommentsT.ejs")
})

//Рейтинг викладачів =>вибрати факультет
app.get("/ChooseDepartmentT",isTeacher,function(request,response){
  response.render("Teacher/ChooseDepartmentT.ejs")
})
//Рейтинг викладачів на певному факультеті
app.get("/RatingTeachersT",isTeacher,function(request,response){
  var department = request.query.department;
  response.render("Teacher/RatingTeachersT.ejs",{
    department:department
  })
})


//Предмети викладача
app.get("/SubjectsT",isTeacher,function(request,response){
  response.render("Teacher/SubjectsT.ejs")
})
//Вибраний предмет викладача
app.get("/ChoosedSubjectT",isTeacher,function(request,response){
  var subjectName = request.query.choosedSubject;
  var academicUnit = request.query.academicUnit;
  response.render("Teacher/ChoosedSubjectT.ejs",{
    subjectName:subjectName,
    academicUnit:academicUnit
  })
})
//Вибраний предмет викладача => надати завдання
app.get("/GiveTaskT",isTeacher,function(request,response){
  var subject = request.query.subject;
  var group = request.query.group;
  var speciality = request.query.speciality;
  var department = request.query.department;
  response.render("Teacher/GiveTaskT.ejs",{
    subject:subject,
    group:group,
    speciality:speciality,
    department:department
  })
})
//Вибраний предмет викладача => залишити оголошення
app.get("/LeftAnnT",isTeacher,function(request,response){
  var subject = request.query.subject;
  var group = request.query.group;
  var speciality = request.query.speciality;
  var department = request.query.department;
  response.render("Teacher/LeftAnnT.ejs",{
    subject:subject,
    group:group,
    speciality:speciality,
    department:department
  })
})

//Вибраний предмет викладача => поставити оцінку
app.get("/SetMarksT",isTeacher,function(request,response){
  var subject = request.query.subject;
  var group = request.query.group;
  var speciality = request.query.speciality;
  var department = request.query.department;
  response.render("Teacher/SetMarksT.ejs",{
    subject:subject,
    group:group,
    speciality:speciality,
    department:department
  })
})

//Вибраний предмет викладача => поставити оцінку => вибраний вид тестування
app.get("/ChoosedTestT",isTeacher,function(request,response){
  var testNumber = Number(request.query.infoToSend.split("|")[1])+1;
  if(isNaN(testNumber)){
    var testName = request.query.name
  }else{
    var testName = request.query.name + " "+testNumber
 }
  var subject = request.query.subject;
  var group = request.query.group;
  var speciality = request.query.speciality;
  var department = request.query.department;
  response.render("Teacher/ChoosedTestT.ejs",{
    subject:subject,
    group:group,
    speciality:speciality,
    department:department,
    testName:testName
  })
})




function isDean(request,response,next){

  idToken = request.cookies['token']
  if(idToken){
  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    var db = admin.database();
    var ref = db.ref("users/deans/"+uid);
    ref.on("value",function(snapshot){
      if(snapshot.val()){
        console.log(uid)
        console.log("Success");
        next()
      }
      else {
        console.log(2);
        response.redirect("/gendalf")
      }
    })

    }
    // ...
  ).catch(function(error) {
    // Handle error
  })

  }
  else
   {
     console.log(2);
    response.redirect("/gendalf")  }
}



//Дім декана
app.get("/HomeD",isDean,function(request,response){
  response.render("Dean/HomeD.ejs")
})
//Додати студента
app.get("/addStudent",isDean,function(request,response){
  response.render("Dean/addStudent.ejs")
})
//Додати викладача
app.get("/addTeacher",isDean,function(request,response){
  response.render("Dean/addTeacher.ejs")
})
//Заповнити розклад
app.get("/fillSchedule",isDean,function(request,response){
  response.render("Dean/fillSchedule.ejs")
})
//Додати кафедру
app.get("/addChair",isDean,function(request,response){
  response.render("Dean/addChair.ejs")
})
//Додати факультет
app.get("/addDepartment",isDean,function(request,response){
  response.render("Dean/addDepartment.ejs")
})
//Визначити список предметів
app.get("/defineSubjects",isDean,function(request,response){
  response.render("Dean/defineSubjects.ejs")
})
//Визначити список викладачів
app.get("/defineTeachers",isDean,function(request,response){
  response.render("Dean/defineTeachers.ejs")
})
//Визначити час канікул
app.get("/defineHollidays",isDean,function(request,response){
  response.render("Dean/defineHollidays.ejs")
})
//Переглянути список студентів
app.get("/StudentsD",isDean,function(request,response){
  response.render("Dean/StudentsD.ejs")
})
//Переглянути список студентів => Вибраний факультет
app.get("/ChoosedDepartmentD",isDean,function(request,response){
  response.render("Dean/ChoosedDepartmentD.ejs")
})
//Переглянути список студентів => Вибраний факультет=> Вибрана спеціальність
app.get("/ChoosedSpecialityD",isDean,function(request,response){
  response.render("Dean/ChoosedSpecialityD.ejs")
})
//Переглянути список студентів => Вибраний факультет=> Вибрана спеціальність
app.get("/ChoosedGroupD",isDean,function(request,response){
  response.render("Dean/ChoosedGroupD.ejs")
})






//Визначає куди направити юзера
app.get("/",function(request,response){
  response.render("Common/determinant.ejs")
})



//Гендальф
app.get("/gendalf",function(request,response){
    response.render("Common/gendalf.ejs")
})



//визначення та оновлення викладача місяця

var defineTeacherOfTheMonth = schedule.scheduleJob({date:1}, function(){
  db = admin.database();
  var ref = db.ref("departments/list");
  ref.on("value",function(snapshot){
    var departmentsList = snapshot.val()
    for (var department in departmentsList) {
      if (departmentsList.hasOwnProperty(department)) {
        var refDepartment = db.ref("departments/"+department+"/teachers");
        refDepartment.on("value",function(snapshot2){
          var objTeachers = snapshot2.val();

          var minRating=0;
          var minRatingId="";
          for (var teacher in objTeachers) {
            if (objTeachers.hasOwnProperty(teacher)) {
                console.log( objTeachers[teacher]["id"]);
              if (objTeachers[teacher]["allTimeRating"]<minRating) {
                minRating=objTeachers[teacher]["allTimeRating"];
                minRatingId=objTeachers[teacher]["id"]

              }

            }
          }
        refTeacherOfMonth  = db.ref("departments/"+department+"/teacher of the month");
        refTeacherOfMonth.set({
          allTimeRating: minRating,
          id:minRatingId
        })
        })
      }
    }
  })
});




app.listen(3000)


// fs.readFile("викладачі2.txt",'utf-8', function(err, buf) {
//   console.log(23);
//   // console.log(buf.toString());
//   console.log(buf[123])
// });


//
// var readLine = require('fs-readline');
//
// var rl = readLine('викладачі2.txt');
// rl.on('line', function (line, idx) {
//   lineArr=line.split("\t")
//   db = admin.database();
//   if(lineArr[0]!='')
//   {db.ref("teachers/"+lineArr[0]).set({
//     timesMarked:0,
//     sumOfMarks:0,
//     totalMark:-1
//   })
//   }
//   console.log(idx, lineArr[0]);
// });
