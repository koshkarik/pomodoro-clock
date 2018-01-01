//all site elements
const timer = document.querySelector('.timer');
const breakTimer = document.querySelector('.break p');
const sessionTimer = document.querySelector('.session p');
const brButtons = document.querySelectorAll('.br');
const sessionButtons = document.querySelectorAll('.ses');
const mainText = document.querySelector('.mainText');
const pushText = document.querySelector('.pushText');
const sessionCircle = document.querySelector('.session-timer');
const breakCircle = document.querySelector('.break-timer');
const pomodor = document.querySelector('.pom');
const pushables = document.querySelectorAll('.go');
//usefull variables
let sesNum = 25;
let sessionTime = sesNum * 60;
let breakTime = 5 * 60;
var counting = null;
let sesDisp = 25;
let brDisp = 5;
let check = true;
let endStart = true;
var workRestFlag = false;
let lightInd = true;


//function to start or stop timer
function countTimer(){
  check = !check;
  workRestFlag = !workRestFlag;
  mainText.style.opacity = '0';
  
  //timeout for smoother text change
  setTimeout(function() {
    mainText.style.opacity = '1';
    
  }, 150);
  
  if(workRestFlag) {
    if(endStart) {
      mainText.textContent = "let's work";
      sessionCircle.style.backgroundColor = "#31a437";
    } else {
      mainText.textContent = "rest time";
      breakCircle.style.backgroundColor = "#a7195e";
    }
    pushText.textContent = "push to stop";
    
    //setting 1 sec interval for countdown
    counting = setInterval(function(){
    sessionTime -= 1;
      if(endStart) {
        sessionCircle.style.backgroundColor = "#31a437";
      }
    
      if (sessionTime === 0 && endStart) {
      breakCircle.style.backgroundColor = "#a7195e";
      sessionCircle.style.backgroundColor = "#3D9970";
      endStart = !endStart;
      mainText.textContent = "rest time";
      sessionTime = brDisp * 60;
    } 
      else if (sessionTime === 0 && !endStart) {
      endStart = !endStart;
        breakCircle.style.backgroundColor = "#85144b";
      sessionCircle.style.backgroundColor = "#31a437";
      mainText.textContent = "let's work";
      sessionTime = sesDisp * 60;
    }
      
      if(sessionTime <= 10 && sessionTime % 2 !== 0) {
        pomodor.style.backgroundColor = "#001f3f";
        console.log(1111);
        
      }
      if(sessionTime <= 10 && sessionTime % 2 == 0) {
        pomodor.style.backgroundColor = "#00458C";
        console.log(22222);
        
      }
    
    let minutes = Math.floor(sessionTime / 60);
    let seconds = sessionTime % 60;
    
    if(seconds < 10) {
      seconds = "0" + seconds;
    }
      timer.textContent = minutes + ":" + seconds;
    
  }, 1000);
    
  } else if(!workRestFlag) {
    sessionCircle.style.backgroundColor = "#3D9970";
    breakCircle.style.backgroundColor = "#85144b";
    pushText.textContent = "push to start";
    mainText.textContent = "go";
    clearInterval(counting);
  }
  
}

//function to handle session control area
function setSession(e) {
 if (check) {
    check = true;
    endStart = true;
    workRestFlag = false;
    var value = e.target.dataset.time;
    
  if (value === "1") {
      sesDisp += 1;
      sessionTime =  sesDisp * 60;
      displayTime();
      displaySes();
  } else {
      if(sesDisp <= 1) {
        return;
      }
      sesDisp -= 1;
      sessionTime = sesDisp * 60;
      displayTime();
      displaySes();
    } 
 } else {
    return;
  }
}

//function to handle break area
function setBreak(e) {
 if(check) {
    var value = e.target.dataset.time;
    console.log(value);
  if(value === "1") {
      brDisp += 1;
      displayBr();
    if(!endStart) {
      sessionTime = brDisp * 60;
      displayTime();
    }
  } else {
      if(brDisp <= 1) {
        return;
      }
      brDisp -= 1;
      displayBr();
       if(!endStart) {
         sessionTime = brDisp * 60;
         displayTime();
       }
    } 
 } else {
    return;
  }
}


//some stupid functions 
function displayTime() {
  timer.textContent = sessionTime / 60 + ":" + "00";
}
function displaySes() {
  sessionTimer.textContent = sesDisp;
}
function displayBr() {
  breakTimer.textContent = brDisp;
}

function onSpace(e) {
  if(e.keyCode === 32) {
    e.preventDefault();
    countTimer();
  } else {
    return;
  }
}


// all event listeners
mainText.addEventListener('click', countTimer);

pushables.forEach(elem => elem.addEventListener('click', countTimer));

sessionButtons.forEach(btn => {
  btn.addEventListener('click', setSession);
});

brButtons.forEach(btn => {
  btn.addEventListener('click', setBreak);
});

document.addEventListener('keydown', onSpace); 


