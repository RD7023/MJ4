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

//Доми
app.get("/HomeS",function(request,response){
  console.log(request.url)
  response.render("Student/HomeS.ejs")
})
app.get("/HomeT",function(request,response){
  response.render("Teacher/HomeT.ejs")
})

app.get("/HomeD",function(request,response){
  response.render("Dean/HomeD.ejs")
})

app.get("/addStudent",function(request,response){
  response.render("Dean/addStudent.ejs")
})


app.get("/",function(request,response){
  response.render("Common/determinant.ejs")
})







app.listen(3000)
