function setup(){
  noCanvas();
  let lang = navigator.language || "en-US";
  let speechRec = new p5.SpeechRec(lang, getText);
  speechRec.start();
  function getText(){
    if(speechRec.resultValue){
            $("#textspeech").html(speechRec.resultString);
            createP(speechRec.resultString);
    }
  }
}
