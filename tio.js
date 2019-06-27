
/*
According to section 6 of https://cobwwweb.com/what-you-need-to-know-about-netlify-forms, I need to use the stringify method from the query-string library
The below lines of code are installing the query-string library, as far as I can tell from the relevant github page: https://github.com/sindresorhus/query-string
*/
$ npm install query-string
const queryString = require('query-string');


var question = `<h2>Welcome to TIO! :-)</h2><br><br><p>  <img src="/person-listening.jpg" alt="Person listening icon" height="140" width="200" auto="compress"></p><br><p>TIO stands for Talk It Over -- this is a place where you can talk about whatever is on your mind.</p><p>This is a very early prototype! Thank you for trying it.</p><p>If you\'re feeling low, type what\'s on your mind and I\'ll listen to you :-) <p> I\'m not a very clever piece of software and I might not understand everything you say, but I\'m here for you for as long as you need. And I won\'t judge you. So if you think that talking things through with someone in a safe confidential space might help, have a go.</p><p>Let\'s start with you just rating how you feel on a scale from 1 to 10, where 1 is terrible and 10 is great</p> 


<form id="initialsurvey" name="initialsurvey" data-netlify="true" method="POST" enctype="application/x-www-form-urlencoded"> 
<ul>
  <li><input type="radio" name="initialhappinessvalue" id="1" value=1><label for="1">1</label></li><br>
  <li><input type="radio" name="initialhappinessvalue" id="2" value=2><label for="2">2</label></li><br>
  <li><input type="radio" name="initialhappinessvalue" id="3" value=3><label for="3">3</label></li><br>
  <li><input type="radio" name="initialhappinessvalue" id="4" value=4><label for="4">4</label></li><br>
  <li><input type="radio" name="initialhappinessvalue" id="5" value=5><label for="5">5</label></li><br>
  <li><input type="radio" name="initialhappinessvalue" id="6" value=6><label for="6">6</label></li><br>
  <li><input type="radio" name="initialhappinessvalue" id="7" value=7><label for="7">7</label></li><br>
  <li><input type="radio" name="initialhappinessvalue" id="8" value=8><label for="8">8</label></li><br>
  <li><input type="radio" name="initialhappinessvalue" id="9" value=9><label for="9">9</label></li><br>
  <li><input type="radio" name="initialhappinessvalue" id="10" value=10><label for="10">10</label></li><br><br>
  <li><input type="submit" class="form-submit-button"></li>
</ul>
</form> <br>

<input name="form-name" value="initialsurvey" type="hidden" />

`;				  // need to have the name="initialhappinessvalue" in there to make sure that the code knows to treat them all as one "thing" and only allow one radio button to be selected



let formData = { "form-name": "initialsurvey", "initialhappinessvalue" : initialhappinessvalue };
const dataToSend = queryString.stringify(formData);


mixpanel.track("Video play");

/*
// ----------------------------TO DO LIST -----------------------TO DO LIST -----------------------TO DO LIST -----------------------TO DO LIST ----------------------
// ----------------------------TO DO LIST -----------------------TO DO LIST -----------------------TO DO LIST -----------------------TO DO LIST ----------------------
// ----------------------------TO DO LIST -----------------------TO DO LIST -----------------------TO DO LIST -----------------------TO DO LIST ----------------------



MAKING FORMS MORE MOBILE FRIENDLY:
- try putting a background colour behind each clickable option. Can try copying the css from here: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_radio ; I tried putting "background-color: #D3D3D3;" immediately after ".container {" near the start and it started looking about right. The aim is implement the button zone thing mentioned here:   https://uxmovement.com/forms/ways-to-make-checkboxes-radio-buttons-easier-to-click/ 
- Go through all the forms and add in <ul> and <li> tags so that the css applies and the text becomes bigger
- add in label tags so that a bigger area is clickable. have already done this for the first form, so need to do this for the others too for consistency (see here: https://uxmovement.com/forms/ways-to-make-checkboxes-radio-buttons-easier-to-click/)
- or another possibility is maybe to create a vertical button group perhaps https://www.w3schools.com/howto/howto_css_button_group_vertical.asp
- Now taht I've made the text bigger, the input text boxes are too small, so make these bigger

OTHER THINGS
- When you go from the happiness value survey to the next stage, it clears the page and goes ont o the enxt page. I don't think this is necessary (ie switch to addelement instead)
- There's a container div which isn't being used. Maybe take it out, although if I make the steps after the happiness survey appear on the same page as (and immediately below) the happiness survey, this might get automatically fixed.
- Get the page to automatically scroll down to the right bit, rather than user having to scroll down manually (see also comments at the bottom about this)
- after user says how they feel, add in some code to provide an empathetic response (rather than just saying thank you, something more like, "gosh that sounds so sad, I'm sorry") -- try to make this response dependent on what the user has said (e.g. detect whether the user has used a word that sounds like "sad")
- At some point maybe refactor the code so that it uses objects: https://hackernoon.com/you-might-not-need-if-statements-a-better-approach-to-branching-logic-59b4f877697f


*/

var initialhappinessvalue; // this is to store the output of the initialsurvey
var finalhappinessvalue; // this is to store the output of the finalsurvey
var somethingSpecific; // there will be a question coming up about whether the user has something specific on thier mind, and this variable will store the answer to that
var feelThisWayOften; // there will be a question coming up about whether the user feels this way often, and this variable will store the answer to that
var howLong; // there will be a question coming up about how long the user has been feeling this way, and this variable will store the answer to that
var confidentiality; // there will be a question coming up about whether the user wants to know more about confidentiality, and this variable will store the answer to that
var freeText; // this is used in the freeTextBot
var tellMeMore; // there will be a question coming up when the user has just said that they don't feel thsi way often, and the bot asks if they would like to say more

