
function test(){
  alert("test in shared.js");
}

function printError(message) {
  var errordiv = document.getElementById("error");
  errordiv.innerHTML = "ERROR: " + message;
} 



function lessonTypeName(lessonType) {
   switch(lessonType){
   
     case "MGM":
       return "Multiplication Grid Method";
     
     default:
       printError("Invalid lessonType " + lessonType + " detected");
       return "No Match";
   }
}

function getParamValue (string, name) {
  var array = string.split("=");
  if (array[0] == name) {
        return array[1];
  } else {
    printError("1st param name not " + name + "is actually " + array[0]);
    return "";
  }
}

// parse params to be used to generate links
function parseParams(request){

  var paramsHash = [];
  
 // parse url params
  var params = window.location.search;    
  var paramsnoq = params.split("?")[1];
  var paramParts = paramsnoq.split("&&");

  // either 7 (lessonType, answers, screen and 4levels, or 3, lessonType answers, and currentpage Vals
  if (paramParts.length != "6" && paramParts.length != "3" ) {
    printError("Incorrect number of levels specified: " + paramParts.length);
    return;
  }

 switch (request){
 
  // from any page
  case 'LESSONTYPE': 
    return getParamValue(paramParts[0], "lessonType");
    break;

  // from links page
  case 'SCREEN':
    return paramParts[1]; 
    break;

  // from links page
  case 'SHEET1':
    return paramParts[2];
    break;

  // from links page
  case 'SHEET2':
    return paramParts[3];  
    break;

// from links page    
  case 'SHEET3':
    return paramParts[4];  
    break;

  // from links page
  case 'SHEET4':
    return paramParts[5];  
    break;

  // from screen/sheet page
  case 'ANSWERS':
    return getParamValue(paramParts[1], "answers");  
    break;

  // from screen/sheet page
  case 'VALUES':
    return paramParts[2];  
    break;

  // from screen/sheet page
  default:
    printError("Unknown request to parseParms");
    return "";  
    break;

 }


  if (!(paramsHash["lessonType"] = getParamValue(paramParts[0], "lessonType"))) {
    return;
  }   
  
  var levelParams = paramParts[1].split("&");
  
  for(var i=0;i<levelParams.length;i++) {
    var nvpair = levelParams[i].split("=");
    paramsHash[nvpair[0]] = nvpair[1];
  }

  return paramsHash;
}

function paramsToArray(params){

  var values = [];
  var nvpairs = params.split("&");
 
  for (var i=0; i<nvpairs.length; i++) {
    var parts = nvpairs[i].split("=");
    values[i] = parts[1];
  }
  return values;

}

function createQuestionAreas(lessonType, answers, levelParams, format){

   if (format != "4" && format != "8") {
      printError("invalid number questions areas requested. " + format + " Must be 4 or 8");
      return;
   }
   
   var colorClass = "";
   var noNum = true;
   var screen = false;
   if (format == "4") { 
     screen = true;
     colorClass = "colorL";
   }
   
   var questionDiv = document.getElementById("questionGrid");

   for (var i=0; i < format; i++) {

      var row = document.createElement('div');
      var block = document.createElement("questionArea");
      
      // call createQuestion for selected type of question
      var grid = createQuestion[lessonType](levelParams, i, answers);
      if (screen) {
        grid.className=colorClass+(i+1);
      }
      block.appendChild(grid);
      row.appendChild(block);
            
      i++;
            
      var block2 = document.createElement("questionArea");
      
      var grid2 = createQuestion[lessonType](levelParams, i, answers);
      if (screen) {
        grid2.className=colorClass+(i+1);
      }
      block2.appendChild(grid2);
      row.appendChild(block2);
      
      questionDiv.appendChild(row);
   }
}


/////////////////////////////////////////
// All lessontype functions below here //

var createQuestion = [];

