function isNumerator() {
  var currentDay = new Date();
  var firstDayOfDenominator = new Date("1/27/2019");
  var numberOfDaysPassed = Math.floor((currentDay-firstDayOfDenominator)/86400000);
  if(Math.floor(numberOfDaysPassed/7)%2==0){
    return false;
  }
  else{
    return true;
  }
  }




firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    const day = window.location.href.split("-")[1]

    const p1 = document.getElementById('1')
    const p2 = document.getElementById('2')
    const p3 = document.getElementById('3')
    const p4 = document.getElementById('4')
    const p5 = document.getElementById('5')
    const p6 = document.getElementById('6')

    database=firebase.database();
    console.log(firebase.auth().currentUser.uid);
    var userId = firebase.auth().currentUser.uid;

    var department;
    var speciality;
    var group;

    database.ref("users/students/"+userId).once('value').then(function(snapshot){

      department=snapshot.val().department;
      speciality=snapshot.val().speciality;
      group=snapshot.val().group;
      console.log(group);
      if(isNumerator()){
        database.ref("departments/"+department+"/"+speciality+"/"+group+"/Schedule/"+day+"/Numerator").once("value").then(function(snapshot){
            p1.innerHTML=snapshot.val()[0]
            p2.innerHTML=snapshot.val()[1]
            p3.innerHTML=snapshot.val()[2]
            p4.innerHTML=snapshot.val()[3]
            p5.innerHTML=snapshot.val()[4]
            p6.innerHTML=snapshot.val()[5]
        })
      }
      else{
        database.ref("departments/"+department+"/"+speciality+"/"+group+"/Schedule/"+day+"/Denominator").once("value").then(function(snapshot){
          p1.innerHTML=snapshot.val()[0]
          p2.innerHTML=snapshot.val()[1]
          p3.innerHTML=snapshot.val()[2]
          p4.innerHTML=snapshot.val()[3]
          p5.innerHTML=snapshot.val()[4]
          p6.innerHTML=snapshot.val()[5]
        })
      }
    })

  }

})
