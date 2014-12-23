define([

],function(

){
  var util = {
    getByPath :function ( data, path ){
      var paths = path.split('.');
      while( paths.length && data ){
        data = data[paths.shift()];
      }
      if( !paths.length ){
        return data;
      }
    },
    tpl_func :function  ( tplfun ){
      var tpl = tplfun.toString().replace(/(^[^\n]+)|([^\n]+$)/g,'');
      return function( data ){
        if(!data){
          return tpl;
        }
        return tpl.replace(/(\{{2}([^\}]+)\}{2})/g,function($,$1,$2){
          var val = util.getByPath( data, $2 );
          if( val != undefined ){
            return val;
          } 
          return '';
        });
      };
    },
    check_if_cashdesk : function (callback){
      chrome.tabs.query({
        active : true,
        currentWindow : true
      }, function (tabs){
        var tab = tabs[0];
        // if( tab.url.indexOf('https://www.baifubao.com/api/0/pay/0/direct') == 0 ){
          callback( tab );
        // } else {
        //   callback();
        // }
      });
    },
    get_current_tab : function(callback) {
      chrome.tabs.query({
        active : true,
        currentWindow : true
      }, function (tabs){
        var tab = tabs[0];
        callback( tab );
      });
    },
    func_as_code : function( func ) {
      return '(' + func.toString() + ')()';
    },
    get_ext_view : function( url  ) {
      var viewTabUrl = chrome.extension.getURL(url);
      var views = chrome.extension.getViews();
      
      var view = views.filter(function(view) {
        return viewTabUrl === view.location.href;
      });    
      return view[0];
    },
    get_ext_url : function( url ) {
      return chrome.extension.getURL(url);
    },
    obj_to_global_declare: function( obj ) {
      var ret = [];
      for ( var k in obj ){
        ret.push( 'var ' + k + ' = ' + JSON.stringify( obj[k] ) + ';');
      }
      return ret.join('');
    }
  };
  return util;
});