// say things
let english_voice = '';

export function speak(text) {
  const available_voices = window.speechSynthesis.getVoices();

  if (english_voice === '') {

    for (let i = 0; i < available_voices.length; i++) {
      if (available_voices[i].lang === 'en-GB') {
        english_voice = available_voices[i];
        break;
      }
    }

    if (english_voice === '' && available_voices.length > 0) {
      english_voice = available_voices[0];
    }
  }

  const utter = new SpeechSynthesisUtterance();
  utter.text = text;
  utter.volume = 0.2;
  if (english_voice !== '') {
    utter.voice = english_voice;
  }

  // speak
  window.speechSynthesis.speak(utter);
}