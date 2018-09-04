/*
Section to change the header
*/

var heroHeader = document.querySelector('.hero h1');
var headerCounter = document.querySelector('.hero .headerCounter');

var headers = [
  "Hi, I'm Kelvin Macharia",
  "I'm a Software Engineer from Nairobi, Kenya",
  "I develop solutions that change businesses",
  "I develop products that create opportunities",
  "On top of all these, I'm fun :-)",
  "Go ahead and contact me, let's build something awesome!!",
];

heroHeader.onmouseover = function(){
  var next = headers.indexOf(heroHeader.innerText) + 1;
  if(next >= headers.length){
    next = 0;
  }
  heroHeader.innerText = headers[next];
  headerCounter.innerText = next+1 + "/" + headers.length ;
}

/*
Section to handle Jokes
*/
var jokesPrompt = document.querySelector('.jokes-prompt');
var chuckJoke = document.querySelector('.chuck-joke');
var randJoke = document.querySelector('.rand-joke');
var jokesContainer = document.querySelector('.joke-container');
var jokeCategories = ['chuck','momma'];

function getJoke(category){
  switch (category) {
    case 'rand':
      loadXMLDoc('https://icanhazdadjoke.com',function(resp){
        randJoke.innerHTML = resp.joke;
      });
      break;
    case 'chuck':
    default:
      loadXMLDoc('https://api.icndb.com/jokes/random',function(resp){
        chuckJoke.innerHTML = resp.value.joke;
      });
      break;
  }
}

(function setAllJokes(){
  getJoke('chuck');
  getJoke('rand');
})();


function noJokes(){
  jokesPrompt.style.display = "none";
}

function displayJokes(){
  jokesContainer.style.display = "block";
  location.href = "#";
  location.href = "#jokes";
}

/**
Function to do ajax get
**/
function loadXMLDoc(url,callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
             var jsonResp = JSON.parse(xmlhttp.responseText);
             callback(jsonResp);
           }
           else if (xmlhttp.status == 400) {
              console.log('There was an error 400');
           }
           else {
               console.log('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Accept','application/json');
    xmlhttp.send();
}
