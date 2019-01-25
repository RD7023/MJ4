var studentBtn = document.getElementById('studentBtn')
var teacherBtn = document.getElementById('teacherBtn')
var deanBtn = document.getElementById('deanBtn')


studentBtn.addEventListener("click",function () {
  window.location.assign("http://localhost:3000/signUpS")
})

teacherBtn.addEventListener("click",function () {
  window.location.assign("http://localhost:3000/signUpT")
})

deanBtn.addEventListener("click",function () {
  window.location.assign("http://localhost:3000/signUpD")
})
