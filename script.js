/*
  Based on the tutorial by Wes Bos https://www.youtube.com/watch?v=VuN8qwZoego
*/
class Channel {
  audio;
  resource;
  constructor(audio){
    this.audio = audio;
    this.resource = new Audio(audio.src)
  }
  play(){
    this.resource.play()
  }
}

class Switcher {
  channels = [];
  num;
  index;
  constructor(audio, num){
    this.num = num;
    this.index = 0;
    for (let i = 0; i < num; i++){
      this.channels.push(new Channel(audio))
    }
  }
  play(){
    this.channels[this.index++].play();
    this.index = this.index < this.num ? this.index : 0;
  }
}

function keyPress(e){
  playAudio(e.keyCode);
  animateButton(e.keyCode);
}

function mouseClick(e){
  console.log(e)
}

function removeTransition(e){
  if(e.propertyName !== 'transform') return;
  this.classList.remove('playing');
};

function playAudio(keyCode){
  const audio = sounds.find(({key}) => key == keyCode)
  if (!audio) return; // stop the function
  audio.sound.play();
}

function animateButton(keyCode){
  const key = document.querySelector(`.key[data-key="${keyCode}"]`)
  if (!key) return;
  key.classList.add('playing');
}


const sounds = [];
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    const keyCode = parseInt(key.getAttribute('data-key'));
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    key.addEventListener('transitionend', removeTransition)
    key.addEventListener('click', mouseClick)
    sounds.push({key: keyCode, sound: new Switcher(audio, 10)})
    });
window.addEventListener('keydown', keyPress);