var newContent; // the idea with this variable is that when the user has written something, this variable will temporarily store the new content to go into the next div wihch will be added in using the addElement function
  		  

var previousrand = 0;  // creating this variable to remember what the value of rand was last time
var rand = 0; // this variable is the random number which tells us which of the responses to use

var questionNum = 0;      // keep count of question, used for IF condition in the initialBot.
var explainerStepNum = 0; // there's an Explainer Bot which explains how this works, and should get called for each user. explainer Step Num is like questionNum, but for this bot
var freeTextStepNum = 0; // there's a free text Bot which is where the user can type in free text, and should get called for each user. free text Step Num is like questionNum, but for this bot


var finishedAnsweringTheQuestion = 0; // this variable will be used in the free text bot. it checks whether the user is still answering the question -- if it is, we stay put and continue allowing the user to say more. if it's no longer the case, then we move on. 0 means the user hasn't fninished answering the question yet
var firstEnoughAfterSomethingSpecificQ = false; // this variable is used in the free text bot. It's initialised to false and will become true once we have the first instance of the user selecting the "enough" option after they are asked to say more about the something specific they had in mind


var latestDiv; // the value is set in the addElement function, and then it gets used in a bit of jquery code later on which tells the site what to do when someone hits enter
var newDiv;

var output = document.getElementById('output');				// store id="output" in output variable
output.innerHTML = question;													// output first question

// container variable needs to be declared out here (outside the bot function) because it's used both within the bot function and within the jquery below which tells the page what to do when someone presses enter
   // need to think about this -- not sure if I'm still going to need this container variable any more?
   var containerVar = document.getElementById('container');
    containerVar.innerHTML = ''; // sets the container node to be empty (ie there's no text box)

var currentInput;


function initialBot() { 

    var input = document.getElementById("input");
    


    if (questionNum === 0) {
    
    console.log("Sorry, there's an error! The initialbot function is not expecting the questionNum variable to be zero.");
    
    }
    
    // BEGINNING OF questionNum === 1 SECTION------------------------------
    if (questionNum === 1) {
      if (initialhappinessvalue > 7) {output.innerHTML = 'That\'s great!<br><br><p>I\'m here to help people who are feeling low or have something on their minds. But you\'re feeling good, which is great!</p><p> Why don\'t you go out and have fun! Or if you want to help others who are feeling low, check out these <a href="https://www.google.co.uk/search?q=volunteering+opportunities+near+me+mental+health+sane+mind+rethink+samaritans&oq=volunteering+opportunities+near+me+mental+health+sane+mind+rethink+samaritans&aqs=chrome..69i57.10476j0j9&sourceid=chrome&ie=UTF-8">google search results</a> to find some volunteering opportunities.</p><p>Or maybe you\'re just here to check out this site, which is cool. Why don\'t you try again, but pretend you\'re feeling sad this time! :-) (you can probably do this clicking on Ctrl+r, but don\'t trust anything I say, I\'m just a pretty unintelligent piece of software!)</p>';}
      else if (initialhappinessvalue > 3) {output.innerHTML = '<font size="+3">Sounds like you\'re not quite on top of the world -- shame about that. Is there anything specific on your mind at the moment?</font>';}
      else {output.innerHTML = '<font size="+3">Oh dear, sounds like you\'re feeling really low. Is there anything specific on your mind at the moment?</font>';}
  		// need to give some thought to the responses here. If someone replies with a 7, is this definitely the right response?
  		
  		// if happiness <=7, need to create a variable which will be populated with the something-specific form, then add a new element and populate the new element with this variable
  		if (initialhappinessvalue <= 7) {
  		  
  		  
  		  newContent = `
<form id="somethingSpecificForm"> 
<ul class="multi-choice-form">
  <li><input type="radio" name="somethingSpecific" onchange="somethingSpecificFormResponse();" id="yes-somethingSpecific" value="yes"><label for="yes-somethingSpecific">yes</label></li><br>
  <li><input type="radio" name="somethingSpecific" onchange="somethingSpecificFormResponse();" id="no-somethingSpecific" value="no"><label for="no-somethingSpecific">no</label></li><br><br>
</ul>  
</form> <br>

` // this code puts a form into the newcontent variable

      // next bit of code will call the addElement function, which will then add on an element which contains the new content
      console.log("about to have the the addEleement bit within questionnum = 1");
      addElement();  
  		  
  		}
  	
      
    }
    // END OF questionNum === 1 SECTION------------------------------
    

  // START OF questionNum === 2 SECTION------------------------------
  else if (questionNum === 2) {
      console.log("This is in the 'else if questionnm === 2 ' bit");
      
      
      if (somethingSpecific == "yes") {
        console.log("somethingSpecific = "+somethingSpecific);
        console.log("immediately before incrementing, explainerstepnum ="+explainerStepNum);
        
        explainerStepNum++;       // explainerStepNum is initialised to zero, whenever we call the explainer bot, we always increment explainerStepNum first
        console.log("immediately after incrementing, explainerstepnum ="+explainerStepNum);
        explainerBot();           // this will initiate the bot which will explain how this whole thing works. Once that's done, we move on to the freeTextBot function
     
      }
      
      else if (somethingSpecific == "no") {
        console.log("somethingspcific = no. going to ask do you feel this way often")
      
      
  		  newContent = `
  		    <p>Do you feel this way often?</p>
          <form id="feelThisWayOftenForm"> 
          <ul>
            <li><input type="radio" name="feelThisWayOften" onchange="feelThisWayOftenFormResponse();" id="yes-feelThisWayOften" value="yes"><label for="yes-feelThisWayOften">yes</label></li><br>
            <li><input type="radio" name="feelThisWayOften" onchange="feelThisWayOftenFormResponse();" id="no-feelThisWayOften" value="no"><label for="no-feelThisWayOften">no</label></li><br><br>
          </ul>  
          </form> <br>
          
          ` // this code puts a form into the newcontent variable

      // next bit of code will call the addElement function, which will then add on an element which contains the new content
      console.log("about to have the the addEleement bit within questionnum = 2");
      addElement();  
      
      }
    
    
    }
    // END OF questionNum === 2 SECTION------------------------------


  // START OF questionNum === 3 SECTION------------------------------
  else if (questionNum === 3) {
      console.log("This is in the 'else if questionnm === 3 ' bit");
      
      
      
      
      if (feelThisWayOften == "yes") {
        console.log("feelThisWayOften = yes")
        
        // NEED TO REDO THIS BIT -- T SHOULD INSTEAD GO TO THE FREE TEXT BOT
  		  newContent = `
  		    <p>Feeling this way often sounds rubbish. I'm sorry about that. How long have you been like this?</p>
  		    <input class="tall-box" type="text" id="currentInput" value="" width="1000" rows="4" cols="50" size="80"> <br>
          <form id="howLongForm"> 
          <ul>
            <li><input type="radio" name="howLong" onchange="howLongFormResponse();" id="submit-howLong" value="submit"><label for="submit-howLong">Submit this response</label></li><br>
          </ul>
          </form> <br>
          <br>
          
          ` // this code puts content into the newcontent variable
        console.log("about to have the the addEleement bit within feelthiswayoften = "+feelThisWayOften);
        addElement();  
        
      }
      
      else if (feelThisWayOften == "no") {
        console.log("feelThisWayOften = no. going to ask I'm sorry you're feeling this way at the moment, would you like to tell me more")
      
      
  		  newContent = `
  		    <p>I'm sorry you're feeling this way at the moment, would you like to tell me more?</p>
          <form id="tellMeMoreForm"> 
          <ul>
            <li><input type="radio" name="tellMeMore" onchange="tellMeMoreFormResponse();" id="yes-tellMeMore" value="yes"><label for="yes-tellMeMore">yes</label></li><br>
          </ul>
            
          </form> <br>
          
          ` // this code puts a form into the newcontent variable

      // next bit of code will call the addElement function, which will then add on an element which contains the new content
      console.log("about to have the the addEleement bit within feelthiswayoften = no");
      addElement();  
      
      }
    
    
    }
    // END OF questionNum === 3 SECTION------------------------------



  
  else if (questionNum > 3) {
      console.log("This is in the 'else if questionnm > 3' bit");
    
    
    }

}
// END OF initialbot function------------------------------------------------------------------------------



