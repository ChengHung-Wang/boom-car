// say things
let english_voice = '';

function speak(text) {
  let available_voices = window.speechSynthesis.getVoices();

  if(english_voice == '') {

    for(let i=0; i<available_voices.length; i++) {
      if(available_voices[i].lang === 'en-GB') {
        english_voice = available_voices[i];
        break;
      }
    }

    if(english_voice === '' && available_voices.length > 0) {
      english_voice = available_voices[0];
    }
  }
  let utter = new SpeechSynthesisUtterance();
  utter.text = text;
  if(english_voice != '') {
    utter.voice = english_voice;
  }


  // speak
  window.speechSynthesis.speak(utter);
}
