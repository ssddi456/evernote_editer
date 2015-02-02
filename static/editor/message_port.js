var port = chrome.runtime;
port.onMessage.addListener(function( msg, sender ) {
  if(sender.tab){
    return;
  }
  if (msg.msg == "inited"){
    console.log('connect success');
  }
  else if ( msg.msg == 'saved' ){
    window.close();
  }
});

port.sendMessage({ msg : 'editing' });
$(function() {
  $('body').on('mousedown','#preview-publish-button',
    function( e ) {
      port.sendMessage({ msg : 'end_edit' }); 
    });
})