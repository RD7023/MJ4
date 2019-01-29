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

//Дім викладача
app.get("/HomeT",function(request,response){
  response.render("Teacher/HomeT.ejs")
})
//Дім декана
app.get("/HomeD",function(request,response){
  response.render("Dean/HomeD.ejs")
})
//Додати студента
app.get("/addStudent",function(request,response){
  response.render("Dean/addStudent.ejs")
})
//Заповнити розклад
app.get("/fillSchedule",function(request,response){
  response.render("Dean/fillSchedule.ejs")
})


//Визначає куди направити юзера
app.get("/",function(request,response){
  response.render("Common/determinant.ejs")
})



app.listen(3000)