// THERE NOW FOLLOW SOME FUNCTIONS LINKED TO THE initialBOT FUNCTION --------------------------------------

// I DON'T THINK TIMEDQUESITON IS BEING USED ANY MORE. DELETE THIS???????????
function timedQuestion() {
    // This function was to populate the output div with whatever is in the question variable, and put a text box in the container div.
    // It's called 'timed' because it's intended to be called after a time delay.
    // I think I might be about to make this function redundant
    output.innerHTML = question;
    containerVar.innerHTML = '<br><input type="text" id="input" value="" width="1000" rows="4" cols="50" size="80"> <br><font size="-1">If you want to bring the conversation to an end, just type "stop" in this box. :-)</font>'; // The input bit sets the "container" node of the html structure to have a text box. Tried to make the textbox bigger by making the width wider, but I can't seem to make this happen
}

// I DON'T THINK TIMEDQUESITONNOCONTRAINER IS BEING USED ANY MORE. DELETE THIS???????????
function timedQuestionNoContainer() {
  // This function was to populate the output div with whatever is in the question variable, and put a text box in the container div.
    // I think I might be about to make this function redundant
    output.innerHTML = question;
}



function addElement () {
  // This function is inspired by the content at https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
  // I think it's now quite different from what's on that site
  // The point of the function is to create a new element of the html/DOM and populate it with whatever HTML is in the "newContent" variable
  
  console.log("This is the start of the addelement function")
  
  newDiv = document.createElement("div");   // creates a new div element 
  newDiv.innerHTML = newContent                 // and gives it some content 
  document.body.insertBefore(newDiv,null);      // This inserts the new div before "null" -- the syntax understands this to mean that the div goes at the end
  // latestDiv = document.getElementById(newDiv);  // this is going to be used in the bit of jquery code which interprets hitting the carriage return

}



function somethingSpecificFormResponse() {
  
  console.log("This is the somethingSpecificFormResponse function")
  somethingSpecific = $("#somethingSpecificForm input:checked").val();  // assigns the chosen value from the survey to the variable somethingSpecific
    if (somethingSpecific !== undefined) {  // this is a legacy if statement. Given how the code is now structured, I don't think it's possible for the  variable to be undefined
      questionNum++;
      initialBot();
      }  // runs the bot function as long as a somethingSpecific answer has been selected (and increments questionNum)
    console.log("questionnum has just been incremented. It's now equal to "); console.log(questionNum);
    console.log("something specific variable = "); console.log(somethingSpecific);
  
}


function feelThisWayOftenFormResponse() {
  
  console.log("This is the feelThisWayOftenFormResponse function")
  feelThisWayOften = $("#feelThisWayOftenForm input:checked").val();  // assigns the chosen value from the survey to the variable somethingSpecific
    if (feelThisWayOften !== undefined) {
      questionNum++;
      initialBot();
      }  // runs the bot function as long as a somethingSpecific answer has been selected (and increments questionNum)
    console.log("questionnum has just been incremented. It's now equal to "); console.log(questionNum);
    console.log("feelThisWayOften variable = "); console.log(feelThisWayOften);
  
}



