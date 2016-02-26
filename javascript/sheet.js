function displaySheet() {

  var lessonType = parseParams("LESSONTYPE");
  
  var answers = parseParams("ANSWERS");  
  
  var sheetParams = parseParams("VALUES");
  
 
  var valuesArray = paramsToArray(sheetParams);
  
  var date = document.getElementById("date");
  
  var text = document.createTextNode("Date: ");
  date.appendChild(text);

  var lineDiv = document.createElement("span");
  lineDiv.className = "dateLine centered";
  date.appendChild(lineDiv);
       
  document.getElementById("walt").innerHTML = "WALT: Use the " + lessonTypeName(lessonType);

 // create questions
  createQuestionAreas(lessonType, answers, valuesArray, 8);
}