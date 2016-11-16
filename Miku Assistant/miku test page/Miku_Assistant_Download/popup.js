
function myPopup(){ 
  window.open();   
}

function speak(){
  window.speechSynthesis.speak(
     new SpeechSynthesisUtterance('Oh why hello there.')
  );
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
    window.speechSynthesis.speak(
      new SpeechSynthesisUtterance(document.getElementById('text').value)
    );
  console.log(document.getElementById('text').value);
};

