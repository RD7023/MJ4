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

function convertToKeyLecturePractice(key){
  if(key==='Лекція'){

    return 'lecturesTeacher';
  }
  if(key==='Практика'){

    return 'practicesTeacher';
  }
}
function convertDayToNumber(day) {

  if (day == "Monday") {
    return 1;
  }
  if (day == "Tuesday") {
    return 2;
  }
  if (day == "Wednesday") {
    return 3;
  }
  if (day == "Thursday") {
    return 4;
  }
  if (day == "Friday") {
    return 5;
  }
}



firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    const day = window.location.href.split("-")[1]



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
        database.ref("departments/"+department+"/specialities/"+speciality+"/groups/"+group+"/Schedule/"+convertDayToNumber(day)+"/Numerator").once("value").then(function(snapshot){
            database.ref("departments/"+department+"/specialities/"+speciality+"/groups/"+group+"/SubjectsForSchedule/list").once("value").then(function(snapshot2){

              console.log(23);
              console.log(snapshot2.val())

              for (var i = 0; i < 6; i++) {
                if(snapshot.val()[i]){
                  j=i+1
                  p=document.getElementById(j+"")
                  p.innerHTML=j+". "+snapshot.val()[i].split("|")[0]+"|"+snapshot.val()[i].split("|")[1]+"|викладач - "+snapshot2.val()[snapshot.val()[i].split("|")[0]]["teachers"][convertToKeyLecturePractice(snapshot.val()[i].split("|")[1])]

                }
              }



                })
            })









      }
      else{
        database.ref("departments/"+department+"/specialities/"+speciality+"/groups/"+group+"/Schedule/"+convertDayToNumber(day)+"/Denominator").once("value").then(function(snapshot){
          database.ref("departments/"+department+"/specialities/"+speciality+"/groups/"+group+"/SubjectsForSchedule/list").once("value").then(function(snapshot2){

            console.log(23);
            console.log(snapshot2.val())

            for (var i = 0; i < 6; i++) {
              if(snapshot.val()[i]){
                j=i+1
                p=document.getElementById(j+"")
                p.innerHTML=j+". "+snapshot.val()[i].split("|")[0]+"|"+snapshot.val()[i].split("|")[1]+"|викладач - "+snapshot2.val()[snapshot.val()[i].split("|")[0]]["teachers"][convertToKeyLecturePractice(snapshot.val()[i].split("|")[1])]

              }
            }
      }
    )}

  )

}
})}})
