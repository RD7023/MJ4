const auth = firebase.auth();

auth.onAuthStateChanged(function(user){
  if (user) {
    var userId = auth.currentUser.uid;
    var database = firebase.database();
    database.ref("commentsTeacher/"+userId).once("value").then(function(snapshot){
      var objComments = snapshot.val();
      var arrComments = []
      for (var variable in objComments) {
        if (objComments.hasOwnProperty(variable)) {
          arrComments.push(objComments[variable])
        }
      }
      arrComments.sort(function(a,b){ return new Date(b.time)-new Date(a.time) })

      var commentsList = document.getElementById('commentsList')

      for (var i = 0; i < arrComments.length; i++) {
        var commentElement = document.createElement('div')
        var commentTimeElement = document.createElement('label')
        var commentRateElement = document.createElement('label')
        var commentTextElement = document.createElement('label')
        var commentTimeText = document.createTextNode("Час: "+arrComments[i]["time"])
        var commentRateText = document.createTextNode("Оцінка: "+arrComments[i]["rate"])
        var commentTextText = document.createTextNode("Коментар: "+arrComments[i]["text"])

        commentTimeElement.appendChild(commentTimeText)
        commentRateElement.appendChild(commentRateText)
        commentTextElement.appendChild(commentTextText)
        commentElement.appendChild(commentTimeElement)
        commentElement.appendChild(document.createElement('br'))
        commentElement.appendChild(commentRateElement)
        commentElement.appendChild(document.createElement('br'))
        commentElement.appendChild(commentTextElement)
        commentElement.appendChild(document.createElement('br'))
        commentsList.appendChild(commentElement)
        commentsList.appendChild(document.createElement('br'))
      }

      console.log(arrComments);
    })




  }
  else {
    //
  }
})
