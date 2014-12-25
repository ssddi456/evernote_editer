define([

],function(

){
  var html_entity_map = {
    gt  : '>',
    lt  : '<',
    amp : '&'
  };
  return {
    toSave : function( object ) {
      return '<body>'
      + '<pre style="display:none;">'+ object.md +'</pre>'
      + '<div style="color:grey;font-size:14px;padding-bottom:20px;"> '
      + 'this is created by md editer, don`t manually edit it '
      + '</div>'
      + '<div>'+ object.html +'</div>'
      + '</body>';
    },
    toEdit : function( html ) {
      html = $(html);
      return ( html.filter('pre').eq(0).html() || html.text())
                .replace(/\&([\w\d]+)\;/g,function($,$1) {
                  return html_entity_map[$1];
                });
    }
  }
});