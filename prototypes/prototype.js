////// intro Modal

const introModal = document.getElementById("intro-modal");
const introModalCloseButton = document.getElementById("intro-modal-close");

// show modal
introModal.showModal();

// when ok clicked, close modal
introModalCloseButton.addEventListener("click", function(){

// close modal
introModal.close();
});
introModal.addEventListener("close", toneInit);


////// tone

// instrument
const synth = new Tone.PolySynth();
function toneInit(){
synth.connect(Tone.Destination);

}


////// the music keys

// find our music keys
let keys = Array.from(
document.getElementsByClassName("music-key")
);

// find our random button
const randomButton = document.getElementById("random-button");
const instruction = document.getElementById("instruction");
const scoreDisplay = document.getElementById("score");


////// the challenge / educational part

// I used ChatGPT to explain how I could code the  challenge section of my musical toy
// It needed to include the extended technique, which in my case is "random" and I wasn't quite sure on how I was going to go about it
let targetKey = null;
let score = 0;

// choose a random key - extended technique 
function chooseRandomKey(){

let randomNumber = Math.floor(
    Math.random() * keys.length
);

targetKey = keys[randomNumber];
let note = targetKey.dataset.note;

// instruction - what to press
instruction.innerHTML = "Press " + note + "!";

}
function playNote(e){
let keyPressed = e.target;
let note = keyPressed.dataset.note;
synth.triggerAttackRelease(note, "8n");

}
keys.forEach((key) => {
key.addEventListener("click", playNote);

});

////// prompt on challenge (feedback on if it was right)

keys.forEach((key) => {

key.addEventListener("click", function(){

    // check if a challenge has been started

    if(targetKey === null){
        return;
    }

    if(key === targetKey){

    // ChatGPT has been used to help me understand how I can update the answers / user feedback on what was right and wrong
        score = score + 1;
        scoreDisplay.innerHTML = "" + score;
        instruction.innerHTML = "Great job!";

        setTimeout(function(){

            chooseRandomKey();

        }, 800);

    } else {

        // tell toddler to try again
        instruction.innerHTML = "Try another one!";

    }

});

});

////// random Button

randomButton.addEventListener("click", chooseRandomKey);
