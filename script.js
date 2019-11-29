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

function playSound(e){
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
  const audio = sounds.find(({key}) => key == e.keyCode)
  if (!audio) return; // stop the function
  audio.sound.play();
  key.classList.add('playing');
};

function removeTransition(e){
  if(e.propertyName !== 'transform') return;
  this.classList.remove('playing');
};


const sounds = [];
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    const keyCode = parseInt(key.getAttribute('data-key'));
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    key.addEventListener('transitionend', removeTransition)
    sounds.push({key: keyCode, sound: new Switcher(audio, 5)})
    });
console.log(sounds)
window.addEventListener('keydown', playSound);