function howLongFormResponse() {
  
  console.log("This is the howLongFormResponse function")
  howLong = $("#howLongForm input:checked").val();  // assigns the chosen value from the survey to the variable 
    if (howLong !== undefined) {  // this is a legacy if statement and should proably be deleted. This whole function is triggered by setting a value to this variable, so I don't think it's possible for it to be undefined
        explainerStepNum++;       // explainerStepNum is initialised to zero, whenever we call the explainer bot, we always increment explainerStepNum first
        explainerBot();           // this will initiate the bot which will explain how this whole thing works. 
      }  // runs the bot function as long as an answer has been selected (and increments questionNum)
    
  
}




function tellMeMoreFormResponse() {
  
  console.log("This is the tellMeMoreFormResponse function")
  tellMeMore = $("#tellMeMoreForm input:checked").val();  // assigns the chosen value from the survey to the variable 
    if (tellMeMore !== undefined) {  // this is a legacy if statement and should proably be deleted. This whole function is triggered by setting a value to this variable, so I don't think it's possible for it to be undefined
        console.log("tellMeMore = "+tellMeMore);
        explainerStepNum++;       // explainerStepNum is initialised to zero, whenever we call the explainer bot, we always increment explainerStepNum first
        explainerBot();           // this will initiate the bot which will explain how this whole thing works. 
      }  // runs the bot function as long as an answer has been selected (and increments questionNum)
    
  
}




// THIS IS THE END OF THE FUNCTIONS LINKED TO THE BOT FUNCTION -------------------------------------------------------------------



// THIS IS THE BEGINNING OF THE EXPLAINER BOT SECTION ----------------------------------------------------------------------------


function explainerBot() {
  // The explainer bot explains to the user how this bot works
  // The explainer bot gets called at a certain specified point in the user journey
  
  console.log("In the explainerBot");
  
  // Start of explainer step num === 1 section
  if (explainerStepNum === 1){ 
    
    console.log("In the explainerBot, specifically in explainerstepnum=1 if statement");
    
    newContent = `
    
    <p>I'd love to hear you say more about that. Before we do that, would you like me to explain about how this chatbot works?</p><br>

    <form id="explainHowForm"> 
    <ul>
      <li><input type="radio" name="explainHow" onchange="explainHowFormResponse();" id="yes-explainHow" value="yes"><label for="yes-explainHow">yes</label></li><br>
      <li><input type="radio" name="explainHow" onchange="explainHowFormResponse();" id="no-explainHow" value="no"><label for="no-explainHow">no, skip this</label></li><br><br>
    </ul>
    </form> <br>

    ` // this code puts new content into the newcontent variable // need to think about what should happen if the somethingSpecific answer is no
    
    addElement();  
    
  } // End of explainer step num === 1 section

  
  // Start of explainer step num === 2 section
  else if (explainerStepNum === 2){ 
    
    if (explainHow == "no"){
      
      console.log("the user has said no to the 'shoudl i explain how this works' question.");
      
      freeTextStepNum++;console.log("freetetstepno = "+freeTextStepNum); freeTextBot(); // this is where we move onto the next bot function // always need to increment the step num before calling the bot
      
    }    
    
    if (explainHow == "yes"){
    
      newContent = `
      
      <p>So here's the thing: I'm a pretty simple piece of software. So please do keep talking to me, but I'm afraid I won't do a very good job of understanding.</p><p>Instead think of this as being more like writing a journal, but as you keep writing, I'll be here to encourage you to keep talking.</p> <p> Are you still OK to talk with me, even though I'm only simple?</p><br>
  
      <form id="okWithSimpleForm"> 
      <ul>
        <li><input type="radio" name="okWithSimple" onchange="okWithSimpleFormResponse();" id="yes-okWithSimple" value="yes"><label for="yes-okWithSimple">yes, I'll talk with you, even though you're simple</label></li><br>
      </ul>  
      </form> <br>
      
      ` // this code puts new content into the newcontent variable
    
      addElement();
    } // end of if explainHow = yes section
   
   
  } // End of explainer step num === 2 section
  
  
  
  
  // Start of explainer step num === 3 section
  else if (explainerStepNum === 3){ 
    
    
    /*
    // USED TO GIVE THE USER THE OPTION TO SAY NO TO THE CONFIDENTIALITY QUESTION
    if (confidentiality == "no"){
      console.log("the user has said no to the 'woudl you like to know about conifdenitality' question");
      freeTextStepNum++; freeTextBot(); // Moving onto the free text bit // always need to increment the step num before calling the bot
    }    
    */
    
    if (okWithSimple == "yes"){
    
      newContent = `
      
      <p> Would you like to know about confidentiality?</p><br>
      
      <form id="confidentialityForm"> 
      <ul>
        <li><input type="radio" name="confidentiality" onchange="confidentialityFormResponse();" id="yes-confidentiality" value="yes"><label for="yes-confidentiality">yes, tell me about confidentiality</label></li><br>
      </ul>
      </form> <br>
      
      ` // this code puts new content into the newcontent variable
    }
    
    addElement(); // and now add a div at the end which incldues this newcontent
   
   
  } // End of explainer step num === 3 section
  
  
  // Start of explainer step num === 4 section
  else if (explainerStepNum === 4){ 
    
    
    /*
    // USED TO GIVE THE USER THE OPTION TO SAY NO TO THE CONFIDENTIALITY QUESTION
    if (confidentiality == "no"){
      console.log("the user has said no to the 'woudl you like to know about conifdenitality' question");
      freeTextStepNum++; freeTextBot(); // Moving onto the free text bit // always need to increment the step num before calling the bot
    }    
    */
    
    if (confidentiality == "yes"){
    
      newContent = `
      
      <p>We don't store your text. So there's no possibility of a human reading what you write. Some people like this -- it means it's totally confidential. It also means that if you say that you're unsafe nobody will be able to act on that information.</p> <p>We do intend to keep the responses to the scores about how you feel though, because that will help us to understand if this is helping. We don't ask for much when we provide this service -- we don't charge you and we won't sell your data to anyone -- but we do ask you to provide feedback by filling in the form before you leave. Is that OK?</p><br>
  
      <form id="agreeingToFillInSurveyForm"> 
      <ul>
        <li><input type="radio" name="agreeingToFillInSurvey" onchange="confidentialityFormResponse();" id="yes-agreeingToFillInSurvey" value="yes"><label for="yes-agreeingToFillInSurvey">yes, I'll fill in the survey at the end</label></li><br>
      </ul>
      </form> <br>
      
  
      ` // this code puts new content into the newcontent variable
    }
    
    addElement();
   
   
  } // End of explainer step num === 4 section
  
  
  else if (explainerStepNum === 5){ 
    console.log("now in the explainerStepNum === 5 bit");
    freeTextStepNum++; freeTextBot(); // Moving onto the free text bit// always need to increment the step num before calling the bot
  }
  

} // END OF ExplainerBot function -------------------