createQuestion["MGM"] = function(levelParams, valueIndex, answers){

//  var num1 = "12";
//  var num2 = "5";

  var num1 = levelParams[(valueIndex*2)]; 
  var num2 = levelParams[((valueIndex*2)+1)];
  var tens = num1-(num1%10);
  var units = num1%10;

  var grid = document.createElement('div');  
  
// question
        var qnum = document.createElement("div");
        var question = (valueIndex+1) + ") " + num1 + " x " + num2 + " = ";
        var text = document.createTextNode(question);
        qnum.className = "qnum";
        qnum.appendChild(text);
        
        var answerLine = document.createElement("span");
      if(answers == "true") {  
        var text = document.createTextNode(num1*num2);        
        answerLine.appendChild(text);
      }  
        answerLine.className = "answerLine";
        qnum.appendChild(answerLine); 
        
        grid.appendChild(qnum);
        
// space between answer line and grid
  var spacerow = document.createElement('div');
  spacerow.className = "vspace";
  grid.appendChild(spacerow);
  
  var row = document.createElement('div');
  
  var sign = document.createElement("MGMGrid");
  var text = document.createTextNode("x");
  sign.style.fontSize="xx-large";
  sign.style.borderLeftWidth="0px";
  sign.style.borderRightWidth="3px";
  sign.style.borderTopWidth="0px";
  sign.style.borderBottomWidth="3px";
  sign.appendChild(text);
  row.appendChild(sign)
  
  var tensBox = document.createElement("MGMGrid");
  if (answers == "true") {
    var tensText = document.createTextNode(tens);
    tensBox.appendChild(tensText);
  }
  tensBox.style.fontSize="xx-large";
  tensBox.style.borderLeftWidth="0px";
  tensBox.style.borderRightWidth="3px";
  tensBox.style.borderTopWidth="0px";
  tensBox.style.borderBottomWidth="3px";
  row.appendChild(tensBox);
  
  var unitsBox = document.createElement("MGMGrid");
  if (answers == "true") {  
    var unitsText = document.createTextNode(units);
    unitsBox.appendChild(unitsText);
  }
  unitsBox.style.fontSize="xx-large";
  unitsBox.style.borderLeftWidth="0px";
  unitsBox.style.borderRightWidth="0px";
  unitsBox.style.borderTopWidth="0px";
  unitsBox.style.borderBottomWidth="3px";
  row.appendChild(unitsBox);
  
  grid.appendChild(row);
 
  var row2 = document.createElement('div');
  
  var num2Box = document.createElement("MGMGrid");
  if (answers == "true") {  
    var num2Text = document.createTextNode(num2);
    num2Box.appendChild(num2Text);
  }
  num2Box.style.fontSize="xx-large";
  num2Box.style.borderLeftWidth="0px";
  num2Box.style.borderRightWidth="3px";
  num2Box.style.borderTopWidth="0px";
  num2Box.style.borderBottomWidth="0px";
  row2.appendChild(num2Box)
  
  var tensTotal = document.createElement("MGMGrid");
  if (answers == "true") {
    var thetext = document.createTextNode(tens*num2);
    tensTotal.className = "answer";
    tensTotal.style.fontSize="xx-large";
    tensTotal.appendChild(thetext);  
  }
  tensTotal.style.borderLeftWidth="0px";
  tensTotal.style.borderRightWidth="3px";
  tensTotal.style.borderTopWidth="0px";
  tensTotal.style.borderBottomWidth="0px";
  row2.appendChild(tensTotal);
  
  var unitsTotal = document.createElement("MGMGrid");
  if (answers == "true") {
    var thetext = document.createTextNode(units*num2);
    unitsTotal.className = "answer";
    unitsTotal.style.fontSize="xx-large";
    unitsTotal.appendChild(thetext);  
  }  
  unitsTotal.style.borderLeftWidth="0px";
  unitsTotal.style.borderRightWidth="0px";
  unitsTotal.style.borderTopWidth="0px";
  unitsTotal.style.borderBottomWidth="0px";
  row2.appendChild(unitsTotal);
  
  grid.appendChild(row2);
 

  var padding = document.createElement("gridPadding");
  grid.appendChild(padding);
  
  var answerRow = document.createElement("div");
  
  var add1 = document.createElement("MGMGridAnswer");
  if (answers == "true") {
    var thetext = document.createTextNode(tens*num2);
    add1.className = "answer";
    add1.style.fontSize="xx-large";
    add1.appendChild(thetext);  
  }  
  answerRow.appendChild(add1);
  var addSign = document.createTextNode(" + ");
  answerRow.appendChild(addSign);
  var add2 = document.createElement("MGMGridAnswer");
  if (answers == "true") {
    var thetext = document.createTextNode(units*num2);
    add2.className = "answer";
    add2.style.fontSize="xx-large";
    add2.appendChild(thetext);  
  }    
  answerRow.appendChild(add2);
  var eq = document.createTextNode(" = ");
  answerRow.appendChild(eq);
  var answer = document.createElement("MGMGridFinalAnswer");
  if (answers == "true") {
    var thetext = document.createTextNode((tens*num2)+(units*num2));
    answer.className = "answer";
    answer.style.fontSize="xx-large";
    answer.appendChild(thetext);  
  }    
  answerRow.appendChild(answer);
  
  grid.appendChild(answerRow);

  return grid;
}