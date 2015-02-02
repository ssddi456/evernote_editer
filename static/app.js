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
  var port = chrome.runtime;

  port.onMessage.addListener(function( msg, sender ) {

    if (msg.msg == "init_message"){
      if(sender.tab){
        // welcome info
        chrome.tabs.sendMessage(sender.tab.id,
          { msg : "inited"});
      }
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
          editer.refer_tab_id = sender.tab.id;
        });
      });
    } 
    else if (msg.msg == 'editing' ){
      wait_editer.trigger('editer_connected');
    }
    else if (msg.msg == 'end_edit' ){
      // from editer 
      var editer = util.get_ext_view( editor_url );

      // 读取内容后回调
      editer.com.zybuluo.mdeditor.fileManager
        .exports_html(function(err,body) {

          var md = editer.com.zybuluo.mdeditor
                    .unifiedEditor.getValue();
          chrome.tabs.sendMessage(
            editer.refer_tab_id,
            {
              msg : 'edited',
              html: content_util.toSave({
                      html: body,
                      md  : md
                    })
            });
          chrome.tabs.update(editer.refer_tab_id, { active : true });
          //关闭编辑器窗口
          port.sendMessage({ msg : 'saved' });
        });
    }
  });
});