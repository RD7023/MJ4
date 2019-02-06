//Отримуємо факультет з рядка запиту
var department  =  decodeURIComponent(window.location.href.split('?')[1]).replace("_"," ")
console.log(department)
i=1;
var database = firebase.database();
 database.ref("departments/"+department+"/teachers").orderByChild('/allTimeRating').on('child_added',function(snapshot){
   console.log(snapshot.key)
   var div = document.getElementById('block')
   p = document.createElement("p")
   text = document.createTextNode(i+")"+snapshot.key+" - "+Math.round(10*Math.abs( snapshot.val()["allTimeRating"]))/10)
   i++;
   p.appendChild(text)
   div.appendChild(p)
 })
