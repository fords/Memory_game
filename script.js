if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', ready());
} else{
  ready();
}

class AudioController {
  constructor() {
    this.bgMusic = new Audio('Assets/Audio/creepy.mp3')
    this.flipSound = new Audio('Assets/Audio/flip.wav')
    this.matchSound = new Audio('Assets/Audio/match.wav')
    this.victorySound = new Audio('Assets/Audio/victory.wav')
    this.gameOverSound = new Audio('Assets/Audio/gameover.wav')
    this.bgMusic.volume = .4
  }
  startMusic(){
    this.bgMusic.play()
  }
  stopMusic() {
    this.bgMusic.pause()
    this.bgMusic.currentTime = 0
  }
  flip() {
    this.flipSound.play()
  }
  match() {
    this.matchSound.play()
  }
  victory() {
    this.stopMusic()
    this.victory.play()
  }
  gameOver(){
    this.stopMusic()
    this.gameOverSound.play()
  }
}
class MixOrMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards
    this.totalTime = totalTime
  }
}

function ready(){
  let overlays = Array.from(document.getElementsByClassName('overlay-text'))
  let cards = Array.from(document.getElementsByClassName('card'))
  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible');
      // var audioController = new AudioController()
      // audioController.startMusic()
      // var audio = new Audio('Assets/Audio/creepy.mp3');
      // audio.play();
    })
  })

  cards.forEach ( card => {
    card.addEventListener('click', () =>{

    })
  })
}

// let ex_audio = new AudioController()
