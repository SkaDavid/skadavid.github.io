
// Takes care of everything related to sound on the page.
class SoundManager{
    // true or false based on user preferences
    soundActive;
    prevCard;
    nextCard;
    turnOver;
    // last recorded audio user recorded
    lastRecorderAudio;
    
    constructor(){
        this.soundActive = true;
        this.prevCard = new Audio("./sound/prevCard.wav");
        this.nextCard = new Audio("./sound/nextCard.wav");
        this.turnOver = new Audio("./sound/turnOver.wav");
    }

    // play a sound when user turns over a card in study mode
    turnOverSound(){
        // check for user preferences
        if(this.soundActive){
            this.turnOver.pause();
            this.turnOver.currentTime = 0;
            this.turnOver.play();
        }
    }   
    
    // play a sound when user checks previous card
    prevCardSound(){
        // check for user preferences
        if(this.soundActive){
            this.prevCard.pause();
            this.prevCard.currentTime = 0;
            this.prevCard.playbackRate = 2;
            this.prevCard.volume = 0.2;
            this.prevCard.play();
        }
    }

    // play a sound when user checks the next card
    nextCardSound(){
        // check for user preferences
        if(this.soundActive){
            this.nextCard.pause();
            this.nextCard.currentTime = 0;
            this.nextCard.playbackRate = 2;
            this.nextCard.volume = 0.2;
            this.nextCard.play();
        }
    }

    // function which turns off / turns on the sound
    toggleSound(){
        this.soundActive = this.soundActive ? false : true;
    }

    getSoundActive(){
        return this.soundActive;
    }

    // renders an element where user can record his own voice message
    soundControls(){        
        const soundWrapper = document.createElement("div");
        soundWrapper.classList.add("soundWrapper");
        // null the last record audio each time new sound controls are generated
        this.lastRecorderAudio = null;
        
        let mediaRecorder;
        let audioChunks = [];
        let stream;

        const audio = document.createElement("audio");
        audio.setAttribute("controls", true);
        
        const startButton = document.createElement("button");
        startButton.innerText = "start recording";
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
    
            // deactivate the start and delete button and show a button which will stop the recording stream
            startButton.classList.add("hidden");
            deleteTrackButton.classList.add("hidden");
            stopButton.classList.remove("hidden");
        })        

        const stopButton = document.createElement("button");
        stopButton.innerText = "stop recording";
        stopButton.classList.add("hidden");
        stopButton.addEventListener("click", (e) => {
            e.preventDefault();
            mediaRecorder.stop();

            // deactivate the stop button and show both start button and delete message button
            stopButton.classList.add("hidden");
            startButton.classList.remove("hidden");
            deleteTrackButton.classList.remove("hidden");
        });

        const deleteTrackButton = document.createElement("button");
        deleteTrackButton.innerText = "delete message";
        deleteTrackButton.classList.add("hidden");
        deleteTrackButton.addEventListener("click", (e)=>{
            e.preventDefault();
            audio.src = null;
            this.lastRecorderAudio = null;

            // Hide the delete button (as there is now nothing to be deleted)
            deleteTrackButton.classList.add("hidden");
        })

        soundWrapper.append(startButton, stopButton, deleteTrackButton, audio);
        return soundWrapper;
    }
}

export default SoundManager;