// THERE NOW FOLLOW SOME FUNCTIONS WHICH ARE CALLED BY THE EXPLAINER BOT



function explainHowFormResponse() {
  
  console.log("This is the explainHowFormResponse function")
  explainHow = $("#explainHowForm input:checked").val();  // assigns the chosen value from the survey to the variable. Actually this isn't being used!
      explainerStepNum++;
      explainerBot();
      
    console.log("explainerStepNum has just been incremented. It's now equal to "+explainerStepNum);
    console.log("explainHow variable = "+explainHow);
  
}




function okWithSimpleFormResponse() {
  
  console.log("This is the okWithSimpleFormResponse() function");
  console.log("explainerStepNum is about to be incremented. It's now equal to "+explainerStepNum);
  okWithSimple = $("#okWithSimpleForm input:checked").val();  // assigns the chosen value from the survey to the variable. Actually this isn't being used!
      explainerStepNum++;
      explainerBot();
      
    console.log("explainerStepNum has just been incremented. It's now equal to "+explainerStepNum);
    console.log("okWithSimple variable = "+okWithSimple);
  
}



function confidentialityFormResponse() {
  
  console.log("This is the confidentialityFormResponse function")
  confidentiality = $("#confidentialityForm input:checked").val();  // assigns the chosen value from the survey to the variable
      explainerStepNum++;
      explainerBot();
      
    console.log("explainerStepNum has just been incremented. It's now equal to "); console.log(explainerStepNum);
    console.log("confidentiality variable = "); console.log(confidentiality);
  
}






// THIS IS THE END OF THE EXPLAINER BOT SECTION ----------------------------------------------------------------------------------





// THIS IS THE START OF THE FREE TEXT BOT SECTION ----------------------------------------------------------------------------------



