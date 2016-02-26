function displayScreen() {

  var lessonType = parseParams("LESSONTYPE");

  var answers = parseParams("ANSWERS");
  
  var sheetParams = parseParams("VALUES");

  var valuesArray = paramsToArray(sheetParams);
      
  document.getElementById("walt").innerHTML = "WALT: Use the " + lessonTypeName(lessonType);

 // create questions
  createQuestionAreas(lessonType, answers, valuesArray, 4);
}