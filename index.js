const Recorder = require('./recorder');
const Tone = require('tone');

const RECORDING_MAX_DURATION = 3; // seconds
const recorder = new Recorder(RECORDING_MAX_DURATION, storeRecord);
let arrBuffer = [];
function toggleRecorder(){
  if(recorder.isRecording === false) {
    recorder.start();
  } else {
    recorder.stop();
  }
};


function onKeypress(e) {
  switch (e.key) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
      playRecord(Number(e.key)-1);
      break;
    case 'r':
      toggleRecorder();
      break;
    case ' ':
      playRecord();
      break;
    default:
      
  }
}
function storeRecord(rec) {
  arrBuffer.push(rec.exportBuffer());
}
function playRecord(index) {
  if (arrBuffer.length === 0) {
    console.warn('no record');
    return;
  }
  // default: play last one
  if (index === undefined) {
    index = arrBuffer.length - 1;
  }
  if (index > arrBuffer.length - 1) {
    console.warn('index out of bound. We do not have that many recording.');
    return;
  }
  // NOTE Tone.BufferSource didn't play.
  // const source = new Tone.BufferSource(recorder.audioBuffer, function(e){
  //   console.log('BufferSource onended callback');
  // });
  // source.start();
  const source = Tone.context.createBufferSource();
  source.connect(Tone.context.destination);
  source.buffer = arrBuffer[index];
  source.start();
}
// HACK lemme play
window.playRecord = playRecord;

document.body.style.width = "100vw";
document.body.style.height = "100vh";
document.body.addEventListener('keypress', onKeypress);
