require([
],function(
){
  function get_container () {
    return $('[id^=entinymce_]')[0]
            .contentWindow.document.body;
  }

  var port = chrome.runtime;
  
  port.sendMessage({ msg : "init_message"});
  port.onMessage.addListener(function( msg, sender ) {

    if (msg.msg == "inited"){
      console.log('connect success');
    }
    else if (msg.msg == "edited"){
      get_container().innerHTML = msg.html;
    }

  });

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
      port.sendMessage({ 
        msg : 'start_edit',
        html: get_container().innerHTML
      });
    })
});