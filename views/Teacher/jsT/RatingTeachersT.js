const auth = firebase.auth();

auth.onAuthStateChanged(function(user){
  if (user) {
    var userId = auth.currentUser.uid;
    var department = decodeURIComponent(window.location.href.split("?")[1].split("=")[1])
    console.log(department);
    var database = firebase.database();
    i=1;
    database.ref("departments/"+department+"/teachers").orderByChild('/allTimeRating').on('child_added',function(snapshot){
      console.log(snapshot.key)
      var div = document.getElementById('block')
      p = document.createElement("p")
      if (userId ===snapshot.val().id) {
        var txt = i+")"+snapshot.key+" - "+Math.round(10*Math.abs( snapshot.val()["allTimeRating"]))/10;
        p.innerHTML = txt.bold();
      }
      else{
        var text = document.createTextNode(i+")"+snapshot.key+" - "+Math.round(10*Math.abs( snapshot.val()["allTimeRating"]))/10)
        p.appendChild(text)
      }
      div.appendChild(p)
        i++;
    })


  }
  else {
    //
  }
})
