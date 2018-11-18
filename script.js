

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
    this.victorySound.play()
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
    this.timeRemaining = totalTime
    this.timer = document.getElementById('time-remaining')
    this.ticker = document.getElementById('flips')
    this.audioController = new AudioController()
  }
  startGame(){
    this.cardToCheck = null
    this.totalClicks = 0
    this.timeRemaining = this.totalTime
    this.matchedCards = []
    this.busy = true
    document.getElementById("status1").innerText = ("Time: ")
    document.getElementById("status2").innerText = ('Moves: ')
    document.getElementById("star1").style.visibility = "hidden";
    document.getElementById("star2").style.visibility = "hidden";
    document.getElementById("star3").style.visibility = "hidden";
    document.getElementById("star4").style.visibility = "hidden";
    document.getElementById("star5").style.visibility = "hidden";
    document.getElementById("star1").classList.remove("unchecked");
    document.getElementById("star1").classList.add("checked");
    document.getElementById("star2").classList.remove("unchecked");
    document.getElementById("star2").classList.add("checked");
    document.getElementById("star3").classList.remove("unchecked");
    document.getElementById("star3").classList.add("checked");
    document.getElementById("star4").classList.remove("unchecked");
    document.getElementById("star4").classList.add("checked");
    document.getElementById("star5").classList.remove("unchecked");
    document.getElementById("star5").classList.add("checked");

    setTimeout(() => {
      this.audioController.startMusic()
      this.shuffleCards()
      this.countdown = this.startCountdown()
      this.busy = false
    }, 500)
    this.hideCards()
    this.timer.innerText = this.timeRemaining
    this.ticker.innerText = this.totalClicks
    //this.victory()
  }
  hideCards() {
    this.cardsArray.forEach(card => {
      card.classList.remove('visible')
      card.classList.remove('matched')
    })
  }
  startCountdown(){
    return setInterval(() => {
      this.timeRemaining--
      this.timer.innerText = this.timeRemaining
      if ( this.timeRemaining === 0 ){
          this.gameOver()
          // this.victory()
      }
    },1000)
  }
  gameOver() {
    clearInterval(this.countdown)
    this.audioController.gameOver()
    document.getElementById('game-over-text').classList.add('visible')
  }

  victory() {
    clearInterval(this.countdown)
    this.audioController.victory()
    var time_play = this.totalTime - this.timeRemaining
    document.getElementById('victory-text').classList.add('visible')
    document.getElementById("status1").innerText += ' '+ time_play +' sec(s)'
    this.hideCards()
    document.getElementById("status2").innerText += ' '+ this.totalClicks
    document.getElementById("star1").style.visibility = "visible";
    document.getElementById("star2").style.visibility = "visible";
    document.getElementById("star3").style.visibility = "visible";
    document.getElementById("star4").style.visibility = "visible";
    document.getElementById("star5").style.visibility = "visible";

    if (this.totalTime - this.timeRemaining < 30 && this.totalClicks < 30) {
    }
    else if (this.totalTime - this.timeRemaining < 40 && this.totalClicks < 40) {
       document.getElementById("star5").classList.remove("checked");
       document.getElementById("star5").classList.add("unchecked");
    }
    else if (this.totalClicks < 50) {
       document.getElementById("star4").classList.remove("checked");
       document.getElementById("star4").classList.add("unchecked");
       document.getElementById("star5").classList.remove("checked");
       document.getElementById("star5").classList.add("unchecked");
     }
    else if (this.totalClicks < 60){
       document.getElementById("star3").classList.remove("checked");
       document.getElementById("star3").classList.add("unchecked");
       document.getElementById("star4").classList.remove("checked");
       document.getElementById("star4").classList.add("unchecked");
       document.getElementById("star5").classList.remove("checked");
       document.getElementById("star5").classList.add("unchecked");
    }
    else{
       document.getElementById("star2").classList.remove("checked");
       document.getElementById("star2").classList.add("unchecked");
       document.getElementById("star3").classList.remove("checked");
       document.getElementById("star3").classList.add("unchecked");
       document.getElementById("star4").classList.remove("checked");
       document.getElementById("star4").classList.add("unchecked");
       document.getElementById("star5").classList.remove("checked");
       document.getElementById("star5").classList.add("unchecked");

    }
    // $('#status1').innertext('time_play')
  }

  flipCard(card){
    if(this.canFlipCard(card)){
      this.audioController.flip()
      this.totalClicks += 1
      this.ticker.innerText = this.totalClicks
      card.classList.add('visible')

      if (this.cardToCheck){
        this.checkForCardMatch(card)
      }else{
        this.cardToCheck = card
      }
    }
  }
  checkForCardMatch(card){
      if(this.getCardType(card) === this.getCardType(this.cardToCheck)){
        this.cardMatch(card, this.cardToCheck)
      } else{
        this.cardMisMatch(card, this.cardToCheck)
      }
      this.cardToCheck = null
  }
  cardMatch(card1, card2){
      this.matchedCards.push(card1)
      this.matchedCards.push(card2)
      card1.classList.add('matched')
      card2.classList.add('matched')
      this.audioController.match()
      if (this.matchedCards.length === this.cardsArray.length){
        this.victory()
      }
  }
  cardMisMatch(card1, card2){
      this.busy = true
      setTimeout(() => {
          card1.classList.remove('visible')
          card2.classList.remove('visible')
          this.busy = false
      }, 1000)
  }
  getCardType(card){
      return card.getElementsByClassName('card-value')[0].src
  }
  shuffleCards(){
    for( let i = this.cardsArray.length - 1; i > 0; i-- ){
      let randIndex = Math.floor(Math.random()*(i+1))
      this.cardsArray[randIndex].style.order = i
      this.cardsArray[i].style.order = randIndex
    }
  }
  canFlipCard(card){
    // return true
    return (!this.busy && !(this.matchedCards.includes(card)) && card != this.cardToCheck)
  }
}

function ready(){
  let overlays = Array.from(document.getElementsByClassName('overlay-text'))
  let cards = Array.from(document.getElementsByClassName('card'))
  let game = new MixOrMatch(60, cards)
  // document.getElementsByClassName('game-status')
  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible');
      game.startGame()
      // victory()
      // var audioController = new AudioController()
      // audioController.startMusic()
      // var audio = new Audio('Assets/Audio/creepy.mp3');
      // audio.play();
    })
  })

  cards.forEach ( card => {
    card.addEventListener('click', () =>{
        game.flipCard(card)
    })
  })
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', ready());
} else{
  ready();
}

// let ex_audio = new AudioController()
