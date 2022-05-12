//사용변수
const GAME_TIMER=6;
let score=0;
let time=GAME_TIMER;
let isPlaying=false;
let timeInterval;
let checkInterval;
let words=[];

const wordInput = document.querySelector('.word-input');
const wordDisplay=document.querySelector('.word-display');
const scoreDisplay=document.querySelector('.score');
const timeDisplay=document.querySelector('.time');
const button=document.querySelector('.button');

init();

function init(){
    buttonChange('게임로딩중...');
    getWords();
    wordInput.addEventListener('input',checkMatch);
}

//게임 실행
function run(){
    if(isPlaying){
        return;
    }
    isPlaying=true;
    time=GAME_TIMER;
    wordInput.focus();
    scoreDisplay.innerText=0;
    score=0;
   timeInterval= setInterval(countDown,1000);
   checkInterval=setInterval(checkState,50);
   buttonChange('게임중');
}

//단어 정답 체크
function checkMatch(){
    if(wordInput.value.toLowerCase()===wordDisplay.innerText.toLowerCase()){
        wordInput.value="";
        if(!isPlaying){
            return;
        }
        score++;
        scoreDisplay.innerText=score;
        time=GAME_TIMER;
        const randomIndex = Math.floor(Math.random()*words.length)
        wordDisplay.innerText=words[randomIndex]
    }
}

//단어 불러오기
function getWords(){
        axios.get('https://random-word-api.herokuapp.com/word?number=20')
        .then(function (response) {
            response.data.forEach((word)=>{
                if(word.length<8){
                    words.push(word);
                }
            })
            buttonChange('게임시작!!');
        })
        .catch(function (error) {
        console.log(error);
        })
}

function checkState(){
    if(!isPlaying&&time===0){
        buttonChange("게임시작!!")
        clearInterval(checkInterval)
    }
}

function countDown(){
    time>0 ? time--: isPlaying=false;
    if(!isPlaying){
        clearInterval(timeInterval);
        rank(score);
    }
    timeDisplay.innerHTML =time;
}

function buttonChange(text){
    button.innerText=text;
    text==='게임시작!!'?button.classList.remove('loading') : button.classList.add('loading');
}

function rank(score){
    let list=document.querySelector('.rank');
    list.innerHTML+="<li>"+score+"</li>";
    sortList();
}


function sortList() {
   var list, i, switching, b, shouldSwitch;
   list=document.querySelector('.rank');
   switching = true;
  
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("LI");
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
    
      if (b[i].innerHTML < b[i + 1].innerHTML) {
      
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
     
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}


