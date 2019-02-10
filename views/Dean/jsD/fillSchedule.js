

function getElementsArrayValues(array) {
  arrVal=[];
  for(i=0;i<array.length;i++){
    arrVal.push(array[i].value)
  }
  return arrVal
}



const btnConfirm = document.getElementById('btnConfirm');

btnConfirm.addEventListener("click",function(){
  var objSched ={};
  var arrMonNumerator = getElementsArrayValues(document.getElementsByClassName('MonN'));
  var arrMonDenominator = getElementsArrayValues(document.getElementsByClassName('MonD'));
  objSched.Monday={};
  objSched.Monday.Numerator = arrMonNumerator;
  objSched.Monday.Denominator = arrMonDenominator;

  var arrTueNumerator = getElementsArrayValues(document.getElementsByClassName('TueN'));
  var arrTueDenominator = getElementsArrayValues(document.getElementsByClassName('TueD'));
  objSched.Tuesday={};
  objSched.Tuesday.Numerator = arrTueNumerator;
  objSched.Tuesday.Denominator = arrTueDenominator;

  var arrWedNumerator = getElementsArrayValues(document.getElementsByClassName('WedN'));
  var arrWedDenominator = getElementsArrayValues(document.getElementsByClassName('WedD'));
  objSched.Wednesday={}
  objSched.Wednesday.Numerator = arrWedNumerator;
  objSched.Wednesday.Denominator = arrWedDenominator;

  var arrThrsNumerator = getElementsArrayValues(document.getElementsByClassName('ThrsN'));
  var arrThrsDenominator = getElementsArrayValues(document.getElementsByClassName('ThrsD'));
  objSched.Thursday = {};
  objSched.Thursday.Numerator = arrThrsNumerator;
  objSched.Thursday.Denominator = arrThrsDenominator;

  var arrFriNumerator = getElementsArrayValues(document.getElementsByClassName('FriN'));
  var arrFriDenominator = getElementsArrayValues(document.getElementsByClassName('FriD'));
  objSched.Friday = {};
  objSched.Friday.Numerator = arrFriNumerator;
  objSched.Friday.Denominator = arrFriDenominator;

  var  database = firebase.database();


  const department = document.getElementById('txtDepartment').value;
  const speciality = document.getElementById('txtSpeciality').value;
  const group = document.getElementById('txtGroup').value;

  database.ref("departments/"+department+"/specialities/"+speciality+"/groups/"+group+"/Schedule").set({
    1: objSched.Monday,
    2: objSched.Tuesday,
    3: objSched.Wednesday,
    4: objSched.Thursday,
    5: objSched.Friday
  }).then(function(){
    //Рахуємо кількість практичних в семестрі
    database.ref('term').once('value').then(function (snapshot) {
      var numbWeeks = snapshot.val().weeks;
      console.log(numbWeeks);
      //Чисельник
      arrNumerator=[]
      arrNumerator=arrNumerator.concat(arrMonNumerator,arrTueNumerator,arrWedNumerator,arrThrsNumerator,arrFriNumerator)
      console.log(arrNumerator.length);
      //Лишаємо тільки практику
      for (var i = 0; i < arrNumerator.length; i++) {
        if (arrNumerator[i].split("|")[1]!=="Практика" )
        {
          arrNumerator.splice(i,1)
          i--;
        }

      }
      arrNumerator=arrNumerator.sort()

      var counter=1;

      var objCounterNumerator = {};
      for (var i = 0; i < arrNumerator.length; i++){
        if(arrNumerator[i]!==arrNumerator[i+1]){
            objCounterNumerator[arrNumerator[i]]=counter;
            counter = 1;
        }
        else{
          counter++;
        }
        }

        //Знаменник
        arrDenominator=[]
        arrDenominator=arrDenominator.concat(arrMonDenominator,arrTueDenominator,arrWedDenominator,arrThrsDenominator,arrFriDenominator)
        //Лишаємо тільки практику
        for (var i = 0; i < arrDenominator.length; i++) {
          if (arrDenominator[i].split("|")[1]!=="Практика" )
          {
            arrDenominator.splice(i,1)
            i--;
          }

        }
        arrDenominator=arrDenominator.sort()

        var counter=1;

        var objCounterDenominator = {};
        for (var i = 0; i < arrDenominator.length; i++){
          if(arrDenominator[i]!==arrDenominator[i+1]){
              objCounterDenominator[arrDenominator[i]]=counter;
              counter = 1;
          }
          else{
            counter++;
          }
          }

          //Рахуємо кількість пар
          for (var key in objCounterNumerator) {
            if (objCounterNumerator.hasOwnProperty(key)) {
              objCounterNumerator[key] = objCounterNumerator[key]*(Math.round(numbWeeks/2))
              console.log(objCounterNumerator[key]);
            }
          }
          for (var key in objCounterDenominator) {
            if (objCounterDenominator.hasOwnProperty(key)) {
              objCounterDenominator[key] = objCounterDenominator[key]*(Math.floor(numbWeeks/2))
            }
          }
        var objCounter = {}
        for (var key in objCounterNumerator) {
          if (objCounterNumerator.hasOwnProperty(key)) {
            objCounter[key.split("|")[0]]={}
            objCounter[key.split("|")[0]]["practiceLessons"] = objCounterNumerator[key]
            console.log(objCounter[key.split("|")[0]]["practiceLessons"])
          }
        }
        for (var key in objCounterDenominator) {
          if (objCounterDenominator.hasOwnProperty(key)) {
            if (objCounter.hasOwnProperty(key.split("|")[0])) {
              objCounter[key.split("|")[0]]["practiceLessons"]=objCounter[key.split("|")[0]]["practiceLessons"]+objCounterDenominator[key]
            }
            else {
              objCounter[key.split("|")[0]]={}
              objCounter[key.split("|")[0]]["practiceLessons"] = objCounterDenominator[key]
            }
          }
        }
        console.log(objCounter);


        database.ref("departments/"+department+"/specialities/"+speciality+'/groups/'+group).update({
          Subjects: objCounter

          })
        })

      }
    )
  }
  )
