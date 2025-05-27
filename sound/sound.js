class SoundManager{
    soundActive;
    prevCard;
    nextCard;
    turnOver;
    
    constructor(){
        this.soundActive = true;
        this.prevCard = new Audio("./sound/prevCard.wav");
        this.nextCard = new Audio("./sound/nextCard.wav");
        this.turnOver = new Audio("./sound/turnover.wav");
    }

    turnOverSound(){
        if(this.soundActive){
            this.turnOver.pause();
            this.turnOver.currentTime = 0;
            this.turnOver.play();
        }
    }   
    
    prevCardSound(){
        if(this.soundActive){
            this.prevCard.pause();
            this.prevCard.currentTime = 0;
            this.prevCard.playbackRate = 2;
            this.prevCard.play();
        }
    }

    nextCardSound(){
        if(this.soundActive){
            this.nextCard.pause();
            this.nextCard.currentTime = 0;
            this.nextCard.playbackRate = 2;
            this.nextCard.play();
        }
    }

    toggleSound(){
        this.soundActive = this.soundActive ? false : true;
    }

    getSoundActive(){
        return this.soundActive;
    }
}

export default SoundManager;