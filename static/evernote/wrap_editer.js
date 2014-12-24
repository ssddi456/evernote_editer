require([
],function(
){
  function get_container () {
    return $('[id^=entinymce_]')[0]
            .contentWindow.document.body;
  }

  var port;
  function reconnect () {
    if(port){
      port.onDisconnect.removeListener(reconnect);
    }
    port = chrome.runtime.connect({name: "knockknock"});
    port.postMessage({ msg : "init_message"});
    port.onMessage.addListener(function(msg) {
      if (msg.msg == "inited"){
        console.log('connect success');
      }
      else if (msg.msg == "edited"){
        get_container().innerHTML = msg.html;
      }
    });
    port.onDisconnect.addListener(reconnect);
  }
  reconnect();

  $('<button>编辑</button>')
    .appendTo('body')
    .css({
      'font-family'     : 'gotham,helvetica,arial,sans-serif',
      'font-style'      : 'normal',
      'font-weight'     : 500,
      'color'           : '#fff',
      'background-color': '#2dbe60',
      'border-color'    : '#1fae52',
      'position'        : 'fixed',
      'bottom'          : 20,
      'right'           : 20,
      'padding'         : '10px 40px',
      'z-index'         : 1000
    })
    .click(function() {
      port.postMessage({ 
        msg : 'start_edit',
        html: get_container().innerHTML
      });
    })
});