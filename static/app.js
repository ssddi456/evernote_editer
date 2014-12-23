require.config({
  baseUrl: '/static',
  paths :{
  }
});
require([
  './lib/content_util',
  './lib/util'
],function(
  content_util,
  util
){
  var editor_url = 'editor_from_zybuluo.html';
  var internal_editor_url = chrome.extension.getURL(editor_url);

  var cache_port = [];
  var wait_editer = $('<div></div>');

  chrome.runtime.onConnect.addListener(function(port) {
    // content script's message
    // add to cache
    if( port.name == "knockknock" ){
      cache_port.push(port);
      console.log('content script connected');
    };
    // editer's message
    if( port.name == 'editer' ){
      wait_editer.trigger('editer_connected');
      console.log('editer connected');
    }

    port.onMessage.addListener(function(msg) {
      if (msg.msg == "init_message"){
        // welcome info
        port.postMessage({ msg : "inited"});
      }
      else if (msg.msg == "start_edit"){
        // from content script
        chrome.tabs.create({
          url : internal_editor_url
        },function( tab ) {
          wait_editer.one('editer_connected',function() {
            var editer = util.get_ext_view( editor_url );

            editer.com.zybuluo.mdeditor
              .unifiedEditor.setValue( 
                content_util.toEdit(msg.html));
            port.target_tab_id =
            editer.target_tab_id = tab.id;
          });
        });
      } 
      else if (msg.msg == 'end_edit' ){
        // from editer 
        var editer = util.get_ext_view( editor_url );
        var _port = cache_port.filter(function( port ) {
          return port.target_tab_id == editer.target_tab_id;
        })[0];

        if( !_port ){
          return;
        }
        // 读取内容后回调
        editer.com.zybuluo.mdeditor.fileManager
          .exports_html(function(err,body) {

            var md = editer.com.zybuluo.mdeditor
                      .unifiedEditor.getValue();

            _port.postMessage({
              msg : 'edited',
              html: content_util.toSave({
                      html: body,
                      md  : md
                    })
            });
            //关闭编辑器窗口
            port.postMessage({ msg : 'saved' });
          });
      }
    });
    // 如果evernote关闭，移除port cache
    port.onDisconnect.addListener(function() {
      var idx = cache_port.indexOf( port );
      if( idx != -1 ){
        cache_port.splice(idx,1);
      }
    })
  });
});