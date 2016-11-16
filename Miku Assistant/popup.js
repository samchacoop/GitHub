
function myPopup(){ 
  window.open();   
}

$(function(){
  $('#paste').click(function(){pasteSelection();});
});
function pasteSelection() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      var text = document.getElementById('text'); 
      text.innerHTML = response.data;
    });
  });
}

$(function(){
  $('#speak').click(function(){speakSelection();});
});
function speakSelection() {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[10]; 
  msg.voiceURI = 'native';
  msg.volume = 1; 
  msg.rate = 1; 
  msg.pitch = 1; 
  msg.text = document.getElementById('text').value;
  msg.lang = 'en-US';
  speechSynthesis.speak(msg);
};

