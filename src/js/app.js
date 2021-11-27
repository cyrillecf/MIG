/**
 * projet : MIG 
 * date de création : 23/11/2021
 * cyrille fourcin
 * description :
 *  Permet de créer des contraintes aléatoires pour aider à la création musicale.
 * 
 *    - tonalité;
 *    - mode: majeur, mineur, dorien, ... ;    
 *    - tempo ex:  entre 80 à 90 bpm; 
 *    - instruments de départ;
 *    - optionnel -> theme : triste, joyeux, mélancolique, épique, drôle, peur, ...;
 */

const KEYS    = ["A","B","C","D","E","F","G"];
const ALTKEYS = ["","\u266d","\u266f"]; // bémol et dièse
const SIMPLE_MODE = ["Major", "Minor"];
const MODE    = 
[ 
  "Ionian", 
  "Dorian", 
  "Phrygian", 
  "Lydian", 
  "Mixolydian", 
  "Aeolian", 
  "Locrian"
];
const INSTRUMENTS = 
[
  "Bass", 
  "Guitar", 
  "Piano", 
  "Drum", 
  "Synth", 
  "Percussion", 
  "Voice", 
  "Strings", 
  "Wood wind", 
  "Brass", 
  "Keyboard" 
];

let Mig = {
  key   : "",
  alt   : "",
  mode  : "",
  tempo : 60,
  start_instrument : "",
  disableAccident: false,
  easyMode: false
}

function construct_Mig (key,alt,mode,tempo,instrument,accident,easyMode){
  Mig.key   = key;
  Mig.alt   = alt;
  Mig.mode  = mode;
  Mig.tempo = tempo;
  Mig.start_instrument = instrument;
  Mig.disableAccident = accident;
  Mig.easyMode = easyMode;
}

//#################################  RANDOM FUNCTIONS  ####################################################
let getKey   = () => { return KEYS[getRandomInt(0, KEYS.length-1)];}
let getAlt   = () => { return ALTKEYS[getRandomInt(0, ALTKEYS.length-1)]}
let getMode  = () => { return MODE[getRandomInt(0, MODE.length-1)];}
let getTempo = () => { 
  randomInt = getRandomInt(12, 46); // pour 12*5 = 60 , 46*5 = 230
  minTempo  = randomInt * 5;
  maxTempo  = minTempo + 10;  
  return minTempo + " - " + maxTempo;
}
let getSimpleMode  = () => { return SIMPLE_MODE[getRandomInt(0, SIMPLE_MODE.length-1)];}
let getIstrument   = () => { return INSTRUMENTS[getRandomInt(0, INSTRUMENTS.length-1)];}

function getRandomInt(min, max){// min et max inclue
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}
//#########################################################################################################

function checkMig () {
  
  if(!Mig.disableAccident){
    let key = Mig.key + Mig.alt;

    switch (key) {
      case 'B\u266f': //B♯
        Mig.key  = "C";
        Mig.alt = ""
        break;
      case 'C\u266d': //C♭
        Mig.key  = "B";
        Mig.alt = ""
        break;
      case 'E\u266f':
        Mig.key  = "F";
        Mig.alt = ""
        break;
      case 'F\u266d':
        Mig.key  = "E";
        Mig.alt = ""
        break;
      default:
        // console.log(`${key} is correct`);
        break;
    }
  }
  
  if(!Mig.easyMode){
    let mode = Mig.mode;

    switch (mode) {
      case 'Ionian':
        Mig.mode = "Major"
        break;
      case 'Aeolian':
        Mig.mode = "Minor"
        break;
      default:
        // console.log(`${mode} is correct`);
        break;
    }
  }
}

function MigDisplay(){
  //console.log(Mig);
  let key           = Mig.key + Mig.alt;
  let mode          = Mig.mode;
  let tempo         = Mig.tempo;
  let instrument    = Mig.start_instrument;
  
  
  let eltKey        = document.getElementById("key");
  let eltMode       = document.getElementById("mode");
  let eltTempo      = document.getElementById("tempo");
  let eltInstrument = document.getElementById("instrument");

  eltKey.innerText = key;
  eltMode.innerText = mode;
  eltTempo.innerText = tempo;
  eltInstrument.innerText = instrument;
}


let doIt = true;
function roll (){
  let count = 0;
  
    intervalId = setInterval(function(){
      if(count < 7){
        elt.click();
        count++;
      }else{clearInterval(intervalId); doIt=true}
    },150);   
}

// OPTIONS SELECTED and RUN onClick// 
const elt = document.getElementById('run');
elt.addEventListener('click', function(e){
  e.preventDefault();
  
  const form = document.getElementById("form");

  let accidentValue = form.alt.checked;
  let modeValue = "";

  let modeElt = form.mode;
  for (let i = 0; i < modeElt.length; i++) {
    const element = modeElt[i];
    if(element.checked){
      modeValue = element.value;
    }
  }

  let key;
  let alt ;
  let mode;
  let tempo;
  let instrument;
  let accident;
  let easyMode;

  key = getKey();

  if(accidentValue){
    alt = "";
    accident = true;
  }else{
    alt = getAlt();
    accident = false;
  }

  if(modeValue != "all"){
    mode = getSimpleMode();
    easyMode = true;
  }else{
    mode = getMode();
    easyMode =  false;
  }
  
  tempo = getTempo();
  instrument = getIstrument();

  construct_Mig(key,alt,mode,tempo,instrument,accident,easyMode);
  checkMig();
  MigDisplay();
  
  if (doIt){
    roll();
    doIt = false;
  }

});
