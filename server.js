const express = require('express');

const bodyParser = require('body-parser');

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











//Дім Студента
app.get("/HomeS",function(request,response){
  response.render("Student/HomeS.ejs")
})

//Розклад Студента
app.get("/ScheduleChooseDay",function(request,response){
  response.render("Student/ScheduleChooseDay.ejs")
})

app.get("/Schedule-Monday",function(request,response){
  const choosedDay ="Monday";
  response.render("Student/ChoosedDay.ejs",{
    day: choosedDay
  })

})

app.get("/Schedule-Tuesday",function(request,response){
  const choosedDay ="Tuesday";
  response.render("Student/ChoosedDay.ejs",{
    day: choosedDay
  })
})

app.get("/Schedule-Wednesday",function(request,response){
  const choosedDay ="Wednesday";
  response.render("Student/ChoosedDay.ejs",{
    day: choosedDay
  })
})

app.get("/Schedule-Thursday",function(request,response){
  const choosedDay ="Thursday";
  response.render("Student/ChoosedDay.ejs",{
    day: choosedDay
  })
})

app.get("/Schedule-Friday",function(request,response){
  const choosedDay ="Friday";
  response.render("Student/ChoosedDay.ejs",{
    day: choosedDay
  })
})

//Викладачі студента
app.get("/TeachersS",function(request,response){
  response.render("Student/TeachersS.ejs")
})
//Вибраний викладач студента
app.get("/ChoosedTeacher",function(request,response){

  response.render("Student/ChoosedTeacher.ejs")
})
//Tоп викладачів студента
app.get("/TopTeachers",function(request,response){
  response.render("Student/TopTeachers.ejs")
})

//Предмети студента
app.get("/SubjectsS",function(request,response){
  response.render("Student/SubjectsS.ejs")
})
//Вибраний предмет студента
app.get("/ChoosedSubject",function(request,response){
  var sbjName = request.query.subjectName;
  response.render("Student/ChoosedSubject.ejs",{
    subjectName:sbjName
  })
})
//Вибране завдання студента
app.get("/ChoosedTask",function(request,response){
  var sbjName = request.query.subject;
  response.render("Student/ChoosedTask.ejs",{
    subject:sbjName
  })
})

//Вибране оголошення студента
app.get("/ChoosedAnn",function(request,response){
  var sbjName = request.query.subject;
  response.render("Student/ChoosedAnn.ejs",{
    subject:sbjName
  })
})
//Оцінки студента
app.get("/MarksS",function(request,response){
  var sbjName = request.query.subject;
  response.render("Student/MarksS.ejs",{
    subject:sbjName
  })
})










//Дім викладача
app.get("/HomeT",function(request,response){
  response.render("Teacher/HomeT.ejs")
})
//Предмети викладача
app.get("/SubjectsT",function(request,response){
  response.render("Teacher/SubjectsT.ejs")
})
//Вибраний предмет викладача
app.get("/ChoosedSubjectT",function(request,response){
  var subjectName = request.query.choosedSubject;
  var academicUnit = request.query.academicUnit;
  response.render("Teacher/ChoosedSubjectT.ejs",{
    subjectName:subjectName,
    academicUnit:academicUnit
  })
})
//Вибраний предмет викладача => надати завдання
app.get("/GiveTaskT",function(request,response){
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
app.get("/LeftAnnT",function(request,response){
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
//Вибраний предмет викладача => залишити оголошення
app.get("/LeftAnnT",function(request,response){
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
//Вибраний предмет викладача => залишити оголошення
app.get("/LeftAnnT",function(request,response){
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
app.get("/SetMarksT",function(request,response){
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
app.get("/ChoosedTestT",function(request,response){
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








//Дім декана
app.get("/HomeD",function(request,response){
  response.render("Dean/HomeD.ejs")
})
//Додати студента
app.get("/addStudent",function(request,response){
  response.render("Dean/addStudent.ejs")
})
//Додати викладача
app.get("/addTeacher",function(request,response){
  response.render("Dean/addTeacher.ejs")
})
//Заповнити розклад
app.get("/fillSchedule",function(request,response){
  response.render("Dean/fillSchedule.ejs")
})
//Додати кафедру
app.get("/addChair",function(request,response){
  response.render("Dean/addChair.ejs")
})
//Визначити список предметів
app.get("/defineSubjects",function(request,response){
  response.render("Dean/defineSubjects.ejs")
})
//Визначити список викладачів
app.get("/defineTeachers",function(request,response){
  response.render("Dean/defineTeachers.ejs")
})







//Визначає куди направити юзера
app.get("/",function(request,response){
  response.render("Common/determinant.ejs")
})


app.listen(3000)
