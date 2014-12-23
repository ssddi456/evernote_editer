window.MathJax = {
  tex2jax: { 
    inlineMath: [['$','$'], ["\\(","\\)"]],
     processEscapes: true
  },  
  messageStyle: "none"
};
Namespace('com.zybuluo.mdeditor.layout');
com.zybuluo.mdeditor.layout.initData = {
  loggedInUsername: 'my name yep', // '' means not logged in, otherwise the logged in username.
  isPageOwner:  true,
  loginComeFromUrl: 'https://www.zybuluo.com/login?return_to=https%3A%2F%2Fwww.zybuluo.com%2Fmdeditor',
  noteRemarksUrl: "https://www.zybuluo.com/note/-1/remarks", 
  newNoteRemarkUrl: "https://www.zybuluo.com/note/-1/remark/new", 
  updateNoteRemarkUrl: "https://www.zybuluo.com/note/-1/remark/update", 
  deleteNoteRemarkUrl: "https://www.zybuluo.com/note/-1/remark/delete", 
  publishNoteRemarkUrl: "https://www.zybuluo.com/note/-1/remark/publish", 
  newNoteRemarkReplyUrl: "https://www.zybuluo.com/note/-1/remark_reply/new", 
  updateNoteRemarkReplyUrl: "https://www.zybuluo.com/note/-1/remark_reply/update", 
  deleteNoteRemarkReplyUrl: "https://www.zybuluo.com/note/-1/remark_reply/delete", 
};

// BEGIN: pace.js configuration
window.paceOptions = {
  // disable others, enable for ajax call only,
  ajax: true,
  document: false,
  elements: false,
  eventLag: false,
};
// jiawzhang NOTICE: to make sure pace.js is working for any ajax call especially the jquery ajax, add 'Pace.restart()' into jquery ajax call like '$.post'
// Originally, pace 0.5.6 doesn't support jquery ajax, see details in: https://github.com/HubSpot/pace/issues/29
// END: pace.js configuration

Namespace('com.zybuluo.mdeditor');
com.zybuluo.mdeditor.initData = {
  isLoggedIn: 'True',
  loginComeFromUrl: 'https://www.zybuluo.com/login?return_to=https%3A%2F%2Fwww.zybuluo.com%2Fmdeditor',
  markdownHelpUrl: "https://www.zybuluo.com/mdeditor?url=https%3A%2F%2Fwww.zybuluo.com%2Fstatic%2Feditor%2Fmd-help.markdown",
  updateUserNoteUrl: "https://www.zybuluo.com/mdeditor/note/update",
  newUserNoteUrl: "https://www.zybuluo.com/mdeditor/note/new",
  deleteUserNoteUrl: "https://www.zybuluo.com/mdeditor/note/delete",
  publishUserNoteUrl: "https://www.zybuluo.com/mdeditor/note/publish",
  userNoteUrl: "https://www.zybuluo.com//note/-1",
  isEditablePage: 'False',
  isUrlMode: 'False', // jiawzhang TODO: Could this be true/false directly instead of a string.
  currentId: '-1',
  currentTitle: '欢迎使用 Cmd - 在线 Markdown 编辑阅读器',
  currentVersionId: '-1',
  isPublic: 'False',
  anchorListString: null,
};
// jiawzhang NOTICE: switch textarea and ace editor
window.lightMode = false;