function freeTextBot() {
  
  
  
  var response;  
  // Beginning of text field variables -------------
  // These text field variables are split into several parts. This is so that I can later concatenate them with a number so that the code recognises different forms as different
  var textFieldTwoResponsesPartOne = `
  <input class="tall-box" type="text" id="currentInput" value="" width="1000" rows="4" cols="50" size="80"> <br>
  <form id="freeTextForm`
  var textFieldTwoResponsesPartTwo = `"> 
  <ul>
    <li><input type="radio" name="freeText" onchange="freeTextFormResponse();" id="submit-freeText`
  var textFieldTwoResponsesPartThree =                                                              `" value="submit"><label for="submit-freeText`
  var textFieldTwoResponsesPartFour =                                                                                                             `">Submit this response (and I have more to say)</label></li><br>
    <li><input type="radio" name="freeText" onchange="freeTextFormResponse();" id="enough-freeText`
  var textFieldTwoResponsesPartFive =                                                              `" value="enough"><label for="enough-freeText`
  var textFieldTwoResponsesPartSix =                                                                                                             `">OK, I feel I've answered your question now</label></li><br><br>
    <li><input type="radio" name="freeText" onchange="freeTextFormResponse();" id="stop-freeText`
  var textFieldTwoResponsesPartSeven =                                                              `" value="stop"><label for="stop-freeText`
  var textFieldTwoResponsesPartEight =                                                                                                       `">Stop using this bot</label></li><br>
  </ul>
  </form> <br>
  ` // this is the text box into which the user can write their response // immediately after the <input type="text" ...> section I previously included this bit of code: <font size="-1">If you want to bring the conversation to an end, just type "stop" in this box. :-)</font>   || have now taken that out because there are radio buttons under the text field instead
  
  
  /* This is the version of the variable that I created which was then followed by the "never-enough" bug
  var textFieldTwoResponsesPartTwo = `"> 
  <ul>
    <li><input type="radio" name="freeText" onchange="freeTextFormResponse();" id="submit-freeText" value="submit"><label for="submit-freeText">Submit this response (and I have more to say)</label></li><br>
    <li><input type="radio" name="freeText" onchange="freeTextFormResponse();" id="enough-freeText" value="enough"><label for="enough-freeText">OK, I feel I've answered your question now</label></li><br><br>
    <li><input type="radio" name="freeText" onchange="freeTextFormResponse();" id="stop-freeText" value="stop"><label for="stop-freeText">Stop using this bot</label></li><br>
  </ul>
  </form> <br>
  ` // this is the text box into which the user can write their response // immediately after the <input type="text" ...> section I previously included this bit of code: <font size="-1">If you want to bring the conversation to an end, just type "stop" in this box. :-)</font>   || have now taken that out because there are radio buttons under the text field instead
  */
  
  
  /*This is the version BEFORE I introduced the bug
  var textFieldTwoResponsesPartTwo = `">
    <input type="radio" name="freeText" onchange="freeTextFormResponse();" value="submit">Submit this response (and I have more to say)<br>
    <input type="radio" name="freeText" onchange="freeTextFormResponse();" value="enough">OK, I feel I've answered your question now<br><br>
    <input type="radio" name="freeText" onchange="freeTextFormResponse();" value="stop">Stop using this bot<br>
  </form> <br>
  ` // this is the text box into which the user can write their response // immediately after the <input type="text" ...> section I previously included this bit of code: <font size="-1">If you want to bring the conversation to an end, just type "stop" in this box. :-)</font>   || have now taken that out because there are radio buttons under the text field instead
  */
  
  
  
  
  var textFieldOneResponsePartOne = `
  <input class="tall-box" type="text" id="currentInput" value="" width="1000" rows="4" cols="50" size="80"> <br>
  <form id="freeTextForm`
  var textFieldOneResponsePartTwo = `"> 
  <ul>
    <li><input type="radio" name="freeText" onchange="freeTextFormResponse();" id="submit-freeText`
  var textFieldOneResponsePartThree =                                                               `" value="enough"><label for="submit-freeText`
  var textFieldOneResponsePartFour =                                                                                                               `">Submit this response</label></li><br><br>
    <li><input type="radio" name="freeText" onchange="freeTextFormResponse();" id="stop-freeText`
  var textFieldOneResponsePartFive =                                                              `" value="stop"><label for="stop-freeText`
  var textFieldOneResponsePartSix =                                                                                                      `">I want to stop using this bot now, let me fill in the final (very quick) survey</label></li><br>
  </ul>
  </form> <br>
  ` // this is the text box into which the user can write their response // immediately after the <input type="text" ...> section I previously included this bit of code: <font size="-1">If you want to bring the conversation to an end, just type "stop" in this box. :-)</font>   || have now taken that out because there are radio buttons under the text field instead
  // End of text field variables -------------------
  
  // i think this withinsteptwo variable probably isn't being used any more, so maybe delete this
  var freeTextStepNumWithinStepTwo = 0; // step two includes multiple substeps, which are tracked with this variable
  
  
  if (freeTextStepNum === 0) {
    console.log("freestep num = "+freeTextStepNum);
    console.log("Error!! Not expecting to have freeTextStepNum equal to zero when freeTextBot is called");
  }
  

  
  
    // This is the "if free step step num ==1" section. It's where we round up the bit where we've explained the service (or at least offered to) and then get back to asking them about what's their mind
    if (freeTextStepNum === 1 && freeText != "stop") {
      console.log("This is: in freetextbot, something specific =yes, freetextstep num = "+freeTextStepNum);
      
      
      if (somethingSpecific == "yes"){    
        response = `<p>You said before that there was something specific on your mind. Could you please tell me more about that?</p><br>`
      }
      else if (somethingSpecific == "no"){    
        response = `<p>I know you said before that you don't have anything specific on your mind. So I'm just going to give you some space here to talk openly about whatever you would like to discuss. Totally up to you, whatever you want to talk about.</p><br>`
      }
      else {console.log("ERROR! expecting the somethingspecific variable to be set to either yes or no");}
      
      newContent = response + textFieldTwoResponsesPartOne + freeTextStepNum + textFieldTwoResponsesPartTwo + freeTextStepNum + textFieldTwoResponsesPartThree + freeTextStepNum + textFieldTwoResponsesPartFour + freeTextStepNum + textFieldTwoResponsesPartFive + freeTextStepNum + textFieldTwoResponsesPartSix + freeTextStepNum + textFieldTwoResponsesPartSeven + freeTextStepNum + textFieldTwoResponsesPartEight; // concatenates the response (see the comment near where these variables are declared for more on this) 
      addElement();
      console.log("addelement has just been called within freetextbot, something specific =yes, freetextstep num = "+freeTextStepNum);
    
    } // this closes the if free step step num ==1 section (within if something specific = yes)
    
    
    // This is the if free step step num >1 section. This is where most of the bot's activity happens
    if (freeTextStepNum > 1 && freeText != "stop") {  // need to have the && freeText != "stop" bit, otherwise when the user selects "stop", we still go into this code and we put out a response
      console.log("This is: in freetextbot, something specific =yes, freetextstep num = "+freeTextStepNum);
      
      // in the section we give the user space to explain what's on their mind. this continues until they have indicated that they have finsihed saying their piece  
      if (finishedAnsweringTheQuestion === 0) {
        console.log("This is: in freetextbot, something specific =yes, freetextstep num = "+freeTextStepNum+" finishedAnsweringTheQuestion = "+finishedAnsweringTheQuestion);
        
        console.log("previousrand and rand: "+previousrand+rand+" and freetextstepnum = "+freeTextStepNum); 
        while (rand == previousrand) {          // the while loop is make sure that the response given is not the same as last time
          rand = Math.floor(Math.random()*4+1 )
        }
        console.log("previousrand and rand after the while loop which sets the value of rand: "+previousrand+rand+" and freetextstepnum = "+freeTextStepNum); 
        previousrand = rand;                   // updating the value of previousrand so that when we come round to the previous few lines again, it's based on the most up to date values
        if (rand == 1) {response = `<p>I'm still listening, so feel free to say more.</p><br>`}
        else if (rand == 2) {response = `<p>Go on, I'm still here.</p><br>`}
        else if (rand == 3) {response = `<p>Keep talking, I'll be here for as long as you need me.</p><br>`}
        else if (rand == 4) {response = `<p>I hear you. Keep going, I'm really happy for you to continue talking for as long as you need.</p><br>`}
        
        newContent = response + textFieldTwoResponsesPartOne + freeTextStepNum + textFieldTwoResponsesPartTwo + freeTextStepNum + textFieldTwoResponsesPartThree + freeTextStepNum + textFieldTwoResponsesPartFour + freeTextStepNum + textFieldTwoResponsesPartFive + freeTextStepNum + textFieldTwoResponsesPartSix + freeTextStepNum + textFieldTwoResponsesPartSeven + freeTextStepNum + textFieldTwoResponsesPartEight; // concatenates the response (see the comment near where these variables are declared for more on this) 
        console.log("about to call addelement within the finishedansweringtheq = 0, freetextstepnum>1, and freetext != stop section");
        addElement();
        
        
      }
      
      // once they have finished answering the question, we ask the user how do they feel about that?
      else if (finishedAnsweringTheQuestion === 1) {
        
        console.log("This is: in freetextbot, something specific =yes, freetextstep num = "+freeTextStepNum+" finishedAnsweringTheQuestion = "+finishedAnsweringTheQuestion);
        
        while (rand == previousrand) {          // the while loop is make sure that the response given is not the same as last time
          rand = Math.floor(Math.random()*2+1 )
        }
        previousrand = rand;                   // updating the value of previousrand so that when we come round to the previous few lines again, it's based on the most up to date values
        if (rand == 1) {response = `<p>Thanks for telling me about that. How does that make you feel?</p><br>`}
        else if (rand == 2) {response = `<p>How do you feel about that?</p><br>`}
        
        newContent = response+textFieldOneResponsePartOne+freeTextStepNum+textFieldOneResponsePartTwo+freeTextStepNum+textFieldOneResponsePartThree+freeTextStepNum+textFieldOneResponsePartFour+freeTextStepNum+textFieldOneResponsePartFive+freeTextStepNum+textFieldOneResponsePartSix // concatenates the response (as specified just above) with the textField 
        console.log("about to call addelement within the finishedansweringtheq = 1, freetextstepnum>1, and freetext != stop section");
        addElement();
        
      }
      
      
      // having asked the user how they feel, we give them the option to go back and say more
      else if (finishedAnsweringTheQuestion === 2) {
        
        console.log("now in the finishedanwsering the q = 2 bit");
        while (rand == previousrand) {          // the while loop is make sure that the response given is not the same as last time
          rand = Math.floor(Math.random()*3+1 )
        }
        previousrand = rand;                   // updating the value of previousrand so that when we come round to the previous few lines again, it's based on the most up to date values
        if (rand == 1) {response = `<p>Thanks for sharing that about how you feel. Do please say more if you'd like to - either about the same topic or something completely different?</p><br>`}
        else if (rand == 2) {response = `<p>Thank you for sharing that. Do feel free to keep on talking about anything you have on your mind.</p><br>`}
        else if (rand == 3) {response = `<p>Thank you for sharing. Like I said before, I'm a pretty simple bot and my ability to understand is limited, but I hope that what you've said isn't too bad.</p><br>`}
        
        newContent = response + textFieldTwoResponsesPartOne + freeTextStepNum + textFieldTwoResponsesPartTwo + freeTextStepNum + textFieldTwoResponsesPartThree + freeTextStepNum + textFieldTwoResponsesPartFour + freeTextStepNum + textFieldTwoResponsesPartFive + freeTextStepNum + textFieldTwoResponsesPartSix + freeTextStepNum + textFieldTwoResponsesPartSeven + freeTextStepNum + textFieldTwoResponsesPartEight; // concatenates the response (see the comment near where these variables are declared for more on this) 
        console.log("about to call addelement within the finishedansweringtheq = 2, freetextstepnum>1, and freetext != stop section");
        addElement();
        
        finishedAnsweringTheQuestion = 0; // this takes us back round the loop
        
      }
      
      else { // ie if finsihedasneringtheq variable doesn't equal one of the appropriate values (0,1,2)
        console.log("Error!!!!! the finishedAnsweringTheQuestion variable isn't set appropriately!");
      }
      
    

    } // this closes the if free step step num >1 section (within if something specific = yes)
    


  
  

  if (freeText == "stop") {
    
    
    newContent = `
    <h3>Thank you!</h3>
    <p>Thank you for using this bot. It would really help if you could say how you feel now.</p>
    
    <form id="finalsurvey" name="finalsurvey" data-netlify="true" method="POST"> 
    <ul>
      <li><input type="radio" name="finalhappinessvalue" id="1" value=1><label for="1">1</label></li><br>
      <li><input type="radio" name="finalhappinessvalue" id="2" value=2><label for="2">2</label></li><br>
      <li><input type="radio" name="finalhappinessvalue" id="3" value=3><label for="3">3</label></li><br>
      <li><input type="radio" name="finalhappinessvalue" id="4" value=4><label for="4">4</label></li><br>
      <li><input type="radio" name="finalhappinessvalue" id="5" value=5><label for="5">5</label></li><br>
      <li><input type="radio" name="finalhappinessvalue" id="6" value=6><label for="6">6</label></li><br>
      <li><input type="radio" name="finalhappinessvalue" id="7" value=7><label for="7">7</label></li><br>
      <li><input type="radio" name="finalhappinessvalue" id="8" value=8><label for="8">8</label></li><br>
      <li><input type="radio" name="finalhappinessvalue" id="9" value=9><label for="9">9</label></li><br>
      <li><input type="radio" name="finalhappinessvalue" id="10" value=10><label for="10">10</label></li><br><br>
      <li><input type="submit" class="form-submit-button">
    </ul>
    </form> <br>

<input name="form-name" value="finalsurvey" type="hidden" />
    
    `;				  // 
    addElement();
    
    finalhappinessvalue = $("#finalsurvey input:checked").val();  // assigns the chosen value from the survey to the variable final happinessvalue
    
    datalog(questionNum, finalhappinessvalue);
    
  } // this closes the freetext == "stop" if statement
    
    
  

} // this is the end of the free ttext bot function



