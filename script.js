'use strict';
const outerContainer=document.querySelector('.container-outer');
const startBtn=document.querySelector('.ready');
const getStarted=document.getElementById('get-started');
const timer=document.querySelector('.timer');
const container=document.querySelector('.container');
outerContainer.classList.add('hidden');
startBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  outerContainer.classList.remove('hidden');
  getStarted.innerHTML='';
  getStarted.style.height='0px';
  if(!outerContainer.classList.contains('hidden')){
      startTimer(30);
  }
});
const startTimer=(seconds)=>{
    let timeLeft = seconds;
    const intervalId = setInterval(()=>{
      const minutes = Math.floor(timeLeft/60);
      const sec = timeLeft%60;
      timer.textContent=`${minutes.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
      if(timeLeft==0){
        timer.textContent="Time's up!";
        container.style.opacity=0.5;
        container.style.pointerEvents='none';
      }
      timeLeft--;
    },1000);
}
document.addEventListener('keydown',(e)=>{
    e.preventDefault();
    let i=0,string=container.innerHTML;
    console.log(string);
});