var siteURL = "http://mathsgenerator.atspace.co.uk/";

function createLinks() {
  
  var lessonType = parseParams("LESSONTYPE");
        
  document.getElementById("subTitle").innerHTML = lessonTypeName(lessonType);
        
  document.getElementById("pageDesc").innerHTML = "Click the links to view the questions";
 
 
 var answers = true;
 var noanswers = false;
 
 //link for screen - send all params
 createScreenLink(lessonType, parseParams("SCREEN"), noanswers);

 //link for level 1 - send only level 1 parms
 createSheetLink(lessonType, parseParams("SHEET1"), "1", noanswers);
 createSheetLink(lessonType, parseParams("SHEET1"), "1", answers);

 //link for level 2
 createSheetLink(lessonType, parseParams("SHEET2"), "2", noanswers);        
 createSheetLink(lessonType, parseParams("SHEET2"), "2", answers);

//link for level 3
 createSheetLink(lessonType, parseParams("SHEET3"), "3", noanswers);
 createSheetLink(lessonType, parseParams("SHEET3"), "3", answers);
        
 //link for level 4
 createSheetLink(lessonType, parseParams("SHEET4"), "4", noanswers);
 createSheetLink(lessonType, parseParams("SHEET4"), "4", answers);

} // end processArgs function 

function createScreenLink (lessonType, urlparams, answers){
        var type = "screen";
        var text = "Screen";
        var a = document.createElement('a');
        var someParams = "?lessonType=" + lessonType + "&&answers=" + answers + "&&" + urlparams;
        var url = siteURL + type + ".html" + someParams;        
        a.setAttribute('href', url);
        
        var adiv = document.createElement('div');
        adiv.className = type;

        var linkText = document.createTextNode(text);
        adiv.appendChild(linkText);
        
        a.appendChild(adiv);
        document.getElementById(type).appendChild(a);       
        
}

function createSheetLink (lessonType, urlparams, num, answers){
        var type = "sheet";
        var text = "";
        
        if (answers) {
          text = "Answer Sheet " + num;
        } else {
          text = "Sheet " + num;
        }
        
        var a = document.createElement('a');
        var someParams = "?lessonType=" + lessonType + "&&answers=" + answers + "&&" + urlparams;
        var url = siteURL + type + ".html" + someParams;
        a.setAttribute('href', url);
        
        var adiv = document.createElement('span');
        adiv.className = type+num;   
        
        var linkText = document.createTextNode(text);
        adiv.appendChild(linkText);
        
        a.appendChild(adiv);
        
        if(answers) {
          var spacediv = document.createElement('span');
          spacediv.style.display = "inline-block";
          spacediv.className = "hspace";
          document.getElementById(type+num).appendChild(spacediv);
        } 
        
        document.getElementById(type+num).appendChild(a);
}



// createLinks(); now done in html with onload.