function freeTextFormResponse() {
  
  console.log("This is the freeTextFormResponse function")
  freeText = $("#freeTextForm"+freeTextStepNum+" input:checked").val();  // assigns the chosen value from the survey to the variable !! including the digit 1 here is temporary
  console.log("here's the bit that is feeding into the freetext variable:"+"#freeTextForm"+freeTextStepNum+" input:checked");
  console.log("here's the freetext variable:"+freeText);
  
      if (freeText == "submit" && finishedAnsweringTheQuestion === 0){ // we're sticking to finishedanswering the q == 0 becuase we only want this bit of code to be called during the bit whree the user is using a free text bit
      // previously included this line when there was potentially multiple responses happening within step 2 || if (!(somethingSpecific == "yes" && freeTextStepNum === 2)) {freeTextStepNum++;} // would normally increment freeTextStepNum, but want to loop back to the same place this time, so deliberately not incrementing
        freeTextStepNum++; freeTextBot(); // always need to increment the step num before calling the bot. this line takes us back to the bot function for the next stage
      }
      else if (freeText == "enough" && finishedAnsweringTheQuestion === 0){  // if finishedAnsweringTheQuestion is >0,
        console.log("freeText variable equals enough");
        finishedAnsweringTheQuestion++;
        freeTextStepNum++; freeTextBot(); // always need to increment the step num before calling the bot. this line takes us back to the bot function for the next stage
      }
      
      else if (freeText == "enough" && finishedAnsweringTheQuestion === 1){ // we're sticking to finishedanswering the q == 0 becuase we only want this bit of code to be called during the bit whree the user is using a free text bit
      // previously included this line when there was potentially multiple responses happening within step 2 || if (!(somethingSpecific == "yes" && freeTextStepNum === 2)) {freeTextStepNum++;} // would normally increment freeTextStepNum, but want to loop back to the same place this time, so deliberately not incrementing
        console.log("freeText variable equals enough and finished asns the q = 1");
        finishedAnsweringTheQuestion++;
        freeTextStepNum++; freeTextBot(); // always need to increment the step num before calling the bot. this line takes us back to the bot function for the next stage
      }
      
      else if (freeText == "stop") {
        freeTextStepNum++; freeTextBot(); // always need to increment the step num before calling the bot. this line takes us back to the bot function for the next stage
      }
      
      else {
        console.log("ERROR!! This is not an expected scenario! This is coming up in the freetextformresponse function.");
      }
      
      
    console.log("free Text StepNum has just been incremented. It's now equal to "+freeTextStepNum);
    console.log("freeText variable = "+freeText);
    console.log("finishedAnsweringTheQuestion = "+finishedAnsweringTheQuestion);
  
}





