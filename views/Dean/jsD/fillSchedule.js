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

  database.ref("departments/"+department+"/"+speciality+"/"+group).set({
    Schedule: objSched
  })
})
