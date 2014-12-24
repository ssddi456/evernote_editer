var port;
function reconnect () {
  if(port){
    port.onDisconnect.removeListener(reconnect);
  }
  port = chrome.runtime.connect({name: "editer"});
  port.postMessage({ msg : "init_message"});
  port.onMessage.addListener(function(msg) {
    if (msg.msg == "inited"){
      console.log('connect success');
    }
    else if ( msg.msg == 'saved' ){
      window.close();
    }
  });
  port.onDisconnect.addListener(reconnect);
}

reconnect();

$(function() {
  $('#preview-publish-button')
    .off()
    .click(function() {
      port.postMessage({ msg : 'end_edit' }); 
    });
})