// THIS IS THE END OF THE FREE TEXT BOT SECTION ----------------------------------------------------------------------------------





// THERE NOW FOLLOW A FEW MISCELLANEOUS JQUERY THINGS ---------------------------------------------------------------------------


// SHOULD I DELETE OUT THE BELOW SECTION?????????
//push enter key (using jquery), to run bot function if we're in "container" i.e. the text box
$(containerVar).keypress(function(e) {
  if (e.which == 13) {
    questionNum++;																		// increase questionNum count by 1
    initialBot();																			// run bot function when enter key pressed
    
  }

});
// SHOULD I DELETE OUT THE ABOVE SECTION?????????




// using jquery to assign the chosen value from the survey to the variable initialhappinessvalue, and then run the bot function when user clicks on submit
$("#initialsurvey").submit(function(e) {
    e.preventDefault();  // adding this comment in much later, and I can't remember why this is here
    console.log(e);
    initialhappinessvalue = $("#initialsurvey input:checked").val();  // assigns the chosen value from the survey to the variable initialhappinessvalue
    if (initialhappinessvalue !== undefined) {
      datalog(questionNum, initialhappinessvalue); // logs the initial happiness value and notes htat the questionnum is zero
      questionNum++;                               // we always icnrement the questionnum before running the bot
      initialBot();                               // runs the bot function as long as a initialhappinessvalue has been selected (and increments questionNum)
    }  
});



function datalog(question, extraInfo) {
   $.get('https://lg.good-loop.com/lg?d=sogive&t=input&p.q='+escape(question)
      +(extraInfo? '&p.xtra='+escape(extraInfo) : ''));
}



// --------------------------------EXIT INTENT--------------------------------------------------------
// NOTE TO SELF, WANT TO ADD SOMETHING ABOUT EXIT INTENT
// This is to make sure people fill in the survey before they leave
// COULD USE THIS: http://qnimate.com/exit-intent-using-javascript/
// OR COULD CONSIDER A FREE TRIAL WITH https://www.optimonk.com/
// SEEMS TO BE SOME USEFUL STUFF HERE TOO: https://medium.com/@acoyfellow/what-is-exit-intent-detection-efd4f9740105


// --------------------------------Setting past textboxes to readonly---------------------------------
// I suspect I will want to do this at some point. 
// guidance on this is here: https://stackoverflow.com/questions/21034939/set-textbox-to-readonly-and-background-color-to-grey-in-jquery



// --------------------------------AUTO-SCROLLING TO THE RIGHT BIT -----------------------------------
// https://www.w3schools.com/jsref/met_element_scrollintoview.asp

// --------------------------------Fancier buttons   -------------------------------------------------
// I tried looking at this:  https://codepen.io/AngelaVelasquez/pen/BWXbxP
// I think these might be called svg buttons, if that's the right term




