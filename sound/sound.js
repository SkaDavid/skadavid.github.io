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
            this.prevCard.volume = 0.2;
            this.prevCard.play();
        }
    }

    nextCardSound(){
        if(this.soundActive){
            this.nextCard.pause();
            this.nextCard.currentTime = 0;
            this.nextCard.playbackRate = 2;
            this.nextCard.volume = 0.2;
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
        let stream;

        const audio = document.createElement("audio");
        audio.setAttribute("controls", true);
        
        const startButton = document.createElement("button");
        startButton.innerText = "start";
        startButton.addEventListener("click", async(e)=>{
            e.preventDefault();
            stream = await navigator.mediaDevices.getUserMedia({audio: true});
            mediaRecorder = new MediaRecorder(stream);

            audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", e => {
                audioChunks.push(e.data);
            })

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, {type: "audio/webm"});
                const audioURL = URL.createObjectURL(audioBlob);
                audio.src = audioURL;
                stream.getTracks().forEach(track => track.stop());
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

        const deleteTrackButton = document.createElement("button");
        deleteTrackButton.innerText = "delete message";
        deleteTrackButton.addEventListener("click", (e)=>{
            e.preventDefault();
            audio.src = null;
            this.lastRecorderAudio = null;
        })

        soundWrapper.append(startButton, stopButton, deleteTrackButton, audio);
        return soundWrapper;
    }
}

export default SoundManager;