class SoundManager{
    soundActive;
    prevCard;
    nextCard;
    turnOver;
    lastRecorderAudio;
    
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

    soundControls(){        
        const soundWrapper = document.createElement("div");
        soundWrapper.classList.add("soundWrapper");
        this.lastRecorderAudio = null;
        
        let mediaRecorder;
        let audioChunks = [];

        const audio = document.createElement("audio");
        audio.setAttribute("controls", true);
        
        const startButton = document.createElement("button");
        startButton.innerText = "start";
        startButton.addEventListener("click", async(e)=>{
            e.preventDefault();
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            mediaRecorder = new MediaRecorder(stream);

            audioChunks = [];
/*             mediaRecorder.ondataavailable = e => {
                audioChunks.push(e.data)
            } */

            mediaRecorder.addEventListener("dataavailable", e => {
                audioChunks.push(e.data);
            })

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, {type: "audio/webm"});
                const audioURL = URL.createObjectURL(audioBlob);
                audio.src = audioURL;
                this.lastRecorderAudio = audioBlob;
            });

            mediaRecorder.start();
        })        

        const stopButton = document.createElement("button");
        stopButton.innerText = "stop";
        stopButton.addEventListener("click", (e) => {
            e.preventDefault();
            mediaRecorder.stop();
        });

        soundWrapper.append(startButton, stopButton, audio);
        return soundWrapper;
    }
}

export default SoundManager;