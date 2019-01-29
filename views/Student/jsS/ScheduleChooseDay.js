const btnMonday = document.getElementById('btnMonday')
const btnTuesday = document.getElementById('btnTuesday')
const btnWednesday = document.getElementById('btnWednesday')
const btnThursday = document.getElementById('btnThursday')
const btnFriday = document.getElementById('btnFriday')


btnMonday.addEventListener("click",function(){

  var body = "Monday";
  location.assign("http://localhost:3000/Schedule-"+body)
})

btnTuesday.addEventListener("click",function(){

  var body = "Tuesday";
  location.assign("http://localhost:3000/Schedule-"+body)
})

btnWednesday.addEventListener("click",function(){

  var body = "Wednesday";
  location.assign("http://localhost:3000/Schedule-"+body);
})

btnThursday.addEventListener("click",function(){

  var body = "Thursday";
  location.assign("http://localhost:3000/Schedule-"+body)
})

btnFriday.addEventListener("click",function(){

  var body = "Friday";
  location.assign("http://localhost:3000/Schedule-"